import * as THREE from 'three'
import { materialThickness, texture } from 'three/tsl';

export class Planet extends THREE.Mesh{

  translationAngle = 0
  rotateAngle = 0
  orbit = []
  lineOrbit =  new THREE.Line( new THREE.BufferGeometry().setFromPoints( this.orbit ), new THREE.LineBasicMaterial({
        color:0xffffff
      }));


  firstOrbit = false
  constructor(radius,widthSegments,heightSegments){
   
    const geometry = new THREE.SphereGeometry(radius,widthSegments,heightSegments)
    const material =  new THREE.MeshPhysicalMaterial({color: 0xffffff}) 
    
    super(geometry,material)

    
    
  } 
  
  
  setAngle(newAngle){
    this.angle= newAngle
  }

  rotate(angleIncrement){
    this.rotateAngle += angleIncrement
    this.rotateAngle %= 2 * Math.PI;
    
    this.rotation.y = this.rotateAngle
    
    

  }
  
  toOrbit(planet,radius,angleIncrement,counterClockWise = false){ 
    
    if (counterClockWise) {
      this.translationAngle -= angleIncrement
  } else {
      this.translationAngle += angleIncrement
  }

    this.translationAngle %= 2 * Math.PI;
    
    this.position.x = planet.position.x + Math.cos(this.translationAngle) * radius
    this.position.z = planet.position.z + Math.sin(this.translationAngle) * radius
    
    
    this.orbit.push(new THREE.Vector3(this.position.x,this.position.y,this.position.z))
    if(Math.abs(this.translationAngle) < angleIncrement){
      console.log("orbita completa");
      
      
      this.firstOrbit = true
    }

    if(this.firstOrbit){

      this.orbit.shift()

    }
    
    this.updateOrbit()
    
      }


    updateOrbit(){
      
      if (!this.lineOrbit) {
        this.lineOrbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(this.orbit),
        new THREE.LineBasicMaterial({ color: 0xffffff }));
      } else {
        this.lineOrbit.geometry.dispose()
        this.lineOrbit.geometry= new THREE.BufferGeometry().setFromPoints(this.orbit);
      }

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