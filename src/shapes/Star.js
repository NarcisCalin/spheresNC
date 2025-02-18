import * as THREE from "three";
import { Body } from "./Body";

export class Star extends Body {
  constructor({
    name,
    radius,
    mass = 0,
    position,
    velX = 0,
    velY = 0,
    velZ = 0,
    widthSegments,
    heightSegments,
    sideralDay = 0,
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

    super({geometry, 
      material,
      name,
      radius,
      mass,
      position,
      velX,
      velY,
      velZ,
      widthSegments,
      heightSegments,
      sideralDay,
      canBeFocused, });
    
  }

  addStar(scene) {
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(1000));
    this.position.set(x, y, z);
    scene.add(this);
  }
}
