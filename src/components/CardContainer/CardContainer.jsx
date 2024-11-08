import { PropTypes } from "prop-types";
import styles from "./CardContainer.module.scss";

export const CardContainer = ({ children }) => {
  return <div className={styles["card-container"]}>{children}</div>;
};

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
