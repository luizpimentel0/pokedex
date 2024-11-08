import { PropTypes } from "prop-types";
import { useState } from "react";
import styles from "./Modal.module.scss";
import clsx from "clsx";

export const Modal = ({
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
  setModalOpen,
  modalOpen,
}) => {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!id) return null;

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-container__modal"]}>
        <button
          type="button"
          className={styles["close-button"]}
          onClick={() => setModalOpen(!modalOpen)}
        >
          x
        </button>
        <div className={styles[type]}>
          <header className={styles["header"]}>
            <h2>{name}</h2>
            <ul>
              {types.map((type) => (
                <li key={type} className={clsx(styles["type"], styles[type])}>
                  {type}
                </li>
              ))}
            </ul>
            <p>#{number}</p>
            <img src={photo} alt={name} />
          </header>
        </div>
        <div className={styles["details"]}>
          <section className={styles["pokemon-info"]}>
            <ul className={styles["tabs"]}>
              <li
                data-tab="about"
                className={clsx(activeTab === "about" ? styles["active"] : "")}
                onClick={() => handleTabClick("about")}
              >
                Sobre
              </li>
              <li
                data-tab="stat"
                className={clsx(activeTab === "stat" ? styles["active"] : "")}
                onClick={() => handleTabClick("stat")}
              >
                Status Base
              </li>
            </ul>
          </section>
          <div className={styles["tabs-wrap"]}>
            {activeTab === "about" && (
              <section className={styles["about"]}>
                <ul className={styles["stats"]}>
                  <li>altura</li>
                  <li>{height} m</li>
                </ul>
                <ul className={styles["stats"]}>
                  <li>peso</li>
                  <li>{weight} kg</li>
                </ul>
                <ul className={styles["stats"]}>
                  <li>habilidades</li>
                  <li>
                    {abilities.map((ability) => (
                      <span key={ability} className={styles["type"]}>
                        {ability}
                      </span>
                    ))}
                  </li>
                </ul>
              </section>
            )}

            {activeTab === "stat" && (
              <section className={styles["stat"]}>
                {stats.map(({ base_stat, stat }) => (
                  <ul key={stat.name} className={styles["stats"]}>
                    <li>{stat.name.replace("-", " ")}</li>
                    <li>{base_stat}</li>
                  </ul>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
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
  setModalOpen: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
};
