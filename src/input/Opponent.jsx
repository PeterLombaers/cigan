import React from "react";
import OpponentRating from "./OpponentRating.jsx";
import OpponentResult from "./OpponentResult.jsx";

export default function Opponent({ opponent, setOpponent }) {
  function setRating(rating) {
    setOpponent({
      round: opponent.round,
      rating: rating,
      result: opponent.result,
    });
  }

  function setResult(result) {
    setOpponent({
      round: opponent.round,
      rating: opponent.rating,
      result: result,
    });
  }

  return (
    <fieldset>
      <legend>Round {opponent.round}</legend>
      <OpponentRating
        round={opponent.round}
        rating={opponent.rating}
        setRating={setRating}
      />
      <OpponentResult
        round={opponent.round}
        result={opponent.result}
        setResult={setResult}
      />
    </fieldset>
  );
}
