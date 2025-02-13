import * as THREE from 'three'
import { materialThickness, texture } from 'three/tsl';

export class PlanetVisuals extends THREE.Mesh{
 
  constructor({radius, widthSegments,heightSegments}){
   
    const geometry = new THREE.SphereGeometry(radius,widthSegments,heightSegments)
    const material =  new THREE.MeshPhysicalMaterial({color: 0xffffff})
    super(geometry,material)
    this.radius = radius
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