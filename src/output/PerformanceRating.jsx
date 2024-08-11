import React from "react";
import { Paper, Typography } from "@mui/material";

export default function PerformanceRating({ rating }) {
  return (
    <Paper>
      <Typography variant="button" padding={1}>
        Performance Rating: {isNaN(rating) ? 0 : rating.toFixed(1)}
      </Typography>
    </Paper>
  );
}
