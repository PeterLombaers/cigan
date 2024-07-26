import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function rowIdentifier(points) {
  return points.toFixed(1).toString().replace(".", "");
}

export default function RatingTable({ rows }) {
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
            <TableRow key={rowIdentifier(row.points)}>
              <TableCell align="center">{row.points.toFixed(1)}</TableCell>
              <TableCell align="center">
                {row.averageRating.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
