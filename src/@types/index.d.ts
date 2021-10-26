export type Polygon = {
  type: string;
  coordinates: number[][][];
};

export type ProposedSolution = {
  id: number;
  type: string;
  features: [
    {
      type: string;
      properties: {};
      geometry: Polygon;
    },
  ];
  selectedPolygons: Array<Polygon>;
};

export type WorkSurfaceOperation = null | 'UNION' | 'INTERSECTION';

export type OperationResult = {
  solutionId: number;
  unionArea?: number;
  intersectionArea?: number;
  union?: any | null;
  currentOperation: WorkSurfaceOperation;
  intersection?: any | null;
};

export type AppState = {
  proposedSolutions: Array<ProposedSolution>;
  selectedSolution: number | null;
  operationResults: Array<OperationResult>;
};

export type AppReducerType = {
  setProposedSolutions: (proposedSolutions: Array<ProposedSolution>) => void;
  setSelectedSolution: (solutionId: number) => void;
  selectPolygon: (solutionId: number, polygon: Polygon) => void;
  updateOperationResult: (solutionId: number, operationResult: OperationResult) => void;
  clearOperationResults: (solutionId: number) => void;
  clearSelectedPolygons: (solutionId: number) => void;
};

export type ContextState = AppState & AppReducerType;
