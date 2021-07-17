#define OCTAVES 10
#define PI 3.14159265359
#define S smoothstep
#define saturate(t) clamp(t, 0., 1.)

#pragma glslify: noise3D = require('glsl-noise/simplex/3d')
#pragma glslify: noise4D = require('glsl-noise/simplex/4d')
#pragma glslify: curleNoise = require('glsl-curl-noise/curl')

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;

uniform float progress;
uniform float time;
uniform float baseNoiseIteration;
uniform float noiseDiffusion;
uniform float noisePrecision;
uniform float lightningDiffusion;
uniform float lightningThickness;
uniform float speed;
uniform float direction;
uniform float prevDirection;
uniform float particleDiffusion;
uniform vec3 size;
uniform vec2 vanishDirection;


attribute vec3 position;
attribute vec3 normal;
attribute float scale;
attribute float aRandom;
attribute vec3 aColor;

varying float vAlpha;

float noise4D(vec4 n);
float noise3D(vec3 n);
vec3 curleNoise(vec3 n);

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
    vec3 transformed = position;

    vec4 mvPosition  = modelViewMatrix * vec4(transformed, 1.);
    vec3 transformedNormal = normalize(modelViewMatrix * vec4(normal, 0.)).xyz;

    vec3 pos = (modelMatrix * vec4(transformed, 1.)).xyz;

    // Matcap
    vec3 viewDir = normalize(-mvPosition.xyz);
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 tUv = vec2( dot( x, transformedNormal ), dot( y, transformedNormal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks


    vec2 vD = vanishDirection;
    float angle = atan(vD.x, vD.y) + PI / 2.;
    pos.xy = rotate(pos.xy, angle);

    float pX = 0.5 - pos.x / size.x;
    float nD = pow(noiseDiffusion, 3.);
    float p = S(pX, pX + nD, (progress) * (1. + nD));

    float noise = fbm(vec4(pos, time * .1 + progress), baseNoiseIteration);

    float pNoise = noise3D(vec3(tUv * noise, p * noise)) * 0.5 + 0.5;
    float progressNoise = S(0., 0.3, p - pNoise);
    // float maskProgress = S(.0, lightningDiffusion, progressNoise);
    // progressNoise = maskProgress - S(0., lightningThickness, progressNoise);

    float lifespan = progressNoise - S(.6, .9, p);
    float alpha = pow(lifespan, 1.);

    vec3 curl = curleNoise(
        position * vec3((progress + time * 0.6) * particleDiffusion, 1., 1.) + exp(progress) * 0.7
    ) * particleDiffusion;
    // float dist = noise4D(vec4(position * 1.3, exp(progress) * 0.3));

    // transformed.yz += normal.yz * curl.yz * progressNoise * exp(progress * 2.) * 0.1;
    // transformed.x += (normal.x + progress) * curl.x * progressNoise * exp(progress * 2.) * 0.1;
    // transformed.yz +=
    transformed += curl * progressNoise;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.);

    gl_PointSize = scale * ( 300.0 / -mvPosition.z );

    vAlpha = alpha;
}
