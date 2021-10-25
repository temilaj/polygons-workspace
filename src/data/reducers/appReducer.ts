import { AppState, Polygon, ProposedSolution } from '../../@types';

const actions = ['SET_PROPOSED_SOLUTIONS', 'SET_SELECTED_PROPOSED_SOLUTION', 'SELECT_POLYGON'] as const;

type Action = typeof actions[number];
type AppActions = {
  type: Action;
  data: number | Array<ProposedSolution> | Polygon | { solutionId: number; polygon: Polygon };
};

export const appActions: Record<Action, Action> = {
  SET_PROPOSED_SOLUTIONS: 'SET_PROPOSED_SOLUTIONS',
  SET_SELECTED_PROPOSED_SOLUTION: 'SET_SELECTED_PROPOSED_SOLUTION',
  SELECT_POLYGON: 'SELECT_POLYGON',
};

const appReducer = (prevState: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case appActions.SET_PROPOSED_SOLUTIONS: {
      const { data } = action;
      const proposedSolutions = (data as Array<ProposedSolution>).map((solution, index) => {
        return {
          ...solution,
          id: index + 1,
          selectedPolygons: [],
        };
      });
      return {
        ...prevState,
        proposedSolutions,
      };
    }
    case appActions.SET_SELECTED_PROPOSED_SOLUTION: {
      const { data } = action;
      const selectedSolution = prevState.proposedSolutions.find((solution) => solution.id === data);
      if (selectedSolution) {
        return {
          ...prevState,
          selectedSolution: selectedSolution.id,
        };
      }
      return {
        ...prevState,
      };
    }

    case appActions.SELECT_POLYGON: {
      const { solutionId, polygon } = action.data as { solutionId: number; polygon: Polygon };
      const { proposedSolutions } = prevState;

      const updatedSolutions = proposedSolutions.map((solution) => {
        if (solution.id === solutionId) {
          let updatedPolygons: Array<Polygon> = [];
          const { selectedPolygons } = solution;

          if (selectedPolygons.length < 2) {
            updatedPolygons = [...selectedPolygons, polygon];
          } else {
            updatedPolygons = [selectedPolygons.slice(-1)[0], polygon];
          }
          const updatedSolution: ProposedSolution = {
            ...solution,
            selectedPolygons: updatedPolygons,
          };
          return updatedSolution;
        }
        return solution;
      });

      return {
        ...prevState,
        proposedSolutions: updatedSolutions,
      };
    }

    default:
      return prevState;
  }
};

export default appReducer;
