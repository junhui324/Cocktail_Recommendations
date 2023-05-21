import React from "react";

type ScoreDisplayProps = {
  score: number;
  show: boolean;
};

const Score: React.FC<ScoreDisplayProps> = ({ score, show }) => (
  <>{show ? <p className="score">Score: {score}</p> : null}</>
);

export default Score;
