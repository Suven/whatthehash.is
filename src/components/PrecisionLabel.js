import {
  precToZoom,
  geohashToCoords,
  geohashToBounds,
  coordsToGeohash,
} from "@/geohash";

export default function HashMap({ geohash, className }) {
  return <span className={className}>~{precToZoom[geohash.length].label}</span>;
}
