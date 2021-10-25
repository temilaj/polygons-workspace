export function getPolygonName(length: number) {
  const polygonMapper: Record<number, string> = {
    3: "Triangle",
    4: "Quadilateral",
    5: "Pentagon",
    6: "Hexagon",
    7: "Septagon",
    8: "Octagon",
    9: "Nonagon",
    10: "Decagon",
    11: "Hendecagon",
  };

  return polygonMapper[length] || "Polygon";
}
