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
const ratingFloorTable = {
  GM: 2200,
  IM: 2050,
  WGM: 2000,
  WIM: 1850,
};
// - At most one player shall have their rating raised to the rating floor, the lower rated opponent
// - Unrated opponents not covered by the above rule count as 1400
const unratedRating = 1400;
// Average Rating (1.4.7):
// - Rounded to the nearest whole number
// - 0.5 is rounded upward
// Minimum score (1.4.8):
// - 35% for all norm types
const minRequiredScorePerc = 0.35;
const minRequiredScoreTable = {
  7: 2.5,
  8: 3,
  9: 3.5,
  10: 3.5,
  11: 4,
  12: 4.5,
  13: 5,
};
// Minimum Average Rating opponents (1.4.9):
const requiredAverageRatingTable = {
  GM: 2379.5,
  IM: 2229.5,
  WGM: 2179.5,
  WIM: 2129.5,
};
// Performance rating (1.4.9):
const requiredPerformanceTable = {
  GM: 2599.5,
  IM: 2449.5,
  WGM: 2399.5,
  WIM: 2249.5,
};
// Define: Performance rating (Rp), Average rating opponents (Ra), rating difference (dp)
// - Rp = Ra + dp
// - p = ( points / rounds ) rounded to two decimals
// - dp is calculated by the following conversion table:
const dpTable = {
  1.0: 800,
  0.99: 677,
  0.98: 589,
  0.97: 538,
  0.96: 501,
  0.95: 470,
  0.94: 444,
  0.93: 422,
  0.92: 401,
  0.91: 383,
  0.9: 366,
  0.89: 351,
  0.88: 336,
  0.87: 322,
  0.86: 309,
  0.85: 296,
  0.84: 284,
  0.83: 273,
  0.82: 262,
  0.81: 251,
  0.8: 240,
  0.79: 230,
  0.78: 220,
  0.77: 211,
  0.76: 202,
  0.75: 193,
  0.74: 184,
  0.73: 175,
  0.72: 166,
  0.71: 158,
  0.7: 149,
  0.69: 141,
  0.68: 133,
  0.67: 125,
  0.66: 117,
  0.65: 110,
  0.64: 102,
  0.63: 95,
  0.62: 87,
  0.61: 80,
  0.6: 72,
  0.59: 65,
  0.58: 57,
  0.57: 50,
  0.56: 43,
  0.55: 36,
  0.54: 29,
  0.53: 21,
  0.52: 14,
  0.51: 7,
  0.5: 0,
  0.49: -7,
  0.48: -14,
  0.47: -21,
  0.46: -29,
  0.45: -36,
  0.44: -43,
  0.43: -50,
  0.42: -57,
  0.41: -65,
  0.4: -72,
  0.39: -80,
  0.38: -87,
  0.37: -95,
  0.36: -102,
  0.35: -110,
  0.34: -117,
  0.33: -125,
  0.32: -133,
  0.31: -141,
  0.3: -149,
  0.29: -158,
  0.28: -166,
  0.27: -175,
  0.26: -184,
  0.25: -193,
  0.24: -202,
  0.23: -211,
  0.22: -220,
  0.21: -230,
  0.2: -240,
  0.19: -251,
  0.18: -262,
  0.17: -273,
  0.16: -284,
  0.15: -296,
  0.14: -309,
  0.13: -322,
  0.12: -336,
  0.11: -351,
  0.1: -366,
  0.09: -383,
  0.08: -401,
  0.07: -422,
  0.06: -444,
  0.05: -470,
  0.04: -501,
  0.03: -538,
  0.02: -589,
  0.01: -677,
  0.0: -800,
};

export {
  dpTable,
  requiredPerformanceTable,
  requiredAverageRatingTable,
  minRequiredScoreTable,
  minRequiredScorePerc,
  unratedRating,
  ratingFloorTable,
};
