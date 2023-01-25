import ngeo from "ngeohash";
import dictonary from "./dictonary";

const dict = "0123456789bcdefghjkmnpqrstuvwxyz";

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
  return dictonary.toPhrase(toInt(geohash));
};

const phraseToGeohash = (phrase) => {
  return fromInt(dictonary.fromPhrase(phrase));
};

const geohashToCoords = (geohash) => ngeo.decode(geohash);
const coordsToGeohash = (coords, precision) =>
  ngeo.encode(coords.lat, coords.long, precision);

const geohashToBounds = (geohash) => ngeo.decode_bbox(geohash);

export { geohashToBounds, phraseToGeohash, geohashToPhrase, geohashToCoords, coordsToGeohash };
