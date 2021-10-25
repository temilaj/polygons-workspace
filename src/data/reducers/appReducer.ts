import { AppState, ProposedSolution } from "../../@types";

const actions = [
  "SET_PROPOSED_SOLUTIONS",
  "SET_SELECTED_PROPOSED_SOLUTION",
] as const;

type Action = typeof actions[number];
type AppActions = {
  type: Action;
  data: ProposedSolution | Array<ProposedSolution>;
};

export const appActions = {
  SET_PROPOSED_SOLUTIONS: "SET_PROPOSED_SOLUTIONS",
  SET_SELECTED_PROPOSED_SOLUTION: "SET_SELECTED_PROPOSED_SOLUTION",
};

const appReducer = (prevState: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case appActions.SET_PROPOSED_SOLUTIONS: {
      const { data } = action;
      return {
        ...prevState,
        proposedSolutions: data as Array<ProposedSolution>,
      };
    }
    case appActions.SET_SELECTED_PROPOSED_SOLUTION: {
      const { data } = action;
      return {
        ...prevState,
        selectedSolution: data as ProposedSolution,
      };
    }

    default:
      return prevState;
  }
};

export default appReducer;
