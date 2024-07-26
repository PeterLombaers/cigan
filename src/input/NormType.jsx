import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Paper, Typography, Stack } from "@mui/material";

export default function Type({ normType, setNormType }) {
  const handleNormType = (event, newNormType) => {
    if (newNormType !== null) {
      setNormType(newNormType);
    }
  };

  return (
    <Paper>
      <Stack direction="row" alignItems="center" spacing={1} padding={1}>
        <Typography variant="button">Norm type: </Typography>
        <ToggleButtonGroup
          color="primary"
          value={normType}
          exclusive
          onChange={handleNormType}
          aria-label="norm type"
        >
          <ToggleButton value="GM" aria-label="GM norm">
            GM
          </ToggleButton>
          <ToggleButton value="IM" aria-label="IM norm">
            IM
          </ToggleButton>
          <ToggleButton value="WGM" aria-label="WGM norm">
            WGM
          </ToggleButton>
          <ToggleButton value="WIM" aria-label="WIM norm">
            WIM
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Paper>
  );
}
