import * as THREE from 'three'

import scene from './basic/Scene.js'
import camera from './basic/Camera.js'
import renderer from './basic/Renderer.js'
import light from './basic/Light.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Star } from './shapes/Star.js'
import { Planet as Body } from './shapes/Planet.js'
import onWindowResize from './basic/Resize.js'
import { Container } from './shapes/Container.js'
import { bumpMap, deltaTime } from 'three/tsl'

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
const EARTH_SIZE = AU / 11727
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
const planet = new Body({radius: EARTH_SIZE, mass: EARTH_MASS, posX: AU, posY: 0, posZ: 0, velX: 0, velY: 0, velZ: 107000 * 10 , widthSegments: 32, heightSegments: 32})
const planetClouds = new Body(EARTHCLOUDS_SIZE,32,32)
//const planetAtmos = new Planet(EARTHCLOUDS_SIZE,32,32)
const moon = new Body({radius: MOON_SIZE, mass: MOON_MASS, posX: AU, posY: 0, posZ: 384400, velX: 28000, velY: 0, velZ: 107000 * 10, widthSegments: 32, heightSegments: 32})
const sun = new Body({radius: SUN_SIZE, mass: SUN_MASS, posX: 0, posY: 0, posZ: 0, velX: 0, velY: 0, velZ: 0, widthSegments: 64, heightSegments: 64})
let cameraParent = star


planet.loadTexture(earthAlbedo, earthBump, 2, earthRough)
planetClouds.loadTexture(earthCloud, earthCloud, 2, 0, 1, earthCloud, 1)
//planetAtmos.loadTexture(0, 0, 0, 0, 1, 1, 1)
moon.loadTexture(moonAlbedo, moonBump, 5)

const bodies = []
 Array(100).fill().forEach(()=>{
        const nbody = new Body({
          radius: MOON_SIZE / 10,
          mass: MOON_MASS / 100,
          posX: AU + Math.random() * 40000 - 20000,
          posY: Math.random() * 8000 - 4000,
          posZ: Math.random() * 100000 + 50000,
          velX: Math.random() * 1000 - 500,
          velY: Math.random() * 8000 - 4000,
          velZ: 107000 * 10 + 100000,
          widthSegments: 32,
          heightSegments: 32})


        bodies.push(nbody)
      })

      bodies.push(planet, moon, sun)
//const bodies = [planet, moon, moon2, moon3]

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
const MAX_DOTS = 1200;
const trailGeometry = new THREE.SphereGeometry(250, 4, 4);
const trailMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });


function bodyTrail(bodies) {
  // Add new dots for each body
  for (const body of bodies) {
    const dot = new THREE.Mesh(trailGeometry, trailMaterial);
    dot.position.copy(body.position);
    trailDots.push(dot);
    scene.add(dot);
    planet.attach(dot)
  }



  // Remove excess dots from the beginning and the scene
  while (trailDots.length > MAX_DOTS) {
    const oldDot = trailDots.shift(); // Remove oldest dot
    scene.remove(oldDot);
    planet.remove(oldDot)
  }
}



planet.castShadow = true
planet.receiveShadow = true
moon.castShadow = true
moon.receiveShadow = true




container.add(camera)
cameraParent = planet




  camera.position.set(240000000,24000,-20000)
  
  
  controls.maxDistance = 60000
  controls.update()
  controls.maxDistance = Infinity
  let previousTime = 0
  function animate(currentTime){  
    
    const deltaTime = (currentTime - previousTime) / 100 // Tiempo en segundos
    previousTime = currentTime
    
    gravityLogic(deltaTime, bodies)

    bodyTrail(bodies)
   

   

    



    //testAngle += 0.1

    //moon.position.x = 
    
    
    
    
    container.position.copy(cameraParent.position)
    
    camera.lookAt(cameraParent.position)
    
    renderer.render(scene,camera)
    scene.add(planet.lineOrbit,moon.lineOrbit)
    requestAnimationFrame(animate)
    
    
    
    
    
  }
  
  requestAnimationFrame(animate)
  
  scene.add(light,container,axesHelper)
  
  window.addEventListener( 'dblclick', ()=>changeCamera() );
  
  
  
  
  function changeCamera(){
    
    console.log(cameraParent == planet);
    if(cameraParent == planet){
    console.log("planet to moon");
    container.position.set(moon.position)
    console.log(container.geometry.getAttribute())
    cameraParent = moon
    controls.minDistanceDistance = 24000
    controls.maxDistance = 24000
    controls.update()
    controls.maxDistance = Infinity

    
  }else if(cameraParent == moon){
    
    console.log("moon to star");
    container.position.set(star.position)
    cameraParent = star 
    controls.minDistanceDistance = 60000
    controls.maxDistanceDistance = 60000
    controls.update()
    controls.maxDistance = Infinity
    
  }else{
    console.log("star to planet");
    container.position.set(moon.position)
    cameraParent = planet
    controls.minDistanceDistance = 24000
    controls.maxDistanceDistance = 24000
    controls.update()
    controls.maxDistance = Infinity
    

  }

}



window.addEventListener( 'resize', ()=>onWindowResize(camera,renderer), false );
