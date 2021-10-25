// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import AppContext from '../../data/context/AppContext';

type Props = {};

function SolutionsList(props: Props) {
  const { selectedSolution, proposedSolutions } = useContext(AppContext);
  const [currentSolution, setCurrentSolution] = useState<ProposedSolution | null>(null);

  useEffect(() => {
    const solution = proposedSolutions.find((soln) => soln.id === selectedSolution);
    if (solution) {
      setCurrentSolution(solution);
    }
  }, [proposedSolutions, selectedSolution]);

  return (
    <div>
      <h3>Statistics</h3>
      {currentSolution ? (
        <>
          <p>
            Solution: {currentSolution.type} {currentSolution.id}
          </p>
          <p>Number of polygons: {currentSolution.features.length}</p>
        </>
      ) : (
        <div className="well">Please select a proposed solution</div>
      )}
    </div>
  );
}

export default SolutionsList;
