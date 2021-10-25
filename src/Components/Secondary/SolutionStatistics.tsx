// @ts-nocheck
import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";

import AppContext from "../../data/context/AppContext";

type Props = {};

const polygonMapper = {
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

function SolutionsList(props: Props) {
  const { selectedSolution } = useContext(AppContext);
  return (
    <div>
      <h3>Statistics</h3>
      {selectedSolution ? (
        <>
          <div>Number of polygons: {selectedSolution.features.length}</div>
          <div>
            polygons:
            <ul>
              {selectedSolution.features.map((polygon) => (
                <li key={uuidV4()}>
                  {polygonMapper[polygon.geometry.coordinates[0].length]}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="well">Please select a proposed solution</div>
      )}
    </div>
  );
}

export default SolutionsList;
