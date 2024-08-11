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

function maxScoreToShow(rows) {
  for (let i = 0; i < rows.length - 1; i++) {
    if (
      rows[i].data.noRaised.requiredAverageRating ===
      rows[i + 1].data.noRaised.requiredAverageRating
    ) {
      return { score: rows[i].score, cropped: true };
    }
  }
  return { score: rows.at(-1), cropped: false };
}

export default function RatingTable({ rows }) {
  if (!rows) {
    return (
      <Typography>
        You can no longer get the minimum required number of points for a norm.
      </Typography>
    );
  }
  const maxScore = maxScoreToShow(rows).score;
  const cropped = maxScoreToShow(rows).cropped;
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
          {rows
            .filter((row) => row.score <= maxScore)
            .map((row) => (
              <TableRow key={rowIdentifier(row.score)}>
                <TableCell align="center">
                  {row.score.toFixed(1)}
                  {
                    // Add a plus to the final score if the rows are cropped.
                    row.score === maxScore && cropped ? "+" : ""
                  }
                </TableCell>
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
