import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { ProposedSolution, WorkSurfaceOperation, Polygon } from '../../@types';

import AppContext from '../../data/context/AppContext';
import { getPolygonName } from '../../utils';
import Button from '../Primary/Button';
import OperationResults from '../Secondary/OperationResults';
import PolygonMap from '../Secondary/PolygonMap';

function WorkSurface() {
  const {
    proposedSolutions,
    selectedSolution,
    selectPolygon,
    operationResults,
    updateOperationResult,
    clearSelectedPolygons,
    clearOperationResults,
  } = useContext(AppContext);
  const [error, setError] = useState<string>('');
  const [operation, setOperation] = useState<WorkSurfaceOperation>(null);
  const [currentSolution, setCurrentSolution] = useState<ProposedSolution | null>(null);

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

  const handleSelectOperation = (operationName: WorkSurfaceOperation): void => {
    if (error) {
      setError('');
    }
    if (currentSolution && currentSolution?.selectedPolygons?.length < 2) {
      setError('please select two polygons');
    }
    setOperation(operationName);
  };

  const onSelectPolygon = (solutionId: number, polygon: Polygon) => {
    selectPolygon(solutionId, polygon);
    setOperation(null);
    if (currentSolution?.selectedPolygons.length === 2) {
      clearOperationResults(currentSolution.id);
    }
  };

  const result = operationResults.find((res) => res.solutionId === selectedSolution);
  const geoJsonData = result?.currentOperation === 'UNION' ? result?.union : result?.intersection;

  return (
    <div className="work-surface">
      {currentSolution && (
        <div className="toolbar">
          <div>
            {currentSolution?.selectedPolygons.length > 0 && (
              <>
                <b>Selected polygons:</b>
                {currentSolution?.selectedPolygons.map((polygon) => (
                  <span key={uuidV4()}>{getPolygonName(polygon.coordinates[0].length)},</span>
                ))}
              </>
            )}
          </div>
          <div className="button__container">
            <Button onClick={() => handleSelectOperation('UNION')} text="Union" />
            <Button onClick={() => handleSelectOperation('INTERSECTION')} text="Intersect" />
            {currentSolution?.selectedPolygons.length > 0 && (
              <Button onClick={() => clearSelectedPolygons(currentSolution.id)} text="Clear" danger={true} />
            )}
          </div>
        </div>
      )}

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
                      <h4 className="polygon__title">{getPolygonName(feature.geometry.coordinates[0].length)}</h4>
                      <div className="polygon__body">
                        <h5>Coordinates</h5>
                        {feature.geometry.coordinates[0].map((coord) => (
                          <div key={uuidV4()} className="coordinates__container">
                            <code>x: {coord[0].toFixed(4)},</code>
                            <code>y: {coord[1].toFixed(4)}</code>
                          </div>
                        ))}
                      </div>
                      <div className="polygon__footer">
                        <Button onClick={() => onSelectPolygon(currentSolution.id, feature.geometry)} text="select" />
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
              {currentSolution && (
                <>
                  <PolygonMap
                    coordinates={currentSolution.features[0].geometry.coordinates[0][0]}
                    currentSolution={currentSolution}
                    geoJsonData={geoJsonData}
                  />
                  <div>
                    {currentSolution?.selectedPolygons.length > 0 && (
                      <OperationResults
                        solutionId={currentSolution.id}
                        operation={operation}
                        selectedPolygons={currentSolution.selectedPolygons}
                        operationResults={operationResults}
                        onStatUpdate={updateOperationResult}
                      />
                    )}
                  </div>
                </>
              )}
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
