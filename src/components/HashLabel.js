export default function HashMap({ geohash, usePhrase }) {
  const prefix = usePhrase ? "" : "#";
  const label = geohash.toLowerCase();
  return (
    <strong>
      {prefix}
      {label}
    </strong>
  );
}
