import React from "react";
import { ProposedSolution } from "../../@types";

const AppContext = React.createContext({
  proposedSolutions: [],
  selectedSolution: null,
  setProposedSolutions: (proposedSolutions: Array<ProposedSolution>) => {},
  setSelectedSolution: (proposedSolution: ProposedSolution) => {},
});
export default AppContext;
