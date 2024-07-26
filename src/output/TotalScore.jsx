import { Paper, Typography } from "@mui/material";
import React from "react";

export default function TotalScore({ score }) {
  return (
    <Paper>
      <Typography variant="button" margin={1}>Total Score: {score}</Typography>
    </Paper>
  );
}
