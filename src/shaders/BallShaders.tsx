const ballVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ballFragmentShader = `
  precision mediump float;

  #define NUM_BALLS 3
  #define BLENDING 30.0
  #define FALLOFF 20.0

  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;
  uniform float size;
  uniform float glowNumber;

  varying vec2 vUv;

  float smin(float a, float b, float k) {
      float res = exp2(-k * a) + exp2(-k * b);
      return -log2(res) / k;
  }

  float glow(float dist) {
      return max(size - dist, 0.0) / FALLOFF;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 center = iResolution.xy / 2.0;

    float waves[NUM_BALLS * 5];
    waves[0] = 1.23; waves[1] = 4.56; waves[2] = 3.21; waves[3] = 5.43; waves[4] = 50.0;
    waves[5] = 3.45; waves[6] = 1.26; waves[7] = 3.45; waves[8] = 2.15; waves[9] = 50.0;
    waves[10] = 2.14; waves[11] = 2.52; waves[12] = 1.25; waves[13] = 3.64; waves[14] = 50.0;

    vec3 colors[NUM_BALLS];
    colors[0] = vec3(1.0, 0.0, 0.0);
    colors[1] = vec3(0.0, 1.0, 0.0);
    colors[2] = vec3(0.0, 0.0, 1.0);

    vec2 balls[NUM_BALLS];

    for (int i = 0; i < NUM_BALLS; i++) {
    vec2 motionOffset = (iMouse - center) / iResolution * 300.0;
      balls[i] = center + motionOffset + vec2(
        cos(iTime * waves[i * 5] + waves[i * 5 + 1]),
        sin(iTime * waves[i * 5 + 2] + waves[i * 5 + 3])
      ) * waves[i * 5 + 4];
    }

    float minDist = distance(fragCoord, balls[0]);
    vec3 finalColor = colors[0] * clamp(1.0 - minDist / glowNumber, 0.0, 1.0);

    for (int i = 1; i < NUM_BALLS; i++) {
      float dist = distance(fragCoord, balls[i]);
      minDist = smin(minDist, dist, 1.0 / BLENDING);
      finalColor += colors[i] * clamp(1.0 - dist / glowNumber, 0.0, 1.0);
    }

    gl_FragColor = vec4(finalColor * glow(minDist), 1.0);
  }
`;

export { ballVertexShader, ballFragmentShader };
