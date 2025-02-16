export class PlanetWorkerService {
  constructor(planets) {
    this.planets = planets;
    this.worker = new Worker("src/worker.js");

    this.worker.onmessage = (e) => {
      e.data.forEach((update) => {
        const planet = this.planets.find((p) => p.id === update.id);
        if (planet) {
          planet.position.set(update.newX, 0, update.newZ);
          planet.rotation.y = update.newRotationAngle;
          planet.translationAngle = update.newTranslationAngle;
        }
      });
    };
  }

  update(deltaTime) {
    const planetsData = this.planets.map((planet) => {
      const orbited = planet.getOrbited();
      return {
        id: planet.id,
        deltaTime,
        orbitalPeriod: planet.getOrbitalPeriod(),
        sideralDay: planet.getSideralDay(),
        translationAngle: planet.translationAngle,
        rotationAngle: planet.rotation.y,
        distanceToOrbited: planet.getDistanceToOrbited(),
        translateCCW: planet.getTranslateCounterClockWise(),
        rotateCCW: planet.getRotateCounterClockWise(),
        orbitedX: orbited?.position.x || 0,
        orbitedZ: orbited?.position.z || 0,
      };
    });

    this.worker.postMessage(planetsData);
  }

  dispose() {
    this.worker.terminate();
  }
}
