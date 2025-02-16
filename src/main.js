import { light, renderer, scene } from "./basic";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Container, Planet, Star } from "./shapes/";
import onWindowResize from "./basic/Resize.js";
import * as Constants from "./constants/constants.js";
import * as Calculations from "./utils/calculations.js";
import * as TexturesRoutes from "./constants/textures.js";
import {
  CameraService,
  PlanetWorkerService,
  TexturesService,
} from "./services";

import Stats from "stats.js";

///STATS
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const cameraService = CameraService.getInstance();
const texturesService = TexturesService.getInstance();

const camera = cameraService.createPerspectiveCamera({
  fov: 75,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.001,
  far: 100000,
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

//OBJECTS
const container = new Container(Constants.SUN_SIZE);
const allMeshesJSON = initializeAllMeshes(Constants.MESHES_DEFINITION);

const allMeshes = Object.values(allMeshesJSON);
const planets = allMeshes.filter((mesh) => mesh instanceof Planet);

const earthClouds = allMeshes.filter((mesh) => mesh.name === "earthClouds")[0];
const earth = allMeshes.filter((mesh) => mesh.name === "earth")[0];

const bodiesWithWorkers = [...planets, earthClouds];

const planetWorkerService = new PlanetWorkerService(bodiesWithWorkers);
const cameraTargets = allMeshes.filter((mesh) => mesh.canBeFocused);
const sceneElements = [light, container, ...allMeshes];

//TEXTURES
await initializeTextures();

let previousTime = 0;
//CAMERA CONFIG
camera.position.set(-5, 0, 0);
container.add(camera);

container.setCurrentTarget(cameraTargets[0]);
adjustCamera(container.getCurrentTarget());

earth.add(earthClouds);
earthClouds.position.set(0, 0, 0);

addElementsToScene(sceneElements);

requestAnimationFrame(animate);

window.addEventListener("keypress", () =>
  changeCamera(container, cameraTargets)
);
window.addEventListener(
  "resize",
  () => onWindowResize(camera, renderer),
  false
);

function initializeAllMeshes(meshesDefinition) {
  const sun = new Star(Constants.SUN);

  const allMeshes = {};
  allMeshes[sun.name] = sun;

  meshesDefinition.forEach((planet) => {
    const planetMesh = new Planet(planet);

    planetMesh.setOrbited(sun);
    allMeshes[planet.name] = planetMesh;
  });
  const moon = allMeshes["moon"];
  const earth = allMeshes["earth"];

  moon.setOrbited(earth);

  return allMeshes;
}

async function initializeTextures() {
  const meshesWithTextures = createMeshesWithTexturesJSON(allMeshes);

  const texturesPromises = [];

  meshesWithTextures.forEach((meshWithTextures) => {
    texturesPromises.push(
      loadAndApplyTextures(
        meshWithTextures.mesh,
        meshWithTextures.texturesRoute
      )
    );
  });

  await Promise.all(texturesPromises);
}

function createMeshesWithTexturesJSON(allMeshes) {
  return allMeshes.map((mesh) => {
    return {
      mesh,
      texturesRoute: TexturesRoutes.texturesRouteMap[mesh.name] || undefined,
    };
  });
}

async function loadAndApplyTextures(mesh, texturesRoute) {
  const texturesLoaded = await texturesService.loadTextures(texturesRoute);
  texturesService.applyTextures(mesh, texturesLoaded);
}

function changeCamera() {
  cameraService.changeCamera(container, cameraTargets);
  const currentTarget = container.getCurrentTarget();
  adjustCamera(currentTarget);
}

function adjustCamera(currentTarget) {
  controls.minDistance =
    currentTarget.getRadius() * Constants.TARGET_CAM_DISTANCE;
  controls.maxDistance =
    currentTarget.getRadius() * Constants.TARGET_CAM_DISTANCE;
  controls.update();
  controls.minDistance = 0;
  controls.maxDistance = Infinity;
}

function animate(currentTime) {
  stats.begin();
  const deltaTime = Calculations.calculateDeltaTime(currentTime, previousTime);
  previousTime = currentTime;

  planetWorkerService.update(deltaTime);

  container.position.copy(container.getCurrentTarget().position);

  earthClouds.position.copy(earth.position);
  camera.lookAt(container.position);

  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(animate);
}

function addElementsToScene(elements) {
  elements.forEach((element) => {
    scene.add(element);
  });
}
