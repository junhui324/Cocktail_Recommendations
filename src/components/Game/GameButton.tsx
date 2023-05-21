import React from "react";
import styles from "./QuizButton.module.scss";

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
  children: React.ReactNode;
};

function ButtonWrapper({ correct, userClicked, children }: ButtonWrapperProps) {
  console.log(correct);
  console.log(userClicked);
  let classNames = styles["button-wrapper"];
  if (correct) {
    classNames += ` ${styles.correct}`;
  }
  if (userClicked) {
    classNames += ` ${styles["user-clicked"]}`;
  }

  return <div className={classNames}>{children}</div>;
}

export default ButtonWrapper;
