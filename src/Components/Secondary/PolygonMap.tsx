import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

import { ProposedSolution } from '../../@types';

type Props = {
  coordinates: number[];
  currentSolution: ProposedSolution;
  geoJsonData?: ProposedSolution;
};

const layerStyle = {
  id: 'route',
  type: 'line',
  source: 'route',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#007cbf',
    'line-width': 4,
  },
};
export default function PolygonMap(props: Props) {
  const { coordinates, geoJsonData, currentSolution } = props;
  return (
    <ReactMapGL
      className="map"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      longitude={coordinates[0]}
      latitude={coordinates[1]}
      zoom={14}
      bearing={0}
      pitch={0}
      width="75vh"
      height="70vh"
    >
      {/* @ts-ignore */}
      <Source id="my-data" type="geojson" data={geoJsonData || currentSolution}>
        {/* @ts-ignore */}
        <Layer {...layerStyle} />
      </Source>
    </ReactMapGL>
  );
}
