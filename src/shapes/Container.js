import * as THREE from "three";

export class Container extends THREE.Mesh {
  currentTarget = undefined;

  constructor(radius) {
    const size = radius * 2;

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    super(geometry, material);
    this.visible = false;
  }

  setCurrentTarget(currentTarget) {
    this.currentTarget = currentTarget;
  }

  getCurrentTarget() {
    return this.currentTarget;
  }
}
