//* At each step, make one of two choices
//*     - Include the current player assuming it is valid
//*         - Take the score
//*     - Exclude the current player
//* Combine the player's age and score into a single tuple
//*     - Then sort; this allows us to avoid the "age" check
//! Conflicts are created when player A is younger than player B and has a higher score
//*     - Thus, if we apply reverse thinking, player B's score should be >= player A's score

//* Apply tabulation to avoid recursion overhead
//! Recurrence Relation: F(i, prev) = max(F(i + 1, i) + players[i][1], F(i + 1, prev))
function bestTeamScore(scores, ages) {
  if (scores.length === 0 || ages.length === 0) return 0;

  //* Combine players with their ages and score
  const players = scores.map((_, i) => [ages[i], scores[i]]);

  //* Sort players by AGE; if ages are equal, sort by score
  players.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1]; //* Sort based on score
    }

    return a[0] - b[0];
  });

  const n = players.length;
  let maxScore = 0;

  //* dp[i] = Maximum score we can get from players up to "i"
  const dp = new Array(n + 1).fill(0);

  //* "i" is index of the CURRENT player
  //* "prev" is the index of the PREVIOUSLY chosen player
  for (let i = 0; i < n; i++) {
    //* The score is AT LEAST the current player's score
    dp[i] = players[i][1];

    for (let prev = 0; prev < i; prev++) {
      //* Ensure no conflict
      if (players[i][1] >= players[prev][1]) {
        dp[i] = Math.max(dp[i], dp[prev] + players[i][1]);
      }
    }

    maxScore = Math.max(maxScore, dp[i]);
  }

  return maxScore;
}

console.log(bestTeamScore([1, 3, 5, 10, 15], [1, 2, 3, 4, 5])); //* 34
console.log(bestTeamScore([4, 5, 6, 5], [2, 1, 2, 1])); //* 16
console.log(bestTeamScore([1, 2, 3, 5], [8, 9, 10, 1])); //* 6

//* Time: O(n^2) - We memoize the results of each subproblem
//* There are "n" indices and "n" possible prev indices
//* (n + 1) * (n + 1) = n^2 + 2 unique subproblems in the worst case
//* Sorting takes O(n log n), but this is dominated by the quadratic nature of the loops

//* Space: O(n) - The size of the players array scales with "n"
