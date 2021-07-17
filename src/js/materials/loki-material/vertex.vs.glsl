uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform vec3 cameraPosition;

attribute vec2 uv;
attribute vec3 position;
attribute vec3 normal;

// varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPos;
varying vec3 vViewDirection;

void main() {
    vec3 transformed = position;

    vec4 worldPos  = modelViewMatrix * vec4(transformed, 1.);
    vNormal        = normalize(modelViewMatrix * vec4(normal, 0.)).xyz;
    vViewDirection = -worldPos.xyz;

    vPos = (modelMatrix * vec4(transformed, 1.)).xyz;

    gl_Position = projectionMatrix * worldPos;
}
