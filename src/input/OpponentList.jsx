import React from "react";
import { List, ListItem, Paper, Typography } from "@mui/material";
import Opponent from "./Opponent";

export default function OpponentList({ opponents, setOpponent }) {
  return (
    <Paper>
      <Typography variant="button" pl={1} pt={1}>
        Opponents:{" "}
      </Typography>
      <List dense>
        {opponents.map((opponent) => (
          <ListItem key={opponent.round}>
            <Opponent opponent={opponent} setOpponent={setOpponent} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
