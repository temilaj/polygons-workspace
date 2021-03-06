import React, { useContext, useEffect, useState } from 'react';

import { ProposedSolution } from '../../@types';
import AppContext from '../../data/context/AppContext';

type Props = {};

function SolutionsList(props: Props) {
  const { selectedSolution, proposedSolutions, operationResults } = useContext(AppContext);
  const [currentSolution, setCurrentSolution] = useState<ProposedSolution | null>(null);

  useEffect(() => {
    const solution = proposedSolutions.find((soln) => soln.id === selectedSolution);
    if (solution) {
      setCurrentSolution(solution);
    }
  }, [proposedSolutions, operationResults, selectedSolution]);
  const result = operationResults.find((result) => result.solutionId === selectedSolution);

  return (
    <div>
      <h3>Statistics</h3>
      {currentSolution ? (
        <>
          <p>
            Solution: {currentSolution.type} {currentSolution.id}
          </p>
          <p>Number of polygons: {currentSolution.features.length}</p>
          {result && (
            <>
              {result.union && (
                <div>
                  <h3>union</h3>
                  <p>Area: {result.unionArea?.toFixed(4)}</p>
                </div>
              )}
              {result.intersection && (
                <div>
                  <h3>Intersection</h3>
                  <p>Area: {result.intersectionArea?.toFixed(4)}</p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="well">Please select a proposed solution</div>
      )}
    </div>
  );
}

export default SolutionsList;
