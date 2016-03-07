/**
 * Shaders taken from gles.js webgl renderer
 */

export const spritevs = `

  precision lowp float;

  uniform vec2 uScale;
  uniform vec2 uObjScale;

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
      aObjCen.x + sin(aObjRot)*uObjScale.y*(-0.5 + uv.y)
      + cos(aObjRot)*uObjScale.x*(-0.5 + uv.x),
      aObjCen.y + cos(aObjRot)*uObjScale.y*(-0.5 + uv.y)
      - sin(aObjRot)*uObjScale.x*(-0.5 + uv.x)
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

  uniform sampler2D uSampler;

  varying vec2 uv;

  void main(void) {
    gl_FragColor = texture2D(uSampler, uv);
    if (gl_FragColor.a < 0.5) discard;
  }

`;

export const lightingvs = `
  //incoming Position attribute from our SpriteBatch
  attribute vec2 Position;
  attribute vec4 Color;
  attribute vec2 TexCoord0;
  uniform vec2 u_projection;
  varying vec2 vTexCoord0;
  varying vec4 vColor;

  void main(void) {
     gl_Position = vec4( Position.x / u_projection.x - 1.0, Position.y / -u_projection.y + 1.0 , 0.0, 1.0);
     vTexCoord0 = TexCoord0;
     vColor = Color;
  }
`;

export const lightingfs = `

  #ifdef GL_ES
  precision mediump float;
  #endif

  //Flat shading in four steps
  #define STEP_A 0.4
  #define STEP_B 0.6
  #define STEP_C 0.8
  #define STEP_D 1.0

  //attributes from vertex shader
  varying vec4 vColor;
  varying vec2 vTexCoord0;

  //our texture samplers
  uniform sampler2D u_texture0;   //diffuse map
  uniform sampler2D u_normals;   //normal map

  //values used for shading algorithm...
  uniform vec2 Resolution;      //resolution of canvas
  uniform vec4 AmbientColor;    //ambient RGBA -- alpha is intensity 

  uniform vec3 LightPos;     //light position, normalized
  uniform vec4 LightColor;   //light RGBA -- alpha is intensity
  uniform vec3 Falloff;      //attenuation coefficients
  uniform float LightSize;   //the light diameter in pixels

  void main() {
    //RGBA of our diffuse color
    vec4 DiffuseColor = texture2D(u_texture0, vTexCoord0);
    
    //RGB of our normal map
    vec3 NormalMap = texture2D(u_normals, vTexCoord0).rgb;
    
    //The delta position of light
    vec3 LightDir = vec3(LightPos.xy - (gl_FragCoord.xy / Resolution.xy), LightPos.z);
    
    //We ensure a fixed light size in pixels like so:
    LightDir.x /= (LightSize / Resolution.x);
    LightDir.y /= (LightSize / Resolution.y);

    //Determine distance (used for attenuation) BEFORE we normalize our LightDir
    float D = length(LightDir);
    
    //normalize our vectors
    vec3 N = normalize(NormalMap * 2.0 - 1.0);
    vec3 L = normalize(LightDir);

    //We can reduce the intensity of the normal map like so:    
    N = mix(N, vec3(0), 0.5);

    //Some normal maps may need to be inverted like so:
    // N.y = 1.0 - N.y;
    
    //perform "N dot L" to determine our diffuse term
    float df = max(dot(N, L), 0.0);

    //Pre-multiply light color with intensity
    vec3 Diffuse = (LightColor.rgb * LightColor.a) * df;

    //pre-multiply ambient color with intensity
    vec3 Ambient = AmbientColor.rgb * AmbientColor.a;
    
    //calculate attenuation
    float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );

    //Here is where we apply some toon shading to the light
    if (Attenuation < STEP_A) 
      Attenuation = 0.0;
    else if (Attenuation < STEP_B) 
      Attenuation = STEP_B;
    else if (Attenuation < STEP_C) 
      Attenuation = STEP_C;
    else 
      Attenuation = STEP_D;

    //the calculation which brings it all together
    vec3 Intensity = Ambient + Diffuse * Attenuation;
    vec3 FinalColor = DiffuseColor.rgb * Intensity;

    gl_FragColor = vColor * vec4(FinalColor, DiffuseColor.a);
  }

`;