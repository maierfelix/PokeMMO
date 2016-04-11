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