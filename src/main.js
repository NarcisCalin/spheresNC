import * as THREE from 'three'

import scene from './basic/Scene.js'
import camera from './basic/Camera.js'
import renderer from './basic/Renderer.js'
import light from './basic/Light.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Star } from './shapes/Star.js'
import { Planet as Body } from './shapes/Planet.js'
import { PlanetVisuals } from './shapes/PlanetVisual.js'
import onWindowResize from './basic/Resize.js'
import { Container } from './shapes/Container.js'
import { bumpMap, deltaTime } from 'three/tsl'
import Stats from 'stats.js'

const axesHelper = new THREE.AxesHelper( 100000 );

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap


const controls = new OrbitControls( camera, renderer.domElement );




const framesPerSecond = 60
// const secondsPerHour = 3600
// const hourlyRotation = (2 * Math.PI) / (secondsPerHour * framesPerSecond)

const second = 1
const minute = second * 60
const hour = minute * 60
const day = hour * 24 
const year = day * 365 

const G = 6.674 * Math.pow(10, -11)

const loader = new THREE.TextureLoader()
const earthAlbedo = loader.load("/textures/earthAlbedo.png")
const earthBump = loader.load("/textures/earthBump.png")
const earthRough = loader.load("/textures/earthRough.png")
const earthCloud = loader.load("/textures/earthClouds.png")
const moonAlbedo = loader.load("/textures/moonAlbedo.jpg")
const moonBump = loader.load("/textures/moonBump.jpg")

const KM = 1
const AU = KM * 1.496 * Math.pow(10, 8)
const EARTH_SIZE = KM * 6378
//const EARTHATMOS_SIZE = EARTH_SIZE * 1.2
const EARTHCLOUDS_SIZE = EARTH_SIZE * 1.006
const MOON_SIZE = EARTH_SIZE / 3.67
const SUN_SIZE = EARTH_SIZE * (109/2)

const EARTH_MASS = 5.9722 * Math.pow(10, 24)
const MOON_MASS  = 7.3477 * Math.pow(10, 22)
const SUN_MASS = 2* Math.pow(10, 30)
console.log(EARTH_MASS)


const container = new Container(EARTH_SIZE)
const star = new Star(SUN_SIZE,64,64)
const earth = new Body({radius: EARTH_SIZE, mass: EARTH_MASS, posX: AU, posY: 0, posZ: 0, velX: 0, velY: 0, velZ: 107000 * 10 , widthSegments: 32, heightSegments: 32})
const planetClouds = new PlanetVisuals(EARTHCLOUDS_SIZE,32,32)
//const planetAtmos = new Planet(EARTHCLOUDS_SIZE,32,32)
const moon = new Body({radius: MOON_SIZE, mass: MOON_MASS, posX: AU, posY: 0, posZ: 384400, velX: 28000, velY: 0, velZ: 107000 * 10, widthSegments: 32, heightSegments: 32})
const sun = new Body({radius: SUN_SIZE, mass: SUN_MASS, posX: 0, posY: 0, posZ: 0, velX: 0, velY: 0, velZ: 0, widthSegments: 64, heightSegments: 64})
const mars = new Body({radius: EARTH_SIZE * 0.532, mass: EARTH_MASS * 0.107, posX: AU * 1.5, posY: 0, posZ: 0, velX: 0, velY: 0, velZ: (107000 * 10) * 0.809 , widthSegments: 32, heightSegments: 32})
let cameraParent = star


earth.loadTexture(earthAlbedo, earthBump, 2, earthRough)
planetClouds.loadTexture(earthCloud, earthCloud, 2, 0, 1, earthCloud, 1)
//planetAtmos.loadTexture(0, 0, 0, 0, 1, 1, 1)
moon.loadTexture(moonAlbedo, moonBump, 5)


const manualBodies = [sun, earth, moon, mars,]
const bodies = []
Array(300).fill().forEach(()=>{
  const nbody = new Body({
    radius: MOON_SIZE / 8,
    mass: MOON_MASS / 100,
    posX: AU + Math.random() * 15000 - 7500,
    posY: Math.random() * 8000 - 4000,
    posZ: Math.random() * 50000 + 25000,
    velX: 100000,
    velY: Math.random() * 8000 - 4000,
    velZ: 107000 * 10 + 50000,
    widthSegments: 32,
    heightSegments: 32})
    
    
    bodies.push(nbody)
  })
  
  bodies.push(...manualBodies)
  //const bodies = [planet, moon, moon2, moon3]
  //earth.add(planetClouds)
  //Esto es para añadir complementos a planetas como nubes
  //scene.add(planetClouds)
  
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
      
      let force = G * bodyA.mass * bodyB.mass / distanceSquared
      
      
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
  }



}

const trailDots = []; // Moved outside the function to persist between calls
const trailGeometry = new THREE.SphereGeometry(250, 4, 4);
const trailMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });


const MAX_DOTS = 6 * bodies.length;
function bodyTrail(bodies) {


  // Add new dots for each body
  for (const body of bodies) {
    const dot = new THREE.Mesh(trailGeometry, trailMaterial);
    dot.position.copy(body.position);
    trailDots.push(dot);
    scene.add(dot);
    earth.attach(dot)
  }
  
  
  // Remove excess dots from the beginning and the scene
  while (trailDots.length > MAX_DOTS) {
    const oldDot = trailDots.shift(); // Remove oldest dot
    scene.remove(oldDot);
    earth.remove(oldDot)
  }
  
}



earth.castShadow = true
earth.receiveShadow = true
moon.castShadow = true
moon.receiveShadow = true











let previousTime = 0

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );



container.add(camera)
camera.position.set(240000000,24000,-20000)
let manualPlanetsIndex = 1
const planetCamDistance = 3

cameraParent = manualBodies.at(manualPlanetsIndex)
controls.minDistance = manualBodies.at(manualPlanetsIndex).radius * planetCamDistance
controls.maxDistance = manualBodies.at(manualPlanetsIndex).radius * planetCamDistance
controls.update()
controls.minDistance = 0
controls.maxDistance = Infinity

window.addEventListener( 'keypress', ()=>changeCameraUpdated() );

function changeCameraUpdated(){

  if(camera.position === camera.position){

    if(manualPlanetsIndex < manualBodies.length - 1) {
      manualPlanetsIndex += 1
      cameraParent = manualBodies.at(manualPlanetsIndex)
      controls.minDistance = manualBodies.at(manualPlanetsIndex).radius * planetCamDistance
      controls.maxDistance = manualBodies.at(manualPlanetsIndex).radius * planetCamDistance
      controls.update()
      controls.minDistance = 0
      controls.maxDistance = Infinity
      
    }else{
      manualPlanetsIndex = 0
      cameraParent = manualBodies.at(manualPlanetsIndex)
      controls.minDistance = manualBodies.at(manualPlanetsIndex).radius * planetCamDistance
      controls.maxDistance = manualBodies.at(manualPlanetsIndex).radius * planetCamDistance
      controls.update()
      controls.minDistance = 0
      controls.maxDistance = Infinity
      
    }
  }

  }

  function animate(currentTime){  
    
    const deltaTime = (currentTime - previousTime) / 1000 // Tiempo en segundos
    previousTime = currentTime
    
    gravityLogic(deltaTime, bodies)

    bodyTrail(bodies)
   
   
    stats.begin();

    
    container.position.copy(cameraParent.position)
    
    camera.lookAt(cameraParent.position)
    
    renderer.render(scene,camera)
    scene.add(earth.lineOrbit,moon.lineOrbit)


    stats.end();

    requestAnimationFrame(animate)
    
    
    
    
    
  }
  
  requestAnimationFrame(animate)
  
  scene.add(light,container,axesHelper)

  
  
  



window.addEventListener( 'resize', ()=>onWindowResize(camera,renderer), false );
