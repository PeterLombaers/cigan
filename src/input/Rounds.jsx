import React from "react";

export default function Rounds({ nRounds, setNRounds }) {
  return (
    <fieldset>
      <legend>Number of rounds?</legend>
      <input
        type="number"
        name="n-rounds"
        id="n-rounds"
        min="7"
        max="13"
        value={nRounds}
        onChange={(e) => setNRounds(e.target.value)}
      />
    </fieldset>
  );
}
