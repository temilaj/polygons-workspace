import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { ProposedSolution } from '../../@types';

import AppContext from '../../data/context/AppContext';
import { getPolygonName } from '../../utils';
import Button from '../Primary/Button';

type Props = {};

function WorkSurface(props: Props) {
  const { proposedSolutions, selectedSolution, selectPolygon } = useContext(AppContext);
  const [error, setError] = useState<string>('');
  const [currentSolution, setCurrentSolution] = useState<ProposedSolution | null>(null);

  const handleSelectOperation = (operationName: string): void => {
    if (error) {
      setError('');
    }
    if (currentSolution && currentSolution?.selectedPolygons?.length < 2) {
      setError('please select two polygons');
    }
  };

  useEffect(() => {
    const solution = proposedSolutions.find((soln) => soln.id === selectedSolution);
    if (solution) {
      setCurrentSolution(solution);
    }
  }, [proposedSolutions, selectedSolution]);

  useEffect(() => {
    if (currentSolution?.selectedPolygons.length === 2 && error) {
      setError('');
    }
  }, [currentSolution?.selectedPolygons?.length, error]);

  return (
    <div className="work-surface">
      <div className="toolbar">
        {currentSolution && (
          <div>
            <b>Selected polygons:</b>
            {currentSolution?.selectedPolygons.length > 0 &&
              currentSolution?.selectedPolygons.map((polygon) => (
                <span key={uuidV4()}>{getPolygonName(polygon.coordinates[0].length)},</span>
              ))}
          </div>
        )}
        <div className="button__container">
          <button className="button" onClick={() => handleSelectOperation('UNION')}>
            Union
          </button>
          <Button onClick={() => handleSelectOperation('UNION')} text="Intersect" />
        </div>
      </div>

      <div className="solution__container">
        {error && <span className="error">{error}</span>}
        {currentSolution ? (
          <>
            <div>
              <p>polygons:</p>
              <ul className="polygon__container">
                {currentSolution.features.map((feature) => (
                  <li key={uuidV4()}>
                    <article className="polygon__card">
                      <h4>{getPolygonName(feature.geometry.coordinates[0].length)}</h4>

                      <div>
                        Coordinates
                        {feature.geometry.coordinates[0].map((coord) => (
                          <div key={uuidV4()} className="coordinates__container">
                            <code>x: {coord[0].toFixed(4)},</code>
                            <code>y: {coord[1].toFixed(4)}</code>
                          </div>
                        ))}
                      </div>

                      <Button onClick={() => selectPolygon(currentSolution.id, feature.geometry)} text="select" />
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="well">Please select a proposed solution</div>
        )}
      </div>
    </div>
  );
}

export default WorkSurface;
