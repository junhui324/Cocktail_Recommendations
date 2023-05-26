import React from "react";
import styles from "./NextButton.module.scss";
type NextButtonProps = {
  onNext: () => void;
};

function NextButton({ onNext }: NextButtonProps) {
  return (
    <>
      <button className={styles.next} onClick={onNext}>
        Next ⮕
      </button>
    </>
  );
}

export default NextButton;
