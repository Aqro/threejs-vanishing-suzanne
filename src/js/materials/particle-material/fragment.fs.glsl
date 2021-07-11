precision highp float;

varying vec3 vColor;

void main() {
    vec2 uv = gl_PointCoord.xy;
    vec3 color = vColor;
    color.rg += uv * 0.5;

    gl_FragColor = vec4(color, 1.);
}
