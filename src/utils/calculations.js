export function calculateAngularIncrement(secondsPerLap, deltaTime) {
  const angleIncrementRadians = ((2 * Math.PI) / secondsPerLap) * deltaTime;
  return angleIncrementRadians;
}

export function calculateDeltaTime(currentTime, previousTime, timeScale = 0.00001) {
  const realDelta = currentTime - previousTime;
  return (realDelta / 1000) / timeScale;
}
