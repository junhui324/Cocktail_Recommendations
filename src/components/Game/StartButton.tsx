import React from "react";
import { AnswerObject } from "./GameStart";
import styles from "./StartButton.module.scss";

type StartButtonProps = {
  gameOver: boolean;
  userAnswers: AnswerObject[];
  onStart: () => void;
};

const StartButton: React.FC<StartButtonProps> = ({
  gameOver,
  userAnswers,
  onStart,
}) => (
  <>
    {gameOver || userAnswers.length === 4 ? (
      <button className={styles.start} onClick={onStart}>
        Start
      </button>
    ) : null}
  </>
);

export default StartButton;
