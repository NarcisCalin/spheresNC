self.onmessage = (e) => {
  const planetsData = e.data;
  const updates = [];

  for (const planetData of planetsData) {
    const {
      id,
      deltaTime,
      orbitalPeriod,
      sideralDay,
      translationAngle,
      rotationAngle,
      distanceToOrbited,
      translateCCW,
      rotateCCW,
      orbitedX,
      orbitedZ,
    } = planetData;

    // Cálculo movimiento orbital
    const translationIncrement = (2 * Math.PI * deltaTime) / orbitalPeriod;
    let newTranslationAngle = translateCCW
      ? translationAngle - translationIncrement
      : translationAngle + translationIncrement;
    newTranslationAngle = newTranslationAngle % (2 * Math.PI);

    // Cálculo rotación
    const rotationIncrement = (2 * Math.PI * deltaTime) / sideralDay;
    let newRotationAngle = rotateCCW
      ? rotationAngle - rotationIncrement
      : rotationAngle + rotationIncrement;
    newRotationAngle = newRotationAngle % (2 * Math.PI);

    // Nueva posición
    const newX = orbitedX + Math.cos(newTranslationAngle) * distanceToOrbited;
    const newZ = orbitedZ + Math.sin(newTranslationAngle) * distanceToOrbited;

    updates.push({
      id,
      newTranslationAngle,
      newRotationAngle,
      newX,
      newZ,
    });
  }

  self.postMessage(updates);
};
