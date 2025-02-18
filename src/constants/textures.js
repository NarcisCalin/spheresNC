import { emissive } from "three/tsl";

export const earthTexturesRoute = {
  map: "/textures/earthAlbedo.png",
  bumpMap: "/textures/earthBump.png",
  roughnessMap: "/textures/earthRough.png",
};
export const earthCloudsTexturesRoute = {
  map: "/textures/earthClouds.png",
  bumpMap: "/textures/earthClouds.png",
  bumpScale: 2,
  roughnessMap: null,
  alphaMap: "/textures/earthClouds.png",
  trasparent: true,
};
export const mercuryTexturesRoute = { map: "/textures/mercuryAlbedo.jpg" };
export const moonTexturesRoute = {
  map: "/textures/moonAlbedo.jpg",
  bumpMap: "/textures/moonBump.jpg",
  bumpScale: 5,
};
export const venusTexturesRoute = { map: "/textures/venusAlbedo.jpg" };
export const marsTexturesRoute = { map: "/textures/marsAlbedo.jpg" };
export const jupiterTexturesRoute = { map: "/textures/jupiterAlbedo.jpg" };
export const saturnTexturesRoute = { map: "/textures/saturnAlbedo.jpg" };
export const uranusTexturesRoute = { map: "/textures/uranusAlbedo.jpg" };
export const neptuneTexturesRoute = { map: "/textures/neptuneAlbedo.jpg" };
export const sunTexturesRoute = {
  emissiveMap: "/textures/sunAlbedo.jpg",
  emissive: 0xff8000,
};

export const texturesRouteMap = {
  sun: sunTexturesRoute,
  mercury: mercuryTexturesRoute,
  venus: venusTexturesRoute,
  earth: earthTexturesRoute,
  mars: marsTexturesRoute,
  jupiter: jupiterTexturesRoute,
  saturn: saturnTexturesRoute,
  uranus: uranusTexturesRoute,
  neptune: neptuneTexturesRoute,
  moon: moonTexturesRoute,
  earthClouds: earthCloudsTexturesRoute,
  nbody: moonTexturesRoute,
};
