import * as THREE from 'three'

export class Planet extends THREE.Mesh{

  constructor(radius,widthSegments,heightSegments){
    const geometry = new THREE.SphereGeometry(radius,widthSegments,heightSegments)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    

    super(geometry,material)
  }

}