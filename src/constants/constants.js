export const SECOND = 1;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 23.934469;
export const YEAR = DAY * 365.25;

export const KILOGRAM = 1;
export const KILOMETER = 1;
export const G = 6.674e-20;
export const AU = KILOMETER * 1.496e8;

export const EARTH_SIZE = AU / 11727;
export const EARTH_CLOUDS_SIZE = EARTH_SIZE * 1.01;
export const MOON_SIZE = EARTH_SIZE * 0.273;
export const SUN_SIZE = EARTH_SIZE * (109 / 2);
export const MERCURY_SIZE = EARTH_SIZE * 0.383;
export const VENUS_SIZE = EARTH_SIZE * 0.95;
export const MARS_SIZE = EARTH_SIZE * 0.532;
export const JUPITER_SIZE = EARTH_SIZE * 10.97;
export const SATURN_SIZE = EARTH_SIZE * 9.14;
export const URANUS_SIZE = EARTH_SIZE * 3.98;
export const NEPTUNE_SIZE = EARTH_SIZE * 3.86;

export const EARTH_MASS = 5.9722e24;
export const MOON_MASS = EARTH_MASS * 0.0123;


export const MERCURY_SIDERAL_DAY = DAY * 58.6;
export const VENUS_SIDERAL_DAY = DAY * 243;
export const EARTH_SIDERAL_DAY = DAY;
export const MARS_SIDERAL_DAY = HOUR * 24.6;
export const JUPITER_SIDERAL_DAY = HOUR * 9.93;
export const SATURN_SIDERAL_DAY = HOUR * 10.7;
export const URANUS_SIDERAL_DAY = HOUR * 17.24;
export const NEPTUNE_SIDERAL_DAY = HOUR * 16.11;
export const MOON_SIDERAL_DAY = DAY * 27.3;
export const EARTH_CLOUDS_SIDERAL_DAY = HOUR * 14;

export const MERCURY_ORBITAL_PERIOD = DAY * 88;
export const VENUS_ORBITAL_PERIOD = DAY * 225;
export const EARTH_ORBITAL_PERIOD = YEAR;
export const MARS_ORBITAL_PERIOD = YEAR * 1.88;
export const JUPITER_ORBITAL_PERIOD = YEAR * 11.86;
export const SATURN_ORBITAL_PERIOD = YEAR * 29.46;
export const URANUS_ORBITAL_PERIOD = YEAR * 84;
export const NEPTUNE_ORBITAL_PERIOD = YEAR * 164.8;
export const MOON_ORBITAL_PERIOD = DAY * 27.3;

export const MOON_DISTANCE_TO_ORBITED = AU * 0.002499;
export const MERCURY_DISTANCE_TO_ORBITED = AU * 0.39;
export const VENUS_DISTANCE_TO_ORBITED = AU * 0.72;
export const EARTH_DISTANCE_TO_ORBITED = AU;
export const MARS_DISTANCE_TO_ORBITED = AU * 1.52;
export const JUPITER_DISTANCE_TO_ORBITED = AU * 5.2;
export const SATURN_DISTANCE_TO_ORBITED = AU * 9.5;
export const URANUS_DISTANCE_TO_ORBITED = AU * 19.2;
export const NEPTUNE_DISTANCE_TO_ORBITED = AU * 30.1;
export const EARTH_CLOUDS_DISTANCE_TO_ORBITED = AU;

export const EARTH = {
  name: "earth",
  radius: EARTH_SIZE,
  mass: EARTH_MASS,
  position: [0, 0, 0],
  velX: 0,
  velY: 0,
  velZ: 0,
  widthSegments: 32,
  heightSegments: 32,
  isPlanet: true,
  canBeFocused: true,
};
export const EARTH_CLOUDS = {
  name: "earthClouds",
  radius: EARTH_CLOUDS_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  isPlanet: false,
  canBeFocused: false,
};
export const MOON = {
  name: "moon",
  radius: MOON_SIZE,
  mass: MOON_MASS,
  widthSegments: 32,
  heightSegments: 32,
  position: [0, 0, 384400],
  velX: 1.022 * KILOMETER / SECOND,
  velY: 0,
  velZ: 0,
  isPlanet: true,
  canBeFocused: true,
};
export const MERCURY = {
  name: "mercury",
  radius: MERCURY_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  sideralDay: MERCURY_SIDERAL_DAY,
  orbitalPeriod: MERCURY_ORBITAL_PERIOD,
  distanceToOrbited: MERCURY_DISTANCE_TO_ORBITED,
  translateCounterClockWise: true,
  rotateCounterClockWise: true,
  isPlanet: true,
  canBeFocused: true,
};
export const VENUS = {
  name: "venus",
  radius: VENUS_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  sideralDay: VENUS_SIDERAL_DAY,
  orbitalPeriod: VENUS_ORBITAL_PERIOD,
  distanceToOrbited: VENUS_DISTANCE_TO_ORBITED,
  translateCounterClockWise: true,
  isPlanet: true,
  canBeFocused: true,
};
export const MARS = {
  name: "mars",
  radius: MARS_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  sideralDay: MARS_SIDERAL_DAY,
  orbitalPeriod: MARS_ORBITAL_PERIOD,
  distanceToOrbited: MARS_DISTANCE_TO_ORBITED,
  translateCounterClockWise: true,
  rotateCounterClockWise: true,
  isPlanet: true,
  canBeFocused: true,
};
export const JUPITER = {
  name: "jupiter",
  radius: JUPITER_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  sideralDay: JUPITER_SIDERAL_DAY,
  orbitalPeriod: JUPITER_ORBITAL_PERIOD,
  distanceToOrbited: JUPITER_DISTANCE_TO_ORBITED,
  translateCounterClockWise: true,
  rotateCounterClockWise: true,
  isPlanet: true,
  canBeFocused: true,
};
export const SATURN = {
  name: "saturn",
  radius: SATURN_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  sideralDay: SATURN_SIDERAL_DAY,
  orbitalPeriod: SATURN_ORBITAL_PERIOD,
  distanceToOrbited: SATURN_DISTANCE_TO_ORBITED,
  translateCounterClockWise: true,
  rotateCounterClockWise: true,
  isPlanet: true,
  canBeFocused: true,
};
export const URANUS = {
  name: "uranus",
  radius: URANUS_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  sideralDay: URANUS_SIDERAL_DAY,
  orbitalPeriod: URANUS_ORBITAL_PERIOD,
  distanceToOrbited: URANUS_DISTANCE_TO_ORBITED,
  translateCounterClockWise: true,
  rotateCounterClockWise: true,
  isPlanet: true,
  canBeFocused: true,
};
export const NEPTUNE = {
  name: "neptune",
  radius: NEPTUNE_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  sideralDay: NEPTUNE_SIDERAL_DAY,
  orbitalPeriod: NEPTUNE_ORBITAL_PERIOD,
  distanceToOrbited: NEPTUNE_DISTANCE_TO_ORBITED,
  translateCounterClockWise: true,
  rotateCounterClockWise: true,
  isPlanet: true,
  canBeFocused: true,
};

export const SUN = {
  name: "sun",
  radius: SUN_SIZE,
  widthSegments: 32,
  heightSegments: 32,
  isPlanet: false,
  canBeFocused: true,
};


export const MESHES_DEFINITION = [
  //MERCURY,
  //VENUS,
  EARTH,
  //MARS,
  //JUPITER,
  //SATURN,
  //URANUS,
  //NEPTUNE,
  MOON,
  //EARTH_CLOUDS,
];

export const TARGET_CAM_DISTANCE = 3;
