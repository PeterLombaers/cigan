import React from "react";
import RatingTable from "./output/RatingTable";
import { Container } from "@mui/material";
import PerformanceRating from "./output/PerformanceRating";
import TotalScore from "./output/TotalScore";
import Round from "./output/Rounds";
import { Stack } from "@mui/material";
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
      score: score,
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
  return (
    <Container>
      <Stack spacing={1} padding={1}>
        <PerformanceRating rating={calculatePerformanceRating(opponents)} />
        <TotalScore score={getTotalScore(opponents)} />
        <Round
          rounds_played={getNWithResult(opponents)}
          rounds_left={getNWithoutResult(opponents)}
        ></Round>
        <RatingTable
          rows={getRatingTableData(opponents, normType)}
        ></RatingTable>
      </Stack>
    </Container>
  );
}
