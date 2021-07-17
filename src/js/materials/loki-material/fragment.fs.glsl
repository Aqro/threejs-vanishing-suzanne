precision highp float;
#define OCTAVES 10
#define PI 3.14159265359
#define S smoothstep
#define saturate(t) clamp(t, 0., 1.)

#pragma glslify: noise3D = require('glsl-noise/simplex/3d')
#pragma glslify: noise4D = require('glsl-noise/simplex/4d')

uniform sampler2D matcap;
uniform float progress;
uniform float time;
uniform float baseNoiseIteration;
uniform float noiseDiffusion;
uniform float noisePrecision;
uniform float lightningDiffusion;
uniform float lightningThickness;
uniform float lightningPower;
uniform vec3 size;
uniform vec2 vanishDirection;
uniform vec3 color;

varying vec3 vNormal;
varying vec3 vViewDirection;
// varying vec2 vUv;
varying vec3 vPos;

float noise4D(vec4 n);
float noise3D(vec3 n);


vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}


float fbm(vec4 pos, float maxIteration) {
    float iterations = 0.;
    float amplitude = 1.;
    float period = 1.;

    for (int i = 0; i < OCTAVES; i++) {
        if (float(i) > maxIteration) break;
        period *= noisePrecision;
        amplitude *= 0.9;
        iterations += noise4D(vec4(pos.xyz * period, pos.w)) * amplitude;
    }

    return (iterations / maxIteration) * 0.5 + 0.5;
}

void main() {
    vec3 normal = vNormal;

    // Matcap
    vec3 viewDir = normalize(vViewDirection);
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks
    vec4 matcapTex = texture2D(matcap, uv);


    vec3 pos = vPos;
    vec2 vD = vanishDirection;
    float angle = atan(vD.x, vD.y) + PI / 2.;
    pos.xy = rotate(pos.xy, angle);

    float pX = 0.5 - pos.x / size.x;
    float nD = pow(noiseDiffusion, 3.);
    float p = S(pX, pX + nD, (progress) * (1. + nD));

    float noise = fbm(vec4(pos, time * .1 + progress), baseNoiseIteration);

    float pNoise = noise3D(vec3(uv * noise, p * noise)) * 0.5 + 0.5;
    float progressNoise = S(0., 0.3, p - pNoise);

    float maskProgress = S(.0, lightningDiffusion, progressNoise);

    vec4 finalColor = mix(matcapTex, vec4(0), maskProgress);

    vec4 light = vec4(color, 1);

    float dir = dot(normal, viewDir);
    float att = 1.;

    if (dir <= 0.) {
        finalColor.rgb *= 0.1;
        att = 0.5;
    }

    finalColor = mix(finalColor, light, maskProgress - S(0., lightningThickness * att, progressNoise));
    finalColor = mix(finalColor, vec4(1), maskProgress - S(0., lightningPower * att, progressNoise));

    if (finalColor.a <= 0.) discard;

    gl_FragColor = finalColor;
}
