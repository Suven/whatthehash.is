import Link from "next/link";

export default function HashMap({ geohash, geophrase, usePhrase }) {
  const link = usePhrase ? `/map/${geohash}` : `/map/@${geophrase}`;
  const text = usePhrase ? "#️⃣ As Geohash" : "📚 As Geophrase";
  return <Link href={link.toLowerCase()}>{text}</Link>;
}
