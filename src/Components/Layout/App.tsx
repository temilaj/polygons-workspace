import React, { useContext, useEffect, useState } from 'react';

import Navbar from './Navbar';
import Panel from './Panel';
import SolutionsList from '../Secondary/SolutionsList';
import SolutionStatistics from '../Secondary/SolutionStatistics';
import WorkSurface from './WorkSurface';
import { proposedSolutions } from '../../data';
import AppContext from '../../data/context/AppContext';

import './../stylesheets/App.css';

function App() {
  const { setProposedSolutions } = useContext(AppContext);
  useEffect(() => {
    setProposedSolutions(proposedSolutions);
  }, []);

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
