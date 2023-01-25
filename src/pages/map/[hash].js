import Map, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import styles from "@/styles/Map.module.css";
import PrecisionBar from "@/components/PrecisionBar";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import { geohashToCoords, geohashToBounds, coordsToGeohash } from "@/geohash";
import { useState, useCallback } from "react";

const precToZoom = {
  1: { z: 1, label: "2500km" },
  2: { z: 4, label: "630km" },
  3: { z: 6, label: "78km" },
  4: { z: 9, label: "20km" },
  5: { z: 11, label: "2.4km" },
  6: { z: 14, label: "610m" },
  7: { z: 16, label: "76m" },
  8: { z: 18, label: "19m" },
  9: { z: 20, label: "2m" },
};

export default function HashMap() {
  const router = useRouter();
  const { hash } = router.query;

  if (!hash) {
    return;
  }

  const isGeohash = /^[0123456789bcdefghjkmnpqrstuvwxyz]+$/gm.test(hash);
  const coords = geohashToCoords(hash);
  const bounds = geohashToBounds(hash);
  const length = hash.length;
  const zoom = precToZoom[length];

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
    zoom: zoom.z,
  });

  return (
    <div className={styles.container}>
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
      <h1 className={styles.headline}>
        WhatThe<strong>#{hash}</strong>?!
      </h1>
      <div className={styles.info}>
        <Link href="/">📚 Geophrases</Link>
        <Link href="/">ℹ️ About</Link>
      </div>
      <div className={styles.spinner}>
        <Loader />
      </div>
      <div className={styles.map}>
        <Map
          mapLib={maplibregl}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "90vw", height: "80vh" }}
          mapStyle="https://api.maptiler.com/maps/c4578a80-2b77-43a2-b06c-8fbba6c213bb/style.json?key=7H7bZx7XIYFKz5WxU7zl"
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
        <div className={styles.precision}>~{zoom.label}</div>
      </div>
    </div>
  );
}
