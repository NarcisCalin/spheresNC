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
  getSideralDay() {
    return this.sideralDay;
  }
}
