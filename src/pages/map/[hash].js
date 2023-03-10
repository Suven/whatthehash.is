import HashMap from "@/components/HashMap";
import styles from "@/styles/Map.module.css";
import PrecisionBar from "@/components/PrecisionBar";
import Loader from "@/components/Loader";
import PrecisionLabel from "@/components/PrecisionLabel";
import HashLabel from "@/components/HashLabel";
import OpposingLink from "@/components/OpposingLink";
import Link from "next/link";
import { useRouter } from "next/router";
import { isGeohash, phraseToGeohash, geohashToPhrase } from "@/geohash";

export default function MapPage() {
  const router = useRouter();
  const { hash } = router.query;
  const isHash = isGeohash(hash);
  const usePhrase =
    router.query?.hash?.substr(0, 1) === "@" && hash !== undefined;
  const geohash = isHash ? hash : !!hash ? phraseToGeohash(hash.substr(1)) : "";
  const geophrase = !isHash ? hash : !!hash ? geohashToPhrase(hash) : "";

  const updateLocation = (newHash) => {
    usePhrase
      ? router.push(`/map/@${geohashToPhrase(newHash).toLowerCase()}`)
      : router.push(`/map/${newHash}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>
        WhatThe
        <HashLabel geohash={hash || ""} usePhrase={usePhrase} />
        ?!
      </h1>
      <div className={styles.info}>
        <OpposingLink
          geohash={geohash}
          geophrase={geophrase}
          usePhrase={usePhrase}
        />
        <Link href="/">ℹ️ About</Link>
      </div>
      <div className={styles.spinner}>
        <Loader />
      </div>
      {hash && (
        <div className={styles.map}>
          <HashMap geohash={geohash} hashChanged={updateLocation} />
          <PrecisionLabel geohash={geohash} className={styles.precision} />
        </div>
      )}
    </div>
  );
}
