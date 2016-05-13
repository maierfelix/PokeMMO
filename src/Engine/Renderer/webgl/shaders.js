/**
 * Thanks to mattdesl for the
 * normal mappping thingys
 */
export const spritevs = `

  precision lowp float;

  uniform vec2 uScale;
  uniform vec2 uEntityScale;
  attribute vec2 aObjCen;
  attribute float aObjRot;
  attribute float aIdx;
  varying vec2 uv;

  void main(void) {
    if (aIdx == 0.0) {
      uv = vec2(0.0,0.0);
    } else if (aIdx == 1.0) {
      uv = vec2(1.0,0.0);
    } else if (aIdx == 2.0) {
      uv = vec2(0.0,1.0);
    } else {
      uv = vec2(1.0,1.0);
    }
    vec2 pos = vec2(
      aObjCen.x + sin(aObjRot)*uEntityScale.y*(-0.5 + uv.y)
      + cos(aObjRot)*uEntityScale.x*(-0.5 + uv.x),
      aObjCen.y + cos(aObjRot)*uEntityScale.y*(-0.5 + uv.y)
      - sin(aObjRot)*uEntityScale.x*(-0.5 + uv.x)
    );
    gl_Position = vec4(
      -1.0 + 2.0*pos.x/uScale.x,
      1.0 - 2.0*pos.y/uScale.y,
      0.0, 1.0
    );
  }

`;

export const spritefs = `

  precision lowp float;

  #define STEP_A 0.4
  #define STEP_B 0.6
  #define STEP_C 0.8
  #define STEP_D 1.0

  uniform sampler2D u_texture0;
  uniform sampler2D u_normals;

  varying vec2 uv;

  uniform vec4 AmbientColor;
  uniform vec2 Resolution;

  uniform float Opacity;

  uniform float LightSize;
  uniform bool SoftLight;
  uniform vec3 LightPos;
  uniform vec4 LightColor;
  uniform vec3 Falloff;

  void main() {

    vec3 Sum = vec3(0.0);

    vec4 DiffuseColor = texture2D(u_texture0, uv);

    vec3 NormalMap = texture2D(u_normals, uv).rgb;

    vec3 LightDir = vec3(LightPos.xy - (gl_FragCoord.xy / Resolution.xy), LightPos.z);

    LightDir.x /= (LightSize / Resolution.x);
    LightDir.y /= (LightSize / Resolution.y);

    float D = length(LightDir);

    vec3 N = normalize(NormalMap * 2.0 - 1.0);
    vec3 L = normalize(LightDir);

    N = mix(N, vec3(0), 0.5);

    float df = max(dot(N, L), 0.0);

    vec3 Diffuse = (LightColor.rgb * LightColor.a) * df;

    vec3 Ambient = AmbientColor.rgb * AmbientColor.a;

    float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );

    if (SoftLight == false) {
      if (Attenuation < STEP_A) Attenuation = 0.0;
      else if (Attenuation < STEP_B) Attenuation = STEP_B;
      else if (Attenuation < STEP_C) Attenuation = STEP_C;
      else Attenuation = STEP_D;
    }

    vec3 Intensity = Ambient + Diffuse * Attenuation;
    vec3 FinalColor = DiffuseColor.rgb * Intensity;

    Sum += FinalColor;

    if (SoftLight == false) {
      gl_FragColor = vec4(Sum, DiffuseColor.a * Opacity);
    } else {
      gl_FragColor = vec4(FinalColor, DiffuseColor.a * Opacity);
    }

    if (gl_FragColor.a < 0.1) discard;

  }

`;

export const outlinefs = `

  precision lowp float;

  #define PI 3.14159265359
  #define WIDTH 10.0
  #define COLOR vec4(0.0,0.0,0.0,1.0)
  #define NUM_FRAMES 6.0

  uniform sampler2D u_texture0;

  varying vec2 uv;
  uniform vec2 uScale;
  uniform vec2 uEntityScale;

  void main() {

    vec2 point = vec2( (WIDTH/uEntityScale.x)*cos(PI), (WIDTH/uEntityScale.y)*sin(PI));
    point = clamp(uv + point, vec2(0.0), vec4(uEntityScale.xy, uEntityScale.xy).zw );
    float sampledAlpha = texture2D(u_texture0,  point).a;
    float outlineAlpha = max(0.0, sampledAlpha);

    gl_FragColor = mix(vec4(0.0), COLOR, outlineAlpha);

    vec4 tex0 = texture2D(u_texture0, uv);
    gl_FragColor = mix(gl_FragColor, tex0, tex0.a);

    if (gl_FragColor.a < 0.5) discard;

  }

`;