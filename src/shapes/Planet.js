import * as THREE from "three";
import { Body } from "./Body";

export class Planet extends Body {
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
    super({
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
      canBeFocused,
    });
  }
  getTranslateCounterClockWise() {
    return this.translateCounterClockWise;
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
}
