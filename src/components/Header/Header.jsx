import styles from "./Header.module.scss";
import pokemon from "/images/pokemon-logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles["header"]}>
      <nav className={styles["header-nav"]}>
        <picture className={styles["header-nav__picture"]}>
          <source srcSet={pokemon} type="image/svg+xml" />
          <img src={pokemon} alt="Logo Pokemon" />
        </picture>
        <ul className={styles["header-nav__list"]}>
          <Link to="/" className={styles["header-nav__list-item"]}>
            <li>Home</li>
          </Link>
          <Link to="/pokedex" className={styles["header-nav__list-item"]}>
            <li>Pokédex</li>
          </Link>
          <Link to="/" className={styles["header-nav__list-item"]}>
            <li>News</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
