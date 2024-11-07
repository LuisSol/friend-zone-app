import Link from "next/link";
import styles from "./header.module.css";

import HomeIcon from "@/components/ui/icons/Home";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["logo-container"]}>
        <div className={styles.logo}>fd</div>
        <h1>face doc</h1>
      </div>
      <nav aria-label="Main navigation" className={styles.navbar}>
        <Link href="/">
          <HomeIcon size={24} />
        </Link>
      </nav>
      <div className={styles["catch-phrase"]}>
        We love your data... and also you ;)
      </div>
    </header>
  );
}
