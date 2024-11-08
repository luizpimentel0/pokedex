import { PropTypes } from "prop-types";
import styles from "./Card.module.scss";
import { useImage } from "@/hooks/useImage";

export const Card = ({
  background,
  description,
  descriptionColor,
  imagePath,
  imageAlt,
  title,
  titleColor,
}) => {
  const { image } = useImage(imagePath);

  return (
    <div className={styles["card-container"]}>
      <div className={styles["card"]}>
        <picture className={styles["card-picture"]}>
          <img src={image} alt={imageAlt} />
        </picture>
        <div
          className={styles["card-content"]}
          style={{ backgroundColor: background }}
        >
          <h2
            className={styles["card-content__title"]}
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          <p
            className={styles["card-content__description"]}
            style={{ color: descriptionColor }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  description: PropTypes.string,
  descriptionColor: PropTypes.string,
  background: PropTypes.string,
  imagePath: PropTypes.string,
  imageAlt: PropTypes.string,
};
