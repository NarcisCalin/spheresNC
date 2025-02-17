import * as THREE from 'three'

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

const axesHelper = new THREE.AxesHelper( 100000 );
scene.add(axesHelper)

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const cameraService = CameraService.getInstance();
const texturesService = TexturesService.getInstance();

const camera = cameraService.createPerspectiveCamera({
  fov: 75,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 100000000000,
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
const moon = allMeshes.filter((mesh) => mesh.name === "moon")[0];

const bodiesWithWorkers = [...planets, earthClouds];

//const planetWorkerService = new PlanetWorkerService(bodiesWithWorkers);
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

//earth.add(earthClouds);
//earthClouds.position.set(0, 0, 0);

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
  //const sun = new Star(Constants.SUN);

  const allMeshes = {};
  //allMeshes[sun.name] = sun;

  meshesDefinition.forEach((planet) => {
    const planetMesh = new Planet(planet);

    
    allMeshes[planet.name] = planetMesh;
  });


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

//GRAVITY SIMULATION

const manualBodies = [earth, moon]
const bodies = [...manualBodies]
// Array(200).fill().forEach(()=>{
//   const nbody = allMeshes.filter((mesh) => mesh.name === "nbody")[0];
    
    
//     bodies.push(nbody)
//   })

  function gravityLogic(deltaTime, bodies){
    
    for(let i = 0; i < bodies.length; i++){
      for(let j = i + 1; j < bodies.length; j++){
        
        const bodyA = bodies[i]
        const bodyB = bodies[j]
        
        let distanceX = bodyB.position.x - bodyA.position.x
        let distanceY = bodyB.position.y - bodyA.position.y
        let distanceZ = bodyB.position.z - bodyA.position.z
        
        let distanceSquared = distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ
        let distance = Math.sqrt(distanceSquared)
        
        let force = Constants.G * bodyA.mass * bodyB.mass / distanceSquared
        
        let normalizedX = distanceX / distance
        let normalizedY = distanceY / distance
        let normalizedZ = distanceZ / distance
        
        let accelerationBodyA = force / bodyA.mass
        let accelerationBodyB = force / bodyB.mass
        
        bodyA.velX += normalizedX * accelerationBodyA * deltaTime
        bodyA.velY += normalizedY * accelerationBodyA * deltaTime
        bodyA.velZ += normalizedZ * accelerationBodyA * deltaTime
        
        bodyB.velX -= normalizedX * accelerationBodyB * deltaTime
        bodyB.velY -= normalizedY * accelerationBodyB * deltaTime
        bodyB.velZ -= normalizedZ * accelerationBodyB * deltaTime
        console.log(bodyA.position.x)
        
        if(distance <= 10){
          bodyA.velX = 0
          bodyA.velY = 0
          bodyA.velZ = 0
          bodyB.velX = 0
          bodyB.velY = 0
          bodyB.velZ = 0
        }
      }
    }
    for (const body of bodies) {
      body.position.x += body.velX * deltaTime
      body.position.y += body.velY * deltaTime
      body.position.z += body.velZ * deltaTime
      scene.add(body)
      body.frustumCulled = false;
    }
  }

  const trailDots = [];
const trailGeometry = new THREE.SphereGeometry(2, 8, 8);
const trailMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const MAX_DOTS = 150 * bodies.length;

function bodyTrail(bodies) {
  
  for (const body of bodies) {
    const dot = new THREE.Mesh(trailGeometry, trailMaterial);
    dot.position.copy(body.position);
    
    dot.userData.bodyId = body.name;
    trailDots.push(dot);
    scene.add(dot);
    
    // earth.attach(dot);
  }

  
  while (trailDots.length > MAX_DOTS) {
    const oldDot = trailDots.shift(); 
    scene.remove(oldDot);
    
    // earth.remove(oldDot);
  }
  bodies.forEach((body) => {
    body.frustumCulled = false;
  });
}

const trailLinesGroup = new THREE.Group();
scene.add(trailLinesGroup);

function trailLines(trailDots, manualBodies) {
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });

  // Remove previous line objects from the group
  while (trailLinesGroup.children.length > 0) {
    trailLinesGroup.remove(trailLinesGroup.children[0]);
  }
  
  for (const body of manualBodies) {
    // Filter dots for the current body
    const bodyTrailDots = trailDots.filter(dot => dot.userData.bodyId === body.name);
    if (bodyTrailDots.length < 2) continue; // Need at least 2 dots to form a line

    const points = [];
    
    // Build line segments by connecting consecutive dots
    for (let i = 1; i < bodyTrailDots.length; i++) {
      const previousDot = bodyTrailDots[i - 1];
      const currentDot = bodyTrailDots[i];
      points.push(previousDot.position.clone());
      points.push(currentDot.position.clone());
    }
    
    if (points.length > 0) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.LineSegments(geometry, material);
      trailLinesGroup.add(line);
    }
  }
}

let trailIndex = 0;
let point2Position = 0;
















  
  function animate(currentTime) {
    stats.begin();
    const deltaTime = Calculations.calculateDeltaTime(currentTime, previousTime);
    previousTime = currentTime;

  //planetWorkerService.update(deltaTime);

  container.position.copy(container.getCurrentTarget().position);

  
  gravityLogic(deltaTime, bodies);
  bodyTrail(bodies);
  trailLines(trailDots, manualBodies);

  //earthClouds.position.copy(earth.position);
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
