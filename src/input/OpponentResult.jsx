import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function OpponentResult({ round, result, setResult }) {
  const handleResult = (event, newResult) => {
    if (newResult === null) {
      setResult("");
    } else {
      setResult(newResult);
    }
  };

  return (
    <ToggleButtonGroup
      id={"result-round-" + round}
      color="primary"
      value={result}
      exclusive
      onChange={handleResult}
      aria-label="result"
    >
      <ToggleButton value="win" aria-label="win">
        Win
      </ToggleButton>
      <ToggleButton value="draw" aria-label="draw">
        Draw
      </ToggleButton>
      <ToggleButton value="loss" aria-label="loss">
        Loss
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
