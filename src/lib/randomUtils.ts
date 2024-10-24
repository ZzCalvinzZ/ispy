export function randomInt(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export type GameObjectType = {
  x: number;
  y: number;
  found: boolean;
  rotation: number;
};

type GenerateUniqueAreasProps = {
  numAreas: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  width: number;
  height: number;
};

export function generateObjects({
  numAreas,
  minX,
  maxX,
  minY,
  maxY,
  width,
  height,
}: GenerateUniqueAreasProps) {
  const objectAreas: GameObjectType[] = [];

  function isOverlapping(newArea: GameObjectType) {
    return objectAreas.some(
      (area) =>
        newArea.x < area.x + width &&
        newArea.x + width > area.x &&
        newArea.y < area.y + height &&
        newArea.y + height > area.y
    );
  }

  while (objectAreas.length < numAreas) {
    const x = randomInt(minX, maxX - width);
    const y = randomInt(minY, maxY - height);
    const rotation = randomInt(1, 360);

    const newArea: GameObjectType = { x, y, found: false, rotation };

    if (!isOverlapping(newArea)) {
      objectAreas.push(newArea);
    }
  }

  return objectAreas;
}
