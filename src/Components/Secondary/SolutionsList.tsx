import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";

import AppContext from "../../data/context/AppContext";
import { ProposedSolution } from "../../@types";

type Props = {};

const number = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

function SolutionsList(props: Props) {
  const { proposedSolutions, setSelectedSolution } = useContext(AppContext);

  const handleSelectPolygon = (proposedSolution: ProposedSolution): void => {
    setSelectedSolution(proposedSolution);
  };

  return (
    <div>
      <h3>List of proposed solutions</h3>
      {proposedSolutions.map(
        (proposedSolution: ProposedSolution, index: number) => (
          <div key={uuidV4()}>
            <button
              className="solution__button"
              onClick={() => handleSelectPolygon(proposedSolution)}
            >
              {proposedSolution.type} {number[index + 1]}
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default SolutionsList;
