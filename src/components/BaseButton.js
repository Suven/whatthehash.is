import Link from "next/link";
import styles from "./BaseButton.module.css";

export default function BaseButton({ text, url }) {
  return (
    <Link href={url} className={styles.button}>
      <span className={styles.effect}></span>
      <span className={styles.effect}></span>
      <span className={styles.effect}></span>
      <span className={styles.effect}></span>
      <span className={styles.effect}></span>
      <span className={styles.text}>{text}</span>
    </Link>
  );
}
