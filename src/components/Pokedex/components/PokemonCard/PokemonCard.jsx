import { PropTypes } from "prop-types";
import styles from "./PokemonCard.module.scss";
import clsx from "clsx";

export const PokemonCard = ({
  id,
  name,
  number,
  height,
  weight,
  type,
  types,
  abilities,
  photo,
  stats,
}) => {
  return (
    <li
      className={clsx(styles.pokemon, styles[type])}
      // onClick="openPokemonModal(${pokemon.id})"
    >
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
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  photo: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
};
