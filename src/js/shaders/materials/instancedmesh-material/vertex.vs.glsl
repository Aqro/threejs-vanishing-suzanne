uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute mat4 instanceMatrix;
attribute vec3 instanceColor;
attribute vec3 position;
attribute vec2 uv;

varying vec3 vColor;
varying vec2 vUv;

void main() {
    vColor = instanceColor;
    vUv = uv;
    vec3 transformed = position;

    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4( transformed, 1.0 );
}
