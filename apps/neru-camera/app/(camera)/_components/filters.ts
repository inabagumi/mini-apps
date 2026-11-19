import {
  Color,
  defaultFilterVert,
  Filter,
  GlProgram,
  UniformGroup,
} from "pixi.js";

const fragmentShader = `in vec2 vTextureCoord;

out vec4 finalColor;

uniform vec3 uKeyColor;
uniform sampler2D uTexture;

void main(void) {
  vec4 smpColor = texture(uTexture, vTextureCoord);
  float diff = length(uKeyColor - smpColor.rgb);

  if (diff < 0.6) {
    discard;
  } else {
    finalColor = smpColor;
  }
}
`;

export class ChromaKeyFilter extends Filter {
  readonly #chromaKeyUniforms: UniformGroup<{
    uKeyColor: { type: "vec3<f32>"; value: Float32Array };
  }>;

  constructor(keyColor = "#00ff00") {
    const chromaKeyUniforms = new UniformGroup({
      uKeyColor: { type: "vec3<f32>", value: new Float32Array(3) },
    });

    super({
      glProgram: GlProgram.from({
        fragment: fragmentShader,
        name: "chroma-key-filter",
        vertex: defaultFilterVert,
      }),
      resources: {
        chromaKeyUniforms,
      },
    });

    this.#chromaKeyUniforms = chromaKeyUniforms;
    this.keyColor = keyColor;
  }

  get keyColor(): string {
    return new Color(this.#chromaKeyUniforms.uniforms.uKeyColor).toHex();
  }

  set keyColor(value: string) {
    new Color(value).toRgbArray(this.#chromaKeyUniforms.uniforms.uKeyColor);
    this.#chromaKeyUniforms.update();
  }
}
