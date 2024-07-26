import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

export default function Round({ rounds_played, rounds_left }) {
  return (
    <Stack direction="row" spacing={1}>
      <Paper>
        <Typography variant="button" padding={1}>Rounds Played: {rounds_played}</Typography>
      </Paper>
      <Paper>
        <Typography variant="button" padding={1}>Rounds Left: {rounds_left}</Typography>
      </Paper>
    </Stack>
  );
}
