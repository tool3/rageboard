import { CircleGeometry, Mesh, MeshBasicMaterial } from 'three';

class LightSource extends Mesh {
  constructor() {
    super();
    this.userData.time = { value: 0 };
    let g = new CircleGeometry(50, 64);
    let m = new MeshBasicMaterial({
      color: 0xbb0000,
      onBeforeCompile: (shader) => {
        shader.uniforms.time = this.userData.time;
        shader.fragmentShader = `
          uniform float time;
          ${shader.fragmentShader}
        `
          .replace(
            `void main() {`,
            `
          
          void main() {`
          )
          .replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
          vec2 uv = vUv - 0.5;
          vec3 col = vec3(0);
          float f = smoothstep(0.5, 0., length(uv));
          f = pow(f, 4.);
          float n = 0.5 + 0.5;
          n = n * 0.5 + 0.5;          
          col = mix(col, diffuse, f * n);
          vec4 diffuseColor = vec4( col, opacity );
          `
          );
        console.log(shader.fragmentShader);
      }
    });
    m.defines = { USE_UV: '' };
    this.geometry = g;
    this.material = m;
  }
}
export { LightSource };
