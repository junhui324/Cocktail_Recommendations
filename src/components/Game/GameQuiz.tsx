import React from "react";
import { AnswerObject } from "./GameStart";
import ButtonWrapper from "./GameButton";

type GameQuizProps = {
  questionNr: number;
  totalQuestions: number;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  strDrinkThumb: string;
};

function GameQuiz({
  questionNr,
  totalQuestions,
  answers,
  userAnswer,
  callback,
  strDrinkThumb,
}: GameQuizProps) {
  // answers 배열에서 랜덤하게 4개의 요소 선택
  const uniqueAnswers = Array.from(new Set(answers));

  return (
    <div>
      <p className="number">
        질문: {questionNr} / {totalQuestions}
      </p>

      <img src={strDrinkThumb} alt="cocktail" style={{ width: "400px" }} />
      <div>
        {uniqueAnswers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button
              className="button"
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </div>
  );
}

export default GameQuiz;
