import React, { useContext } from 'react';

import AppContext from '../../data/context/AppContext';
import { ProposedSolution } from '../../@types';

type Props = {};

const number = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

function SolutionsList(props: Props) {
  const { proposedSolutions, setSelectedSolution } = useContext(AppContext);

  const handleSelectPolygon = (proposedSolution: ProposedSolution): void => {
    setSelectedSolution(proposedSolution.id);
  };

  return (
    <div>
      <h3>List of proposed solutions</h3>
      {proposedSolutions.map((proposedSolution: ProposedSolution, index: number) => (
        <div key={proposedSolution.id}>
          <button className="button" onClick={() => handleSelectPolygon(proposedSolution)}>
            {proposedSolution.type} {number[index + 1]}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SolutionsList;
