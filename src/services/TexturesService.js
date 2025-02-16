import * as THREE from "three";
import { Color } from "three/webgpu";

export class TexturesService {
  instance;
  loader = new THREE.TextureLoader();

  static getInstance() {
    if (!TexturesService.instance) {
      TexturesService.instance = new TexturesService();
    }
    return TexturesService.instance;
  }

  applyTextures(mesh, texturesLoaded) {
    mesh.material = new THREE.MeshPhysicalMaterial(texturesLoaded);
  }

  async loadTextures(textures) {
    try {
      const texturesToLoad = [
        textures.map,
        textures.bumpMap,
        textures.roughnessMap,
        textures.alphaMap,
        textures.emissiveMap,
      ];
      const texturesLoaded = await Promise.all(
        texturesToLoad.map((texture) => this.loadTexture(texture))
      );
      const texturesLoadedMap = {
        map: texturesLoaded[0],
        bumpMap: texturesLoaded[1],
        bumpScale: textures.bumpScale ?? null,
        roughnessMap: texturesLoaded[2],
        alphaMap: texturesLoaded[3],
        emissiveMap: texturesLoaded[4],
        emissive: textures.emissive ? new Color(textures.emissive) : null,
        transparent: textures.transparent ?? null,
      };

      return texturesLoadedMap;
    } catch {
      console.error("Error loading textures:", error);
    }
  }

  async loadTexture(texture) {
    if (!texture) return null;

    return this.loader.loadAsync(texture).catch((error) => {
      console.error("Error loading texture:", texture, error);
      return null;
    });
  }
}
