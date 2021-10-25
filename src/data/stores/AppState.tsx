import React, { useReducer, useMemo } from "react";
import {
  AppReducerType,
  AppState as AppStateType,
  ProposedSolution,
} from "../../@types";

import AppContext from "../context/AppContext";
import appReducer, { appActions } from "../reducers/appReducer";
import initialAppState from "./initialAppState";

type Props = {
  children: React.ReactChild;
};

const AppState = (props: Props) => {
  // @ts-ignore
  const [state, dispatch] = useReducer<AppReducerType, AppStateType>(
    appReducer,
    initialAppState
  );
  const { proposedSolutions, selectedSolution } = state;

  const appContext = useMemo(
    () => ({
      proposedSolutions,
      selectedSolution,
      setProposedSolutions: (proposedSolutions: Array<ProposedSolution>) => {
        // @ts-ignore
        dispatch({
          type: appActions.SET_PROPOSED_SOLUTIONS,
          data: proposedSolutions,
        });
      },
      setSelectedSolution: (proposedSolution: ProposedSolution) => {
        // @ts-ignore
        dispatch({
          type: appActions.SET_SELECTED_PROPOSED_SOLUTION,
          data: proposedSolution,
        });
      },
    }),
    [proposedSolutions, selectedSolution]
  );

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
