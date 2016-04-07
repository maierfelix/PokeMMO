/**
 * Shaders taken from gles.js webgl renderer
 */

export const lightFs = `

  precision lowp float;

  varying vec4 vColor;
  varying vec2 vTextureCoord;

  uniform sampler2D u_texture;
  uniform sampler2D u_lightmap;
  uniform vec2 resolution;
  uniform vec4 ambientColor;

  void main() {
    vec4 diffuseColor = texture2D(u_texture, vTextureCoord);
    vec2 lighCoord = (gl_FragCoord.xy / resolution.xy);
    vec4 light = texture2D(u_lightmap, vTextureCoord);
    vec3 ambient = ambientColor.rgb * ambientColor.a;
    vec3 intensity = ambient + light.rgb;
    vec3 finalColor = diffuseColor.rgb * intensity;
    gl_FragColor = vColor * vec4(finalColor, diffuseColor.a);
  }

`;