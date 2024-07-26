import React from "react";
import Rounds from "./input/Rounds.jsx";
import Type from "./input/NormType.jsx";
import {
  Stack,
  Container,
} from "@mui/material";
import OpponentList from "./input/OpponentList.jsx";

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
    <Container>
      <Stack>
        <Type normType={normType} setNormType={setNormType} />
        <Rounds nRounds={nRounds} setNRounds={setNRounds} />
        <OpponentList
          nRounds={nRounds}
          opponents={opponents.slice(0, nRounds)}
          setOpponent={setOpponent}
        />
      </Stack>
    </Container>
  );
}
