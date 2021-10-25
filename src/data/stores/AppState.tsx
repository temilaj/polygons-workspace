import React, { useReducer, useMemo } from 'react';
import { ProposedSolution, Polygon, OperationResult } from '../../@types';

import AppContext from '../context/AppContext';
import appReducer, { appActions } from '../reducers/appReducer';
import initialAppState from './initialAppState';

type Props = {
  children: React.ReactChild;
};

const AppState = (props: Props) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const { proposedSolutions, selectedSolution, operationResults } = state;

  const appContext = useMemo(
    () => ({
      proposedSolutions,
      selectedSolution,
      operationResults,
      setProposedSolutions: (proposedSolutions: Array<ProposedSolution>) => {
        dispatch({
          type: appActions.SET_PROPOSED_SOLUTIONS,
          data: proposedSolutions,
        });
      },
      setSelectedSolution: (solutionId: number) => {
        dispatch({
          type: appActions.SET_SELECTED_PROPOSED_SOLUTION,
          data: solutionId,
        });
      },
      selectPolygon: (solutionId: number, polygon: Polygon) => {
        dispatch({
          type: appActions.SELECT_POLYGON,
          data: { solutionId, polygon },
        });
      },
      clearSelectedPolygons: (solutionId: number) => {
        dispatch({
          type: appActions.CLEAR_SELECTED_POLYGONS,
          data: solutionId,
        });
      },
      updateOperationResult: (solutionId: number, operationResult: OperationResult) => {
        dispatch({
          type: appActions.UPDATE_RESULT_STATS,
          data: { solutionId, operationResult },
        });
      },
    }),
    [proposedSolutions, selectedSolution, operationResults],
  );

  return <AppContext.Provider value={appContext}>{props.children}</AppContext.Provider>;
};

export default AppState;
