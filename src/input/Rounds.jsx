import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Stack, Typography, Paper } from "@mui/material";

export default function Rounds({ nRounds, setNRounds }) {
  const handleNRounds = (event, newNRounds) => {
    if (newNRounds !== null) {
      setNRounds(newNRounds);
    }
  };

  return (
    <Paper>
      <Stack direction="row" alignItems="center" spacing={1} padding={1}>
        <Typography variant="button">Rounds: </Typography>
        <ToggleButtonGroup
          color="primary"
          value={nRounds}
          exclusive
          onChange={handleNRounds}
          aria-label="number of rounds"
        >
          <ToggleButton value={7} aria-label="7 rounds">
            7
          </ToggleButton>
          <ToggleButton value={8} aria-label="8 rounds">
            8
          </ToggleButton>
          <ToggleButton value={9} aria-label="9 rounds">
            9
          </ToggleButton>
          <ToggleButton value={10} aria-label="10 rounds">
            10
          </ToggleButton>
          <ToggleButton value={11} aria-label="11 rounds">
            11
          </ToggleButton>
          <ToggleButton value={12} aria-label="12 rounds">
            12
          </ToggleButton>
          <ToggleButton value={13} aria-label="13 rounds">
            13
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Paper>
  );
}
