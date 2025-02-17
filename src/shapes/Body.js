import * as THREE from "three";

export class Body extends THREE.Mesh {
  
  mass = 0;
  velX = 0;
  velY = 0;
  velZ = 0;
  sideralDay = 0;
  
  rotateAngle = 0;
  canBeFocused = false;

  

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
    material = undefined,
    geometry = undefined,
  }) {
    material = material ?? new THREE.MeshStandardMaterial({ color: 0xffffff });
    geometry =
      geometry ??
      new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    super(geometry, material);
    this.position.set(...position);
    this.name = name;
    this.radius = radius;
    this.mass = mass;
    this.velX = velX;
    this.velY = velY;
    this.velZ = velZ;
    this.sideralDay = sideralDay;
    this.canBeFocused = canBeFocused;
  }
  getMass(){
    return this.mass;
  }
  getVelX(){
    return this.velX;
  }
  getVelY(){
    return this.velY;
  }
  getVelZ(){
    return this.velZ;
  }
  getSideralDay() {
    return this.sideralDay;
  }
  setAngle(newAngle) {
    this.angle = newAngle;
  }
  getRadius() {
    return this.radius;
  }
}
