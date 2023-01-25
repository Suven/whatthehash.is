import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import BaseButton from "@/components/BaseButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>whatThe[Geo]Hash?!</title>
        <meta name="description" content="Everything about geohashes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hero}></div>
      <main className="container">
        <h1>
          WhatThe<strong>[Geo]</strong>Hash?!
        </h1>
        <p>
          There is a much easier way to provide a locatian then those long
          cryptic latitude and longitude degrees: <strong>geohashes</strong>!
        </p>
        <p>
          Instead of <code>50.95458984, 6.96533203</code> it's just{" "}
          <code>u1hcy</code>. And even better: If you don't need it to be that
          precise, just omit some of its end. <code>u1hc</code> is still a valid
          geohash!
        </p>
        <div className={styles.buttonList}>
          <div className={styles.stackVert}>
            <span>#️⃣ ⇒ 🗺️</span>
            <BaseButton url="/map/u1hcy#haveGeohash" text="I have a geohash" />
          </div>
          <div className={styles.stackVert}>
            <span>🗺️ ⇒ #️⃣</span>
            <BaseButton url="/map/u1hcy#moveAround" text="I WANT a geohash" />
          </div>
          <div className={styles.stackVert}>
            <span>🤷</span>
            <BaseButton url="/aboutGeohashes" text="I wanna learn more" />
          </div>
        </div>
        <p>
          Not conviced? You could also try our geophrases instead of geohashes.
          It's totally not compareable to what3words, our algorith is
          supersimple (less then 40 lines of code), doesn't require an API and
          our custom wordlist is open source.
        </p>
        <div className={styles.buttonList}>
          <div className={styles.stackVert}>
            <span>📚 ⇒ 🗺️</span>
            <BaseButton
              url="/map/u1hcy#haveGeophrase"
              text="I have a geophrase"
            />
          </div>
          <div className={styles.stackVert}>
            <span>🗺️ ⇒ 📚</span>
            <BaseButton url="/map/u1hcy#moveAround" text="I WANT a geophrase" />
          </div>
          <div className={styles.stackVert}>
            <span>🤷</span>
            <BaseButton url="/aboutGeophrases" text="I wanna learn more" />
          </div>
        </div>
        <p>
          By the way... this is a non commercial spare time project, without
          commercial interest and done just for educational purposes. The code
          can be found on <a href="TODO">GitHub</a>. Please don't sue me.
        </p>
        <br />
        <br />
        <p>
          <strong>Cheers,</strong>
          <br />
          Sven
        </p>
      </main>
    </>
  );
}
