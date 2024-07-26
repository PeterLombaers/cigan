// Title regulations in 2024: https://handbook.fide.com/chapter/B012024

// Minimum Performance (0.5):

// Minimum average rating (0.5):

// Minimum number of games (1.4.1)
// - At least 9 games with exceptions for some specific tournaments
// Nationalities (1.4.3 / 1.4.4):
// - At least two other federations than the player (with a few exceptions for national championship,
//   or if the tournament has enough federations)
// - At most 3/5 of the opponents can come from the same federation as the player
// - At most 2/3 of the opponents can come from the same federation
// Titles (1.4.5):
// - At least 50% of the opponents has a title (no counting CM or WCM)
// - At least 1/3 of the opponents has a title of the norm type or higher
// - For a double round robin there need to be at least 6 players with at least 1/2 the title of the norm type or higher
// Rating Floor (1.4.6):
// {"GM": 2200, "IM": 2050, "WGM": 2000, "WIM": 1850}
// - At most one player shall have their rating raised to the rating floor, the lower rated opponent
// - Unrated opponents not covered by the above rule count as 1400
// Average Rating (1.4.7):
// - Rounded to the nearest whole number
// - 0.5 is rounded upward
// Minimum score (1.4.8):
// - 35% for all norm types
// Minimum Average Rating opponents (1.4.9):
// {"GM": 2380, "IM": 2230, "WGM": 2180, "WIM": 2030}
// Performance rating (1.4.9):
// {"GM": 2600, "IM": 2450, "WGM": 2400, "WIM": 2250}
// Define: Performance rating (Rp), Average rating opponents (Ra), rating difference (dp)
// - Rp = Ra + dp
// - p = ( points / rounds ) rounded to two decimals
// - dp is calculated by the following conversion table

import React from "react";
import { dpTable } from "./dp_table";
import RatingTable from "./output/RatingTable";
import { Container, Paper } from "@mui/material";
import PerformanceRating from "./output/PerformanceRating";
import TotalScore from "./output/TotalScore";
import Round from "./output/Rounds";
import { Stack } from "@mui/material";

const resultToScore = { win: 1.0, draw: 0.5, loss: 0.0, "": 0.0 };
const normTypeOrder = { GM: 6, IM: 5, WGM: 4, FM: 3, WIM: 2, WFM: 1, "": 0 };
const minRequiredScorePerc = 0.35;
const unratedRating = 1400;

const requiredPerformanceTable = {
  GM: 2599.5,
  IM: 2449.5,
  WGM: 2399.5,
  WIM: 2249.5,
};

const requiredAverageRatingTable = {
  GM: 2379.5,
  IM: 2229.5,
  WGM: 2179.5,
  WIM: 2129.5,
};

const ratingFloorTable = {
  GM: 2200,
  IM: 2050,
  WGM: 2000,
  WIM: 1850,
};

/**
 * Given score, number of rounds and norm type, get the required total rating of the
 * opponents.
 *
 * Note that there is a minimum required average rating per norm type, so there is also
 * a corresponding mimnum required total rating.
 *
 * Example
 * -------
 * If tournament has 9 rounds, you score 5 points and you want an IM norm then:
 * - The required performance (Rp) is 2449.5
 * - You have 5/9 = 0.56 average points (p), so the rating difference (dp) is 43 (see
 * dp_table.js)
 * - The required rating average (Ra) is Rp - dp =  2449.5 - 43 = 2406.5
 * - So the required total rating is 9 * 2406.5 = 21658.5
 *
 * @param {number} nRounds Number of rounds in the tournament.
 * @param {number} score   Player score in the tournament.
 * @param {normType} normType  Type of norm.
 * @returns {number}  Required total rating of the opponents.
 */
export function getRequiredTotalRating(nRounds, score, normType) {
  const minimumRequiredTotalRating =
    requiredAverageRatingTable[normType] * nRounds;
  const p = getPValue(score, nRounds);
  const dp = dpTable[p];
  const Rp = requiredPerformanceTable[normType];
  const Ra = Rp - dp;
  return Math.max(Ra * nRounds, minimumRequiredTotalRating);
}

/**
 * Get the value for `p` in the formula for rating performance.
 *
 * It is defined as `(total score / number of rounds)` rounded to the nearest
 * one-hundredth.
 */
function getPValue(score, nRounds) {
  return Math.round((100 * score) / nRounds) / 100;
}
/**
 * Calculate the performance rating of a player based on the current results.
 *
 * Unrated players counts as 1400. If normType is provided, the lowest rated player with
 * a rating lower than the rating floor corresponding to the norm type will get the
 * rating raised to the rating floor.
 */
export function calculatePerformanceRating(opponents, normType) {
  let opponentsWithResult = opponents.filter(
    (opponent) => opponent.result !== ""
  );
  // Unrated players count as a fixed rating.
  let opponentRatings = opponentsWithResult.map((opponent) =>
    opponent.rating === "unrated" ? unratedRating : opponent.rating
  );
  let totalRating = opponentRatings.reduce((a, b) => a + b, 0);
  if (normType) {
    // The lowest rated player can get raised to the rating floor for the norm type.
    let minimumRating = Math.min(...opponentRatings);
    if (minimumRating < ratingFloorTable[normType]) {
      totalRating += ratingFloorTable[normType] - minimumRating;
    }
  }

  const Ra = totalRating / opponentsWithResult.length;
  const score = getTotalScore(opponentsWithResult);
  const p = getPValue(score, opponentsWithResult.length);
  return Ra + dpTable[p];
}

/**
 * At any point in the tournament, we want to know how much we need to score and against
 * what opposition to get a norm.
 *
 * We need to score at least 35%, and we can score at most the current score plus the
 * number of remaining rounds.
 *
 * Otherwise, for each possible score between the minimum required score and the
 * maximum score we want:
 *  - The average rating needed in the remaining rounds without raising any remaining
 *  opponent rating to the rating floor:
 *
 *  - The average rating needed in the remaining rounds if there is one remaining player
 *  whose rating will be raised to the rating floor.
 *
 *  - The previous opponent with the lowest rating below the rating floor.
 *
 */

function getTotalRating(opponents) {
  return opponents
    .map((opponent) => (isNaN(opponent.rating) ? 0 : opponent.rating))
    .reduce((a, b) => a + b, 0);
}

function getTotalScore(opponents) {
  return opponents
    .map((opponent) => resultToScore[opponent.result])
    .reduce((a, b) => a + b, 0);
}

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

export function roundUpToHalfPoint(scorePerc) {
  return Math.ceil(scorePerc * 2) / 2;
}

/**
 * Calculate the minimum required score in a tournament with given number of rounds.
 *
 * Fide Handbook (1.4.8): 35% for all norm types
 *
 * @param {number} nRounds Number of rounds in the tournament.
 * @returns {number} Minimum required score.
 */
export function getMinRequiredScore(nRounds) {
  return roundUpToHalfPoint(nRounds * minRequiredScorePerc);
}

/**
 * Get the lowest opponent rating.
 *
 * @param {*} opponents
 * @returns The lowest rating, or null if there are no opponents with a rating.
 */
export function getLowestRating(opponents) {
  let minRating = opponents
    .filter((opponent) => !isNaN(opponent.rating))
    .map((opponent) => opponent.rating)
    .reduce((min, rating) => Math.min(min, rating), Infinity);
  return minRating === Infinity ? null : minRating;
}

/**
 * Get the required average rating in the remaining rounds if none of them will be
 * raised to the rating floor, given a score over all rounds.
 *
 * @param {*} nRounds     The number of rounds.
 * @param {*} score       The score that will be achieved over all rounds.
 * @param {*} opponents   Previous opponents.
 * @param {*} normType    The type of norm.
 * @returns The average rating  required from the opponents in the remaining rounds,
 * assuming that the player will achieve a total score of `score`, and none of the
 * ratings in the remaining rounds will be raised to the rating floor. If there are no
 * rounds remaining, this will return null.
 */
function getRequiredAverageNoRaised(nRounds, score, opponents, normType) {
  const nRoundsRemaining = getNWithoutResult(opponents);
  if (nRoundsRemaining === 0) {
    return null;
  }
  let totalRating = getTotalRating(opponents);
  const lowestRating = getLowestRating(opponents);
  const ratingFloor = ratingFloorTable[normType];
  if (lowestRating !== null && lowestRating < ratingFloor) {
    totalRating += ratingFloor - lowestRating;
  }
  const requiredTotalRating = getRequiredTotalRating(nRounds, score, normType);
  const requiredRemainingRating = requiredTotalRating - totalRating;
  return requiredRemainingRating / nRoundsRemaining;
}

function getRequiredAverageRaised(nRounds, score, opponents, normType) {
  const nRoundsRemaining = getNWithoutResult(opponents);
  if (nRoundsRemaining === 0) {
    return null;
  }
  let totalRating = getTotalRating(opponents);
  const ratingFloor = ratingFloorTable[normType];
  const requiredTotalRating = getRequiredTotalRating(nRounds, score, normType);
  const requiredRemainingRating = requiredTotalRating - totalRating;
  if (nRoundsRemaining === 1) {
    return requiredRemainingRating < ratingFloor ? 0 : requiredRemainingRating;
  } else {
    return (requiredRemainingRating - ratingFloor) / (nRoundsRemaining - 1);
  }
}

function reqPerScore(nRounds, opponents, normType) {
  const currentScore = getTotalScore(opponents);
  const nRoundsRemaining = getNWithoutResult(opponents);
  const minRequiredScore = roundUpToHalfPoint(nRounds * minRequiredScorePerc);
  const maxPossibleScore = currentScore + nRoundsRemaining;
  if (maxPossibleScore < minRequiredScore) {
    return [];
  }
  const currentTotalRating = getTotalRating(opponents);
  const requiredPerScore = new Array(
    (maxPossibleScore - minRequiredScore) * 2 + 1
  );
  for (let i = 0; i < requiredPerScore.length; i++) {
    const points = minRequiredScore + i / 2;
    const totalRequired = getRequiredTotalRating(nRounds, points, normType);
    const remainingRequired = totalRequired - currentTotalRating;
    requiredPerScore[i] = {
      points: points,
      averageRating: remainingRequired / nRoundsRemaining,
    };
  }
  return requiredPerScore;
}

export default function Output({ nRounds, opponents, normType }) {
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
          rows={reqPerScore(nRounds, opponents, normType)}
        ></RatingTable>
      </Stack>
    </Container>
  );
}
