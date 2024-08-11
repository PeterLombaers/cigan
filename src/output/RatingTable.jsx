import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

function rowIdentifier(points) {
  return points.toFixed(1).toString().replace(".", "");
}

export default function RatingTable({ rows }) {
  if (!rows) {
    return (
      <Typography>
        You can no longer get the minimum required number of points for a norm.
      </Typography>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="rating-requirements-table">
        <TableHead>
          <TableRow>
            <TableCell>Points</TableCell>
            <TableCell>Average Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={rowIdentifier(row.score)}>
              <TableCell align="center">{row.score.toFixed(1)}</TableCell>
              <TableCell align="center">
                {row.data.noRaised.requiredAverageRating.toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
