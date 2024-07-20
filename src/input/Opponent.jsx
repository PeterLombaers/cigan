import React from "react";
import OpponentRating from "./OpponentRating.jsx";
import OpponentTitle from "./OpponentTitle.jsx";
import OpponentResult from "./OpponentResult.jsx";

export default function Opponent({ opponent, setOpponent }) {
  function setRating(rating) {
    setOpponent({
      round: opponent.round,
      rating: parseInt(rating),
      title: opponent.title,
      result: opponent.result,
    });
  }

  function setTitle(title) {
    setOpponent({
      round: opponent.round,
      rating: opponent.rating,
      title: title,
      result: opponent.result,
    });
  }

  function setResult(result) {
    setOpponent({
      round: opponent.round,
      rating: opponent.rating,
      title: opponent.title,
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
      <OpponentTitle
        round={opponent.round}
        title={opponent.title}
        setTitle={setTitle}
      />
      <OpponentResult
        round={opponent.round}
        result={opponent.result}
        setResult={setResult}
      />
    </fieldset>
  );
}
