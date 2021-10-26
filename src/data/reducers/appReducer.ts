import { AppState, OperationResult, Polygon, ProposedSolution } from '../../@types';

const actions = [
  'SET_PROPOSED_SOLUTIONS',
  'SET_SELECTED_PROPOSED_SOLUTION',
  'SELECT_POLYGON',
  'UPDATE_RESULT_STATS',
  'CLEAR_SELECTED_POLYGONS',
  'CLEAR_RESULT_STAT',
] as const;

type Action = typeof actions[number];
type AppActions = {
  type: Action;
  data:
    | number
    | Array<ProposedSolution>
    | Polygon
    | { solutionId: number; polygon: Polygon }
    | { solutionId: number; operationResult: OperationResult };
};

export const appActions: Record<Action, Action> = {
  SET_PROPOSED_SOLUTIONS: 'SET_PROPOSED_SOLUTIONS',
  SET_SELECTED_PROPOSED_SOLUTION: 'SET_SELECTED_PROPOSED_SOLUTION',
  SELECT_POLYGON: 'SELECT_POLYGON',
  UPDATE_RESULT_STATS: 'UPDATE_RESULT_STATS',
  CLEAR_SELECTED_POLYGONS: 'CLEAR_SELECTED_POLYGONS',
  CLEAR_RESULT_STAT: 'CLEAR_RESULT_STAT',
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

    case appActions.CLEAR_SELECTED_POLYGONS: {
      const { data: solutionId } = action;
      const { proposedSolutions } = prevState;

      const updatedSolutions = proposedSolutions.map((solution) => {
        if (solution.id === solutionId) {
          const updatedSolution: ProposedSolution = {
            ...solution,
            selectedPolygons: [],
          };
          return updatedSolution;
        }
        return solution;
      });

      return {
        ...prevState,
        operationResults: [],
        proposedSolutions: updatedSolutions,
      };
    }

    case appActions.UPDATE_RESULT_STATS: {
      const { solutionId, operationResult } = action.data as { solutionId: number; operationResult: OperationResult };
      const exisitingResult = prevState.operationResults.find((result) => result.solutionId === solutionId);
      if (exisitingResult) {
        const updatedResult = prevState.operationResults.map((result) => {
          if (result.solutionId === solutionId) {
            return {
              ...result,
              ...operationResult,
            };
          }
          return result;
        });

        return {
          ...prevState,
          operationResults: updatedResult,
        };
      }

      return {
        ...prevState,
        operationResults: [...prevState.operationResults, operationResult],
      };
    }

    case appActions.CLEAR_RESULT_STAT: {
      const { data: solutionId } = action;
      const { operationResults } = prevState;
      const updatedresults = operationResults.map((result) => {
        if (result.solutionId === solutionId) {
          return { solutionId, currentOperation: null };
        }
        return result;
      });

      return {
        ...prevState,
        operationResults: updatedresults,
      };
    }

    default:
      return prevState;
  }
};

export default appReducer;
