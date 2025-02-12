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

const EARTH_MASS = 5.9722 * Math.pow(10, 24);
const MOON_MASS  = 7.3477 * Math.pow(10, 22)
console.log(EARTH_MASS)


const container = new Container(EARTH_SIZE)
const star = new Star(SUN_SIZE,64,64)
const planet = new Body({radius: EARTH_SIZE, mass: EARTH_MASS, posX: 0, posY: 0, posZ: 0, velX: 0, velY: 0, velZ: 0, widthSegments: 32, heightSegments: 32})
const planetClouds = new Body(EARTHCLOUDS_SIZE,32,32)
//const planetAtmos = new Planet(EARTHCLOUDS_SIZE,32,32)
const moon = new Body({radius: MOON_SIZE, mass: MOON_MASS * 2, posX: 0, posY: 0, posZ: 100000, velX: 0, velY: 40000, velZ: 10000, widthSegments: 32, heightSegments: 32})
const moon2 = new Body({radius: MOON_SIZE, mass: MOON_MASS * 3, posX: 0, posY: 0, posZ: 130000, velX: 30000, velY: 10000, velZ: 0, widthSegments: 32, heightSegments: 32})
let cameraParent = star


planet.loadTexture(earthAlbedo, earthBump, 2, earthRough)
planetClouds.loadTexture(earthCloud, earthCloud, 2, 0, 1, earthCloud, 1)
//planetAtmos.loadTexture(0, 0, 0, 0, 1, 1, 1)
moon.loadTexture(moonAlbedo, moonBump, 5)


const bodies = [planet, moon, moon2]

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
    
      //console.log(bodyA)
    }
  }
  for (const body of bodies) {
    body.position.x += body.velX * deltaTime
    body.position.y += body.velY * deltaTime
    body.position.z += body.velZ * deltaTime
    
  }



}

function bodyTrail(bodies){
  const trailDots = []
  const geometry = new THREE.SphereGeometry(200, 32 ,32)
  const material = new THREE.MeshBasicMaterial({color: 0xffffff})
  const BODIES_NUM = bodies.length
  
  for (const body of bodies){
    const dot = new THREE.Mesh(geometry, material)
    dot.position.copy(body.position)
    trailDots.push(dot)
  }
  
  /* const MAX_DOTS = 50
  if(trailDots.length >= MAX_DOTS){
    const EXCESS = trailDots.length - MAX_DOTS
    trailDots.pop(trailDots.)
  } */
  for (const dot of trailDots){
    scene.add(dot)
  }
   

}



planet.castShadow = true
planet.receiveShadow = true
moon.castShadow = true
moon.receiveShadow = true




container.add(camera)



// Array(200).fill().forEach(()=>{
  //     const star = new Star(SUN_SIZE, 32, 16)
  //     star.addStar(scene)
  //   })
  
  //planet.position.x = AU
  camera.position.set(-48000,24000,-20000)
  
  
  controls.maxDistance = 60000
  controls.update()
  controls.maxDistance = Infinity
  let previousTime = 0
  function animate(currentTime){  
    
    const deltaTime = (currentTime - previousTime) / 1000 // Tiempo en segundos
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
  
  scene.add(planet,planetClouds,light,moon,moon2,container, axesHelper)
  
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
