import { useState } from "react";
import { fetchQuestions, QuizQuestion } from "../../API/CocktailAPI";
import GameQuiz from "./GameQuiz";
import GameBanner from "./GameBanner";
import StartButton from "./StartButton";
import Score from "./Score";
import Loading from "./Loading";
import NextButton from "./NextButton";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 4;

function GameStart() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = async () => {
    setShowBanner(false);
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions();
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setGameStarted(true);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: "",
        answer,
        correct,
        correctAnswer: questions[number].answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const handleNextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS - 1) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      {showBanner && <GameBanner />}
      {gameOver ? (
        <>
          <Score score={score} show={true} gameStarted={gameStarted} />
          <StartButton
            gameOver={gameOver}
            userAnswers={userAnswers}
            onStart={handleStart}
          />
        </>
      ) : null}

      <Loading loading={loading} />
      {!loading && !gameOver && (
        <GameQuiz
          strDrinkThumb={questions[number].cocktail.strDrinkThumb}
          strInstructions={questions[number].cocktail.strInstructions}
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          answers={questions[number].choices}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 && (
          <NextButton onNext={handleNextQuestion} />
        )}
    </>
  );
}

export default GameStart;
