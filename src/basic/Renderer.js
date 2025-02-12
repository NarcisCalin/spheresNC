import * as THREE from 'three'
import { parameter } from 'three/tsl';


const renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true});
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );
export default renderer