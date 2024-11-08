import { PropTypes } from "prop-types";
import styles from "./PokemonCard.module.scss";
import clsx from "clsx";

export const PokemonCard = ({ name, number, type, types, photo, onClick }) => {
  return (
    <li className={clsx(styles.pokemon, styles[type])} onClick={onClick}>
      <span className={styles["number"]}>#{number}</span>
      <span className={styles["name"]}>{name}</span>

      <div className={styles["detail"]}>
        <ol className={styles["types"]}>
          {types.map((type) => (
            <li key={type} className={clsx(styles["type"], styles[type])}>
              {type}
            </li>
          ))}
        </ol>
        <img src={photo} alt={name} />
      </div>
    </li>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  photo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
