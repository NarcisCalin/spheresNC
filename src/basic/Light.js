import * as THREE from "three";

const light = new THREE.AmbientLight(0x404040);
const pointLight = new THREE.PointLight(0xffffff, 1000, 0, 1.3);
pointLight.castShadow = true;
pointLight.shadow.camera.near = 0.0001;
pointLight.shadow.camera.far = 100000;
pointLight.shadow.mapSize.x = 4096;
pointLight.shadow.mapSize.y = 4096;
pointLight.shadow.radius = 8;
light.add(pointLight);
export default light;
