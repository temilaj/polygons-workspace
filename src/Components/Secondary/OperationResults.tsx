import React, { useEffect } from 'react';
import * as turf from '@turf/turf';
import geojsonArea from '@mapbox/geojson-area';

import { Polygon, OperationResult, WorkSurfaceOperation } from '../../@types';

type Props = {
  solutionId: number;
  selectedPolygons: Array<Polygon>;
  operation: WorkSurfaceOperation;
  operationResults: Array<OperationResult>;
  onStatUpdate: (solutionId: number, operationResult: OperationResult) => void;
};

export default function OperationResults(props: Props) {
  const { selectedPolygons, operation, solutionId, operationResults, onStatUpdate } = props;
  useEffect(() => {
    if (selectedPolygons.length === 2 && operation !== null) {
      const polygons = selectedPolygons.map((polygon) => {
        return turf.polygon(polygon.coordinates, { fill: '#00f' });
      });
      switch (operation) {
        case 'UNION':
          const union = turf.union(polygons[0], polygons[1]);
          const unionArea = geojsonArea.geometry(union!.geometry);
          onStatUpdate(solutionId, {
            solutionId,
            unionArea,
            currentOperation: 'UNION',
            union: union,
          });
          break;
        case 'INTERSECTION':
          const intersection = turf.intersect(polygons[0], polygons[1]);
          const intersectionArea = geojsonArea.geometry(intersection!.geometry);
          onStatUpdate(solutionId, {
            solutionId,
            intersectionArea,
            currentOperation: 'INTERSECTION',
            intersection,
          });
          break;

        default:
          break;
      }
    }
  }, [selectedPolygons, operation]);
  return <div></div>;
}
