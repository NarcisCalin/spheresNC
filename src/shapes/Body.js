import * as THREE from "three";

export class Body extends THREE.Mesh {
  orbitalPeriod = 0;
  sideralDay = 0;
  translationAngle = 0;
  rotateAngle = 0;
  orbit = [];
  orbited = undefined;
  distanceToOrbited = 0;
  translateCounterClockWise = false;
  rotateCounterClockWise = false;
  canBeFocused = false;

  constructor({
    name,
    radius,
    widthSegments,
    heightSegments,
    sideralDay = 0,
    orbitalPeriod = 0,
    orbited = undefined,
    distanceToOrbited = 0,
    translateCounterClockWise = false,
    rotateCounterClockWise = false,
    canBeFocused = false,
    material = undefined,
    geometry = undefined,
  }) {
    material = material ?? new THREE.MeshStandardMaterial({ color: 0xffffff });
    geometry =
      geometry ??
      new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    super(geometry, material);
    this.name = name;
    this.radius = radius;
    this.sideralDay = sideralDay;
    this.orbitalPeriod = orbitalPeriod;
    this.orbited = orbited;
    this.distanceToOrbited = distanceToOrbited;
    this.translateCounterClockWise = translateCounterClockWise;
    this.rotateCounterClockWise = rotateCounterClockWise;
    this.canBeFocused = canBeFocused;
  }
  getTranslateCounterClockWise() {
    return this.translateCounterClockWise;
  }
  getTranslationAngle() {
    return this.translationAngle;
  }
  setTranslationAngle(translationAngle) {
    this.translationAngle = translationAngle;
  }

  getRotateCounterClockWise() {
    return this.rotateCounterClockWise;
  }
  getSideralDay() {
    return this.sideralDay;
  }
  getDistanceToOrbited() {
    return this.distanceToOrbited;
  }

  getOrbited() {
    return this.orbited;
  }
  setOrbited(orbited) {
    this.orbited = orbited;
  }

  getOrbitalPeriod() {
    return this.orbitalPeriod;
  }

  setAngle(newAngle) {
    this.angle = newAngle;
  }

  getRadius() {
    return this.radius;
  }
}
