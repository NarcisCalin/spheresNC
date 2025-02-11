import * as THREE from 'three'

import scene from './basic/Scene.js'
import camera from './basic/Camera.js'
import renderer from './basic/Renderer.js'
import light from './basic/Light.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Star } from './shapes/Star.js'
import { Planet } from './shapes/Planet.js'
import onWindowResize from './basic/Resize.js'
import { Container } from './shapes/Container.js'
import { bumpMap } from 'three/tsl'

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


const loader = new THREE.TextureLoader()
const earthAlbedo = loader.load("/textures/earthAlbedo.png")
const earthBump = loader.load("/textures/earthBump.png")
const earthRough = loader.load("/textures/earthRough.png")
const earthCloud = loader.load("/textures/earthClouds.png")
const moonAlbedo = loader.load("/textures/moonAlbedo.jpg")
const moonBump = loader.load("/textures/moonBump.jpg")


const AU = 100
const EARTH_SIZE = AU / 11727
//const EARTHATMOS_SIZE = EARTH_SIZE * 1.2
const EARTHCLOUDS_SIZE = EARTH_SIZE * 1.006
const MOON_SIZE = EARTH_SIZE / 3.67
const SUN_SIZE = EARTH_SIZE * (109/2)


const container = new Container(EARTH_SIZE)
const star = new Star(SUN_SIZE,64,64)
const planet = new Planet(EARTH_SIZE,32,32)
const planetClouds = new Planet(EARTHCLOUDS_SIZE,32,32)
//const planetAtmos = new Planet(EARTHCLOUDS_SIZE,32,32)
const moon = new Planet(MOON_SIZE ,32,32)
let cameraParent = planet


planet.loadTexture(earthAlbedo, earthBump, 2, earthRough)
planetClouds.loadTexture(earthCloud, earthCloud, 2, 0, 1, earthCloud, 1)
//planetAtmos.loadTexture(0, 0, 0, 0, 1, 1, 1)
moon.loadTexture(moonAlbedo, moonBump, 5)





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
  camera.position.set(5,0,0)
  
  
  controls.maxDistance = 0.04
  controls.update()
  controls.maxDistance = Infinity
  let previousTime = 0
  function animate(currentTime){  

    const deltaTime = (currentTime - previousTime) / 1000 // Tiempo en segundos
    previousTime = currentTime

    const planetOrbitIncrement = (2 * Math.PI / year) * deltaTime
    const moonOrbitIncrement = (2 * Math.PI / (day * 27.3)) * deltaTime
    const planetRotationIncrement = (2 * Math.PI / day) * deltaTime
    const planetCloudsRotationIncrement = (2 * Math.PI / hour / 14) * deltaTime
    const moonRotationIncrement = (2 * Math.PI /  (day * 27.3)) * deltaTime

  planet.toOrbit(star,AU,planetOrbitIncrement,true)
  planetClouds.toOrbit(star,AU,planetOrbitIncrement,true)
  //planetAtmos.toOrbit(star,AU,planetOrbitIncrement,true)
  moon.toOrbit(planet,AU * 0.002499,moonOrbitIncrement,true)
  planet.rotate(planetRotationIncrement)
  planetClouds.rotate(planetCloudsRotationIncrement)
  moon.rotate(moonRotationIncrement)
  
  container.position.copy(cameraParent.position)
  
  camera.lookAt(cameraParent.position)
  
  
  
  renderer.render(scene,camera)
  scene.add(planet.lineOrbit,moon.lineOrbit)
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

scene.add(star,planet,planetClouds,light,moon,container)

window.addEventListener( 'dblclick', ()=>changeCamera() );

function changeCamera(){
  
  console.log(cameraParent == planet);
  if(cameraParent == planet){
    console.log("planet to moon");
    container.position.set(moon.position)
    console.log(container.geometry.getAttribute())
    cameraParent = moon

    controls.maxDistance = 0.014
    controls.update()
    controls.maxDistance = Infinity

    
  }else if(cameraParent == moon){
    
    console.log("moon to star");
    container.position.set(star.position)
    cameraParent = star 

    controls.maxDistance = 1
    controls.update()
    controls.maxDistance = Infinity
    
  }else{
    console.log("star to planet");
    container.position.set(moon.position)
    cameraParent = planet

    controls.maxDistance = 0.04
    controls.update()
    controls.maxDistance = Infinity
    

  }

}

function calcularIncrementoAngular(segundosPorVuelta, framesPorSegundo) {
  // const totalFrames = segundosPorVuelta * framesPorSegundo;
  const angleIncrementRadians = (2 * Math.PI /segundosPorVuelta) / framesPorSegundo;
  return angleIncrementRadians;
}

window.addEventListener( 'resize', ()=>onWindowResize(camera,renderer), false );
