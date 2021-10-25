import React, { useReducer, useMemo } from 'react';
import { ProposedSolution, Polygon } from '../../@types';

import AppContext from '../context/AppContext';
import appReducer, { appActions } from '../reducers/appReducer';
import initialAppState from './initialAppState';

type Props = {
  children: React.ReactChild;
};

const AppState = (props: Props) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const { proposedSolutions, selectedSolution } = state;

  const appContext = useMemo(
    () => ({
      proposedSolutions,
      selectedSolution,
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
    }),
    [proposedSolutions, selectedSolution],
  );

  return <AppContext.Provider value={appContext}>{props.children}</AppContext.Provider>;
};

export default AppState;
