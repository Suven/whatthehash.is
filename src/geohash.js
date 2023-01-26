import ngeo from "ngeohash";
import { toPhrase, fromPhrase } from "@/dictonary";

const dict = "0123456789bcdefghjkmnpqrstuvwxyz";

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

const zoomToPrec = (z) => {
  return z >= 20
    ? 9
    : z >= 18
    ? 8
    : z >= 16
    ? 7
    : z >= 14
    ? 6
    : z >= 11
    ? 5
    : z >= 9
    ? 4
    : z >= 6
    ? 3
    : z >= 4
    ? 2
    : 1;
};

const toInt = (geohash) => {
  // We add the fake-end to also process trailing 0's
  // since 00 is a more specific geohash then 0
  const p = `${geohash}1`.toLowerCase().split("");
  let n = 0;
  p.forEach((k, i) => (n += dict.indexOf(k) * Math.pow(32, i)));
  return n;
};

const fromInt = (i) => {
  let n = i;
  let hash = "";

  while (n > 0) {
    const r = n % 32;
    n = (n - r) / 32;
    hash += dict[r];
  }

  // Removing the fake-end again
  return hash.substr(0, hash.length - 1);
};

const geohashToPhrase = (geohash) => {
  return toPhrase(toInt(geohash));
};

const phraseToGeohash = (phrase) => {
  return fromInt(fromPhrase(phrase));
};

const geohashToCoords = (geohash) => ngeo.decode(geohash);
const coordsToGeohash = (coords, precision) =>
  ngeo.encode(coords.lat, coords.long, precision);
const geohashToBounds = (geohash) => ngeo.decode_bbox(geohash);
const isGeohash = (geohash) =>
  /^[0123456789bcdefghjkmnpqrstuvwxyz]+$/gm.test(geohash);

export {
  precToZoom,
  zoomToPrec,
  isGeohash,
  geohashToBounds,
  phraseToGeohash,
  geohashToPhrase,
  geohashToCoords,
  coordsToGeohash,
};
