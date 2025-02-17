import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance",
  logarithmicDepthBuffer: true
  
  
});
renderer.vsync = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);
export default renderer;
