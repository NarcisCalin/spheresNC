import * as THREE from 'three'

const light = new THREE.AmbientLight(0x000000)
 const pointLight= new THREE.PointLight(0xff8000,50)

 pointLight.castShadow = true // Añadir sombras
 pointLight.shadow.radius = 8; // Suavizar sombras

 light.add(pointLight)
export default light