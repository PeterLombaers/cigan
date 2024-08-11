import React from "react";
import RatingTable from "./output/RatingTable";
import { Container } from "@mui/material";
import { Stack, Paper, Typography } from "@mui/material";
import {
  calculatePerformanceRating,
  getTotalScore,
  getRequiredAverage,
} from "./calculations";
import { minRequiredScoreTable } from "./fide_handbook";

const normTypeOrder = { GM: 6, IM: 5, WGM: 4, FM: 3, WIM: 2, WFM: 1, "": 0 };

function getNWithoutResult(opponents) {
  return opponents
    .map((opponent) => (opponent.result === "" ? 1 : 0))
    .reduce((a, b) => a + b, 0);
}

function getNWithResult(opponents) {
  return opponents
    .map((opponent) => (opponent.result === "" ? 0 : 1))
    .reduce((a, b) => a + b, 0);
}

function getRatingTableData(opponents, normType) {
  let ratingTableData = [];
  const opponentsWithResult = opponents.filter(
    (opponent) => opponent.result != ""
  );

  const nRounds = opponents.length;
  const nRoundsRemaining = nRounds - opponentsWithResult.length;
  if (nRoundsRemaining === 0) {
    return ratingTableData;
  }

  const totalScore = getTotalScore(opponentsWithResult);
  const maxScore = totalScore + nRoundsRemaining;
  const minRequiredScore = minRequiredScoreTable[nRounds];
  if (maxScore < minRequiredScore) {
    return ratingTableData;
  }

  for (
    let score = Math.max(totalScore, minRequiredScore);
    score <= maxScore;
    score += 0.5
  ) {
    ratingTableData.push({
      score: score - totalScore,
      data: getRequiredAverage(
        nRoundsRemaining,
        score,
        opponentsWithResult,
        normType
      ),
    });
  }
  return ratingTableData;
}

export default function Output({ opponents, normType }) {
  const performanceRating = calculatePerformanceRating(opponents);
  return (
    <Container>
      <Stack direction="column" spacing={1}>
        <Stack spacing={1} direction="row" flexWrap="flex">
          <Paper>
            <Typography variant="button">
              Performance Rating:{" "}
              {isNaN(performanceRating) ? 0 : performanceRating.toFixed(1)}
            </Typography>
          </Paper>{" "}
          <Paper>
            <Typography variant="button">
              Total Score: {getTotalScore(opponents)}
            </Typography>
          </Paper>
          <Paper>
            <Typography variant="button">
              Rounds Played: {getNWithResult(opponents)}
            </Typography>
          </Paper>
          <Paper>
            <Typography variant="button">
              Rounds Left: {getNWithoutResult(opponents)}
            </Typography>
          </Paper>
        </Stack>
        <RatingTable
          rows={getRatingTableData(opponents, normType)}
        ></RatingTable>
      </Stack>
    </Container>
  );
}
