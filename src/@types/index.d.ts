import { Context } from "react";

export type ProposedSolution = {
  type: string;
  features: [
    {
      type: string;
      properties: {};
      geometry: {
        type: string;
        coordinates: number[][][];
      };
    }
  ];
};

export type AppState = {
  selectedSolution: ProposedSolution | null;
  proposedSolutions: Array<ProposedSolution>;
};

export type AppReducerType = {
  setProposedSolutions: (proposedSolutions: Array<ProposedSolution>) => void;
  setSelectedSolution: (proposedSolution: ProposedSolution) => void;
};

export type AppContextType = Context<AppState & AppReducerType>;
