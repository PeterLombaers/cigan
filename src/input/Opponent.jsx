import React from "react";
import OpponentRating from "./OpponentRating.jsx";
import OpponentResult from "./OpponentResult.jsx";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Person4Icon from "@mui/icons-material/Person4";

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
    <Stack direction="row" spacing={2} alignItems="center">
      <Stack direction="row" spacing={0}>
        <Person4Icon />
        <Typography variant="button">{opponent.round}</Typography>
      </Stack>
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
    </Stack>
  );
}
