import * as THREE from "three";
import { GeometryService } from "./GeometryService";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class CameraService {
  static instance;

  geometryService;
  planetCamDistance = 3;

  constructor() {
    this.geometryService = GeometryService.getInstance();
  }

  static getInstance() {
    if (!CameraService.instance) {
      CameraService.instance = new CameraService();
    }
    return CameraService.instance;
  }

  createPerspectiveCamera({ fov, aspect, near, far }) {
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    return camera;
  }

  changeCamera(container, planets) {
    planets.push(planets[0]);
    planets.shift();
    container.setCurrentTarget(planets[0]);

    const size = this.geometryService.getObjectSize(
      container.getCurrentTarget()
    );

    this.geometryService.updateBoxSize(container, size.x, size.y, size.z);
    container.position.copy(planets[0].position);
  }
}
