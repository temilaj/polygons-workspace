import React from "react";

import Navbar from "./Navbar";
import Panel from "./Panel";
import SolutionsList from "../Secondary/SolutionsList";
import SolutionStatistics from "../Secondary/SolutionStatistics";
import WorkSurface from "./WorkSurface";

import "./../stylesheets/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <Panel>
          <SolutionsList />
        </Panel>
        <WorkSurface />
        <Panel>
          <SolutionStatistics />
        </Panel>
      </main>
    </div>
  );
}

export default App;
