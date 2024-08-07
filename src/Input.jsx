import React from "react";
import Opponent from "./input/Opponent.jsx";
import Rounds from "./input/Rounds.jsx";
import Type from "./input/NormType.jsx";
import { List, ListItem, Stack, Paper, ListSubheader, Typography } from "@mui/material";

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
    <Paper variant="elevation">
      <Stack>
        <Type normType={normType} setNormType={setNormType} />
        <Rounds nRounds={nRounds} setNRounds={setNRounds} />
        <Typography variant="button" pl={1} pt={1}>Opponents: </Typography>
        <List dense>
          {opponents.map((opponent) =>
            opponent.round <= nRounds ? (
              <ListItem>
                <Opponent opponent={opponent} setOpponent={setOpponent} />
              </ListItem>
            ) : (
              false
            )
          )}
        </List>
      </Stack>
    </Paper>
  );
}
