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
 * @param {*} nRoundsRemaining     The number of rounds remaining.
 * @param {*} score       The score that will be achieved over all rounds.
 * @param {*} opponents   List of previous opponents. All of them should have a result.
 * @param {*} normType    The type of norm.
 * @returns An object with keys 'noRaised' and 'raised', each containing an object with
 * keys 'requiredAverageRating' and 'raisedRating'.
 *
 * 'noRaised' contains the information for the scenario where none of the remaining
 * opponents has their rating raised to the rating floor (but one of the previous
 * opponents can have their rating raised). 'requiredAverageRating' contains the average
 * rating the that opponents should have in the remaining rounds. 'raisedRating'
 * contains the rating of the previous opponents that got raised, or null if no rating
 * was raised.
 *
 * 'raised' contains the information for the scenario where one of the remaining
 * opponents has their rating raised to the rating floor (and therefore none of the
 * previous opponents will have a raised rating). If no such scenario is possible,
 * 'raised' will contain the value null. If such a scenario is possible,
 * 'requiredAverageRating' will contain the average rating of the opponents in the
 * remaining rounds minus one round. 'raisedRating' will contain the maximum rating of
 * the opponent in the remaining rounds that gets it's rating raised.
 */
export function getRequiredAverage(
  nRoundsRemaining,
  score,
  opponents,
  normType
) {
  let output = { noRaised: null, raised: null };
  if (nRoundsRemaining <= 0) {
    return output;
  }
  const totalRating = getTotalRating(opponents);
  const minimumRating = getMinimumRating(opponents);
  const nRounds = nRounds + opponents.length;
  const requiredTotalRating = getRequiredTotalRating(nRounds, score, normType);
  const requiredRemainingRating = requiredTotalRating - totalRating;

  if (minimumRating < ratingFloorTable[normType]) {
    // It's possible to raise one of the previous opponents to the rating floor.
    output.noRaised = {
      requiredAverageRating:
        (requiredRemainingRating - ratingFloorTable[normType] + minimumRating) /
        nRoundsRemaining,
      raisedRating: minimumRating,
    };
  } else {
    output.noRaised = {
      requiredAverageRating: requiredRemainingRating / nRoundsRemaining,
      raisedRating: null,
    };
  }

  // The maximum rating that one of the remaining opponents can have so that it is the
  // rating that will be raised.
  const raisedRating =
    output.noRaised.raisedRating === null
      ? ratingFloorTable[normType]
      : output.noRaised.raisedRating;
  if (nRoundsRemaining === 1) {
    if (raisedRating < requiredRemainingRating) {
      output.raised = null;
    } else {
      output.raised = {
        requiredAverageRating: 0,
        raisedRating: raisedRating,
      };
    }
  } else {
    output.raised = {
      requiredAverageRating:
        (requiredTotalRating - ratingFloorTable[normType]) / (nRounds - 1),
      raisedRating: raisedRating,
    };
  }
  return output;
}

/**
 * Get the total score against a list of opponents.
 */
export function getTotalScore(opponents) {
  return opponents
    .map((opponent) => resultToScore[opponent.result])
    .reduce((a, b) => a + b, 0);
}

/**
 * Get the total combined rating of all opponents.
 *
 * Unrated opponents count as a fixed rating of 1400.
 */
export function getTotalRating(opponents) {
  return opponents
    .map((opponent) => (isNaN(opponent.rating) ? 0 : opponent.rating))
    .map((rating) => (rating === "unrated" ? unratedRating : rating))
    .reduce((a, b) => a + b, 0);
}

/**
 * Get the minimum rating of all opponents.
 *
 * Unrated opponents count as a fixed rating of 1400.
 * If all opponnents have a missing rating, it will return null.
 */
function getMinimumRating(opponents) {
  let opponentRatings = opponents
    .map((opponent) => (isNaN(opponent.rating) ? Infinity : opponent.rating))
    .map((opponent) =>
      opponent.rating === "unrated" ? unratedRating : opponent.rating
    );
  const minimumRating = Math.min(...opponentRatings);
  return minimumRating === Infinity ? null : minimumRating;
}
