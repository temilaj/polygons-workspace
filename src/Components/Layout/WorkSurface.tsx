import React, { useContext, useEffect } from "react";
import AppContext from "../../data/context/AppContext";

type Props = {};

function WorkSurface(props: Props) {
  const { selectedSolution } = useContext(AppContext);
  return <div className="work-surface"></div>;
}

export default WorkSurface;
