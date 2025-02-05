import * as THREE from 'three'

import scene from './basic/Scene.js'
import camera from './basic/Camera.js'
import renderer from './basic/Renderer.js'
import light from './basic/Light.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Star } from './shapes/Star.js'
import { Planet } from './shapes/Planet.js'
import {Moon} from './shapes/moon.js' // Nueva clase de luna
import onWindowResize from './basic/Resize.js'

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//renderer.toneMapping = THREE.CineonToneMapping // He metido esto para testear.
                                                 // Lo dejo metido por si quieres experimentar

const loader = new THREE.TextureLoader();
const spaceBg = new THREE.TextureLoader().load( "textures/spaceBG.png" )
scene.background = spaceBg
spaceBg.mapping = THREE.EquirectangularRefractionMapping
spaceBg.colorSpace = THREE.SRGBColorSpace
  
// He reducido el número de lados porque 1000 era un valor extremadamente alto
const star = new Star(1,64,64)
const planet = new Planet(.5,32,32) 
const moon = new Moon(0.2,16,16)

const planeGeometry = new THREE.PlaneGeometry(20, 20)
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial )

const pointLightHelper = new THREE.PointLightHelper(light)

const controls = new OrbitControls( camera, renderer.domElement )

// Angle para luna y para planeta
let anglePlanet = 0
let angleMoon = 0


Array(200).fill().forEach(()=>{
  const star = new Star(0.1, 32, 16)
  star.addStar(scene)
})




camera.position.set(0,5,7)
light.position.set(0,0,0)

// Permite sombras para ecplises
planet.castShadow = true
planet.receiveShadow = true
moon.castShadow = true
moon.receiveShadow = true



setInterval(()=>{
  
  planet.position.x = Math.cos(anglePlanet) * 6
  planet.position.z = Math.sin(anglePlanet) * 6
  anglePlanet += .01

// Código para la órbita de la luna

  moon.position.x = planet.position.x + Math.cos(angleMoon) * 2
  moon.position.z = planet.position.z + Math.sin(angleMoon) * 2
  angleMoon += .03
  
  if(anglePlanet > Math.PI*2 ){
    anglePlanet = 0
  }  
  // Limitador para que no explote el pc con la luna
  if(angleMoon > Math.PI*2 ){
    angleMoon = 0
  } 
  
  controls.update() 
  renderer.render(scene,camera)
  
},1000/60)

scene.add(star,planet,moon,light)


window.addEventListener( 'resize', ()=>onWindowResize(camera,renderer), false )
