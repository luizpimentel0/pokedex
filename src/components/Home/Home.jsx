import styles from "./Home.module.scss";
import { CardContainer } from "@/components/CardContainer";
import { Card } from "@/components/Card";
import { cardMock } from "@/components/Card/card.mock";

export const Home = () => {
  return (
    <main className={styles["home"]}>
      <div className={styles["home__content"]}>
        <CardContainer>
          {cardMock.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              titleColor={card.titleColor}
              description={card.description}
              descriptionColor={card.descriptionColor}
              background={card.background}
              imagePath={card.imagePath}
              imageAlt={card.imageAlt}
            />
          ))}
        </CardContainer>
      </div>
    </main>
  );
};
