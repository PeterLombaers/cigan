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
import RatingRequirement from "./requirements/RatingRequirement";

const resultToScore = { win: 1.0, draw: 0.5, loss: 0.0, "": 0.0 };
const normTypeOrder = { GM: 6, IM: 5, WGM: 4, FM: 3, WIM: 2, WFM: 1, "": 0 };

const requiredPerformance = {
  GM: 2599.5,
  IM: 2449.5,
  WGM: 2399.5,
  WIM: 2249.5,
};

/**
 * Given score, number of rounds and norm type, get the required total rating of the
 * opponents.
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
function requiredTotalRating(nRounds, score, normType) {
  const p = Math.round((100 * score) / nRounds) / 100;
  const dp = dpTable[p];
  const Rp = requiredPerformance[normType];
  const Ra = Rp - dp;
  return Ra * nRounds;
}

function totalRating(opponents) {
  return opponents
    .map((opponent) => (isNaN(opponent.rating) ? 0 : opponent.rating))
    .reduce((a, b) => a + b, 0);
}

function totalScore(opponents) {
  return opponents
    .map((opponent) => resultToScore[opponent.result])
    .reduce((a, b) => a + b, 0);
}

function roundsRemaining(opponents) {
  return opponents
    .map((opponent) => (opponent.result === "" ? 1 : 0))
    .reduce((a, b) => a + b, 0);
}

function reqPerScore(nRounds, opponents, normType) {
  let currentScore = totalScore(opponents);
  let currentRating = totalRating(opponents);
  let nRoundsRemaining = roundsRemaining(opponents);
  return Array.from(Array(nRoundsRemaining * 2 + 1).keys())
    .map((n) => n / 2)
    .map(function (points) {
      let averageRating =
        (requiredTotalRating(nRounds, points + currentScore, normType) -
          currentRating) /
        nRoundsRemaining;
      return {
        points: points,
        averageRating: averageRating,
      };
    });
}

function totalTitlesOpen(opponents) {
  return opponents
    .map((opponent) => normTypeOrder[opponent.title])
    .filter((num) => num >= normTypeOrder[FM]).length;
}

function totalTitlesWomen(opponents) {
  return opponents
    .map((opponent) => normTypeOrder[opponent.title])
    .filter((num) => num >= normTypeOrder[WFM]).length;
}

function normEquivalentTitles(opponents, normType) {
  return opponents
    .map((opponent) => normTypeOrder[opponent.title])
    .filter((num) => num >= normTypeOrder[normType]).length;
}

export default function Requirements({ nRounds, opponents, normType }) {
  return (
    <>
      <h2 className="header header-requirements">Norm Requirements</h2>
      <p>
        In the remaining{" "}
        <span className="n-rounds-remaining">
          {roundsRemaining(opponents)} rounds
        </span>{" "}
        you have the following requirements for a{" "}
        <span className="norm-type">{normType}</span> norm:
      </p>
      <div className="requirements-rating">
        <h3 className="header header-requirements-rating">Rating</h3>
        <ol>
          {reqPerScore(nRounds, opponents, normType).map((req) => (
            <li className="requirements-rating-item" key={req.points}>
              <RatingRequirement
                points={req.points}
                requiredRating={req.averageRating}
              />
            </li>
          ))}
        </ol>
      </div>
      <div className="requirements-titles">
        <h3 className="header header-requirements-titles">Title</h3>
        <ul>
          <li>
            <p className="requirements-title-gm">1 opponent with a GM title</p>
          </li>
          <li>
            <p className="requirements-title-im">
              0 opponent with a IM title or higher
            </p>
          </li>
          <li>
            <p className="requirements-title-fm">
              1 opponent with a FM title or higher
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
