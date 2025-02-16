import * as THREE from "three";
import { Body } from "./Body";

export class Planet extends Body {
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
  }) {
    super({
      name,
      radius,
      widthSegments,
      heightSegments,
      sideralDay,
      orbitalPeriod,
      orbited,
      distanceToOrbited,
      translateCounterClockWise,
      rotateCounterClockWise,
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
