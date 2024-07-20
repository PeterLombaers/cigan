import React from "react";
import Opponent from "./input/Opponent.jsx";
import Rounds from "./input/Rounds.jsx";
import Type from "./input/Type.jsx";

export default function Input({
  nRounds,
  setNRounds,
  normType,
  setNormType,
  opponents,
  setOpponents,
}) {
  function setOpponent(newOpponent) {
    setOpponents(
      opponents.map((opponent) =>
        opponent.round == newOpponent.round ? newOpponent : opponent
      )
    );
  }

  return (
    <>
      <h2 className="header header-input">Input</h2>
      <Type normType={normType} setNormType={setNormType} />
      <Rounds nRounds={nRounds} setNRounds={setNRounds} />
      <div className="opponents">
        <fieldset>
          <legend>Opponents</legend>
          <ol>
            {opponents.map((opponent) =>
              opponent.round <= nRounds ? (
                <li className="opponent-item" key={opponent.round}>
                  <Opponent opponent={opponent} setOpponent={setOpponent} />
                </li>
              ) : (
                false
              )
            )}
          </ol>
        </fieldset>
      </div>
    </>
  );
}
