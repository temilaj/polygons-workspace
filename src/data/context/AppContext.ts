import React from 'react';

import { ContextState, Polygon, ProposedSolution, OperationResult } from '../../@types';

const AppContext = React.createContext({
  proposedSolutions: [],
  selectedSolution: null,
  operationResults: [],
  setProposedSolutions: (proposedSolutions: Array<ProposedSolution>) => {},
  setSelectedSolution: (solutionId: number) => {},
  selectPolygon: (solutionId: number, polygon: Polygon) => {},
  updateOperationResult: (solutionId: number, operationResult: OperationResult) => {},
  clearSelectedPolygons: (solutionId: number) => {},
  clearOperationResults: (solutionId: number) => {},
} as ContextState);
export default AppContext;
