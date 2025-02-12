import * as THREE from 'three'

export class Container extends THREE.Mesh {


  constructor(radius){

    const size = radius *  1/2

     const geometry = new THREE.BoxGeometry(size,size,size)
     const material =  new THREE.MeshBasicMaterial({color: 0xffffff,wireframe: true}) 
        
    super(geometry,material)
  }


}