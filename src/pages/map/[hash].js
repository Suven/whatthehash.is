import HashMap from "@/components/HashMap";
import styles from "@/styles/Map.module.css";
import PrecisionBar from "@/components/PrecisionBar";
import Loader from "@/components/Loader";
import PrecisionLabel from "@/components/PrecisionLabel";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MapPage() {
  const router = useRouter();
  const { hash } = router.query;

  return (
    <div className={styles.container}>
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
      {hash && (
        <div className={styles.map}>
          <HashMap geohash={hash} />
          <PrecisionLabel geohash={hash} className={styles.precision} />
        </div>
      )}
    </div>
  );
}
