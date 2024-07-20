import React from "react";

export default function OpponentResult({ round, result, setResult }) {
  return (
    <div className="opponents-result">
      <label htmlFor={"opponnent-result-" + round}>Result</label>
      <select
        name="opponents-result"
        id={"opponents-result-" + round}
        value={result}
        onChange={(e) => setResult(e.target.value)}
      >
        <option value=""></option>
        <option value="win">Win</option>
        <option value="draw">Draw</option>
        <option value="loss">Loss</option>
      </select>
    </div>
  );
}
