import * as THREE from "three";
import { Body } from "./Body";

export class Star extends Body {
  constructor({
    name,
    radius,
    widthSegments,
    heightSegments,
    canBeFocused = false,
  }) {
    const geometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    material.emissive = new THREE.Color(0xff8000);
    material.emissiveIntensity = 1;
    material.blendAlpha = 100;

    super({ radius, name, canBeFocused, geometry, material });
  }

  addStar(scene) {
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(1000));
    this.position.set(x, y, z);
    scene.add(this);
  }
}
