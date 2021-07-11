precision highp float;

varying vec2 vUv;
varying vec3 vColor;

void main() {
    vec3 color = vColor;
    color.rg += vUv * 0.5;

    gl_FragColor = vec4(color, 1.);
}
