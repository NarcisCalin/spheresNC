import * as THREE from 'three'
import { materialThickness, texture } from 'three/tsl';

export class Planet extends THREE.Mesh{

  translationAngle = 0
  rotateAngle = 0
  orbit = []
  mass = 0
  velX = 0
  velY = 0
  velZ = 0
  lineOrbit =  new THREE.Line( new THREE.BufferGeometry().setFromPoints( this.orbit ), new THREE.LineBasicMaterial({
        color:0xffffff
      }));


  
  constructor({radius, mass, posX, posY, posZ, velX, velY, velZ, widthSegments,heightSegments}){
   
    const geometry = new THREE.SphereGeometry(radius,widthSegments,heightSegments)
    const material =  new THREE.MeshPhysicalMaterial({color: 0xffffff})
    super(geometry,material)
    this.mass = mass
    this.position.x = posX
    this.position.y = posY
    this.position.z = posZ
    this.velX = velX
    this.velY = velY
    this.velZ = velZ
    

  }
      loadTexture(map, bumpMap = undefined, bumpScale = 1, roughnessMap = undefined, transparent = 0, alphaMap = undefined){
        this.material = new THREE.MeshPhysicalMaterial({
            map,
            bumpMap,
            bumpScale,
            roughnessMap,
            transparent,
            alphaMap,
            
            
          })
      }
      
}