precision highp float;

uniform float progress;
uniform float time;
uniform float baseNoiseIteration;
uniform float noiseDiffusion;
uniform float noisePrecision;
uniform float lightningDiffusion;
uniform vec3 size;
uniform vec3 color;

varying float vAlpha;
// varying vec2 vUv;


void main() {
    vec2 uv = gl_PointCoord.xy;

    // float maskProgress = S(.0, lightningDiffusion, progressNoise);
    float c = .1 / length(uv - 0.5) - 0.2;


    vec4 finalColor = vec4(color, vAlpha * c);

    if (finalColor.a <= 0.) discard;

    gl_FragColor = finalColor;
}
