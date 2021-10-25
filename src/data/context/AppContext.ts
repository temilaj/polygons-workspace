import React from 'react';

import { ContextState, Polygon, ProposedSolution } from '../../@types';

const AppContext = React.createContext({
  proposedSolutions: [],
  selectedSolution: null,
  setProposedSolutions: (proposedSolutions: Array<ProposedSolution>) => {},
  setSelectedSolution: (solutionId: number) => {},
  selectPolygon: (solutionId: number, polygon: Polygon) => {},
} as ContextState);
export default AppContext;
