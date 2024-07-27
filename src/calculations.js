import {
  dpTable,
  unratedRating,
  ratingFloorTable,
  requiredAverageRatingTable,
  requiredPerformanceTable,
} from "./fide_handbook";

const resultToScore = { win: 1.0, draw: 0.5, loss: 0.0, "": 0.0 };

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
 * Unrated players count as 1400.
 *
 * If normType is provided, the lowest rated player with a rating lower than the rating
 * floor corresponding to the norm type will get the rating raised to the rating floor.
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
 * Given score, number of rounds and norm type, get the required total rating of the
 * opponents.
 *
 * Note that there is a minimum required average rating per norm type, so there is also
 * a corresponding minimum required total rating.
 *
 * Example
 * -------
 * If a tournament has 9 rounds, you score 5 points and you want an IM norm then:
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
 * Get the required average rating in the remaining rounds if none of the rating in the
 * remaining rounds will be raised to the rating floor.
 *
 * @param {*} nRounds     The number of rounds.
 * @param {*} score       The score that will be achieved over all rounds.
 * @param {*} opponents   List of previous opponents.
 * @param {*} normType    The type of norm.
 * @returns An object with keys 'requiredAverageRating' and 'raisedRating'.
 * The first contains average rating required from the opponents in the remaining rounds
 * assuming that the player will achieve a total score of `score`, and none of the
 * ratings in the remaining rounds will be raised to the rating floor. If there are no
 * rounds remaining, this will have value null.
 * The second contains the value of the rating of the previous opponent that has been
 * raised to the rating floor. If all ratings were already above the rating floor this
 * will have value null.
 */
function getRequiredAverageNoRaised(nRounds, score, opponents, normType) {
  const nRoundsRemaining = nRounds - opponents.length;
  if (nRoundsRemaining <= 0) {
    return null;
  }
  // Unrated players count as a fixed rating.
  let opponentRatings = opponentsWithResult.map((opponent) =>
    opponent.rating === "unrated" ? unratedRating : opponent.rating
  );
  let totalRating = opponentRatings.reduce((a, b) => a + b, 0);
  // The lowest rated player can get raised to the rating floor for the norm type.
  const minimumRating = Math.min(...opponentRatings);
  let ratingHasBeenRaised = false;
  if (minimumRating < ratingFloorTable[normType]) {
    totalRating += ratingFloorTable[normType] - minimumRating;
    ratingHasBeenRaised = true;
  }

  const requiredTotalRating = getRequiredTotalRating(nRounds, score, normType);
  const requiredRemainingRating = requiredTotalRating - totalRating;
  return {
    requiredAverageRating: requiredRemainingRating / nRoundsRemaining,
    raisedRating: ratingHasBeenRaised ? minimumRating : null,
  };
}

/**
 * Get the required average rating in the remaining rounds if the rating of one of the
 * opponents in the remaining rounds is raised to the rating floor.
 *
 * This means that in the remaining rounds there will be an opponent with a rating lower
 * than any of the previous opponents, and also lower than the rating floor of the norm
 * type.
 *
 * @param {*} nRounds     The number of rounds.
 * @param {*} score       The score that will be achieved over all rounds.
 * @param {*} opponents   List of previous opponents.
 * @param {*} normType    The type of norm.
 * @returns An object with keys 'requiredAverageRating' and 'raisedRating'.
 * The first contains the average rating required of the opponents in the remaining
 * rounds, excluding one player who'll have their rating raised to the rating floor for
 * the norm type, assuming the player makes the given total score.
 * The second contains the maximum rating of the opponent whose rating will get raised.
 * If the number of remaining rounds is 0, or there is no way to make a norm while
 * raising an opponent rating to the rating floor, then the function will return null.
 */
function getRequiredAverageRaised(nRounds, score, opponents, normType) {
  const nRoundsRemaining = nRounds - opponents.length;
  if (nRoundsRemaining <= 0) {
    return null;
  }
  // Unrated players count as a fixed rating.
  let opponentRatings = opponentsWithResult.map((opponent) =>
    opponent.rating === "unrated" ? unratedRating : opponent.rating
  );
  let totalRating = opponentRatings.reduce((a, b) => a + b, 0);
  const minimumRating = Math.min(...opponentRatings);
  const raisedRating = Math.min(minimumRating, ratingFloorTable[normType]);
  const requiredTotalRating = getRequiredTotalRating(nRounds, score, normType);
  const requiredRemainingRating = requiredTotalRating - totalRating;
  if (nRoundsRemaining === 1) {
    if (raisedRating < requiredRemainingRating) {
      return null;
    } else {
      return {
        requiredAverageRating: null,
        raisedRating: raisedRating,
      };
    }
  } else {
    return {
      requiredAverageRating:
        (requiredTotalRating - ratingFloorTable[normType]) / (nRounds - 1),
      raisedRating: raisedRating,
    };
  }
}

/**
 * Get the total score against a list of opponents.
 */
function getTotalScore(opponents) {
  return opponents
    .map((opponent) => resultToScore[opponent.result])
    .reduce((a, b) => a + b, 0);
}

/**
 * Get the total combined rating of all opponents.
 *
 * Unrated opponents count as a fixed rating of 1400.
 */
function getTotalRating(opponents) {
  return opponents
    .map((opponent) => (isNaN(opponent.rating) ? 0 : opponent.rating))
    .map((rating) => (rating === "unrated" ? unratedRating : rating))
    .reduce((a, b) => a + b, 0);
}
