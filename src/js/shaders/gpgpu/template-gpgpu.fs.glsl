precision highp float;

uniform sampler2D textureTest;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 image = texture2D(textureTest, uv);
    gl_FragColor = image;
}
