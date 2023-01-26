import Map, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import {
  precToZoom,
  zoomToPrec,
  geohashToCoords,
  geohashToBounds,
  coordsToGeohash,
} from "@/geohash";
import { useState, useCallback } from "react";

export default function HashMap({ geohash, hashChanged }) {
  const zoom = precToZoom[geohash.length].z;
  const coords = geohashToCoords(geohash);
  const bounds = geohashToBounds(geohash);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [bounds[1], bounds[0]],
              [bounds[3], bounds[0]],
              [bounds[3], bounds[2]],
              [bounds[1], bounds[2]],
              [bounds[1], bounds[0]],
            ],
          ],
        },
      },
    ],
  };

  const layerStyle = {
    id: "hash",
    type: "fill",
    paint: {
      "fill-color": "#c43b58",
      "fill-opacity": 0.4,
    },
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [viewState, setViewState] = useState({
    longitude: coords.longitude,
    latitude: coords.latitude,
    zoom,
  });

  const handleMove = (evt) => {
    setViewState(evt.viewState);
    const coords = evt.viewState;
    const hashLenghth = zoomToPrec(coords.zoom);
    const hash = coordsToGeohash(
      { lat: coords.latitude, long: coords.longitude },
      hashLenghth
    );
    if (hash !== geohash) {
      hashChanged(hash);
    }
  };

  return (
    <div>
      <style jsx global>{`
        .maplibregl-ctrl-attrib-button {
          display: none;
        }
        .maplibregl-ctrl-attrib {
          position: absolute;
          right: 0;
          bottom: -1.75rem;
        }
        .maplibregl-ctrl-attrib a {
          color: var(--c-text-secondary);
        }
      `}</style>
      <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={handleMove}
        style={{ width: "90vw", height: "80vh" }}
        mapStyle="https://api.maptiler.com/maps/c4578a80-2b77-43a2-b06c-8fbba6c213bb/style.json?key=7H7bZx7XIYFKz5WxU7zl"
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}
