import React from "react";

type ScoreDisplayProps = {
  score: number;
  show: boolean;
  gameStarted: boolean;
};

const Score: React.FC<ScoreDisplayProps> = ({ score, show, gameStarted }) => (
  <>
    {show && gameStarted && (
      <p className="score" style={{ fontWeight: "bold", height: "100px" }}>
        {score === 0
          ? " You got a Zero Score... 😰  Retry?"
          : `🎊 Congrats! Score : ${score} `}
      </p>
    )}
  </>
);

export default Score;
