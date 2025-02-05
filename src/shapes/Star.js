import * as THREE from 'three'

export class Star extends THREE.Mesh{

  constructor(radius,widthSegments,heightSegments){

    const geometry = new THREE.SphereGeometry( radius,widthSegments,heightSegments )
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
    
    material.emissive= new THREE.Color(0xff8000)
    material.emissiveIntensity =  1.7
    material.blendAlpha= 100
    
    super(geometry,material)
  }

 addStar(scene) {
  
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    this.position.set(x,y,z)
    scene.add(this)
  }

}

