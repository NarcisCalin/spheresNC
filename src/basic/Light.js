import * as THREE from 'three'

const light = new THREE.AmbientLight(0x404040)
 const pointLight= new THREE.PointLight(0xffffff,10000)

 pointLight.castShadow = true // Añadir sombras
 pointLight.shadow.radius = 8; // Suavizar sombras

 light.add(pointLight)
export default light