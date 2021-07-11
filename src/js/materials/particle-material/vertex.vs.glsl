uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute float size;
attribute vec3 aColor;

varying vec3 vColor;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_PointSize = size * ( 300.0 / -mvPosition.z );

    vColor = aColor;

    gl_Position = projectionMatrix * mvPosition;
}
