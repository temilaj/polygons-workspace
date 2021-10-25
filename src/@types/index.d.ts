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

export type AppState = {
  proposedSolutions: Array<ProposedSolution>;
  selectedSolution: number | null;
};

export type AppReducerType = {
  setProposedSolutions: (proposedSolutions: Array<ProposedSolution>) => void;
  setSelectedSolution: (solutionId: number) => void;
  selectPolygon: (solutionId: number, polygon: Polygon) => void;
};

export type ContextState = AppState & AppReducerType;
