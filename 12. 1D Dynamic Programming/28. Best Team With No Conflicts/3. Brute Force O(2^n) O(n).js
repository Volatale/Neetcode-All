//* At each step, make one of two choices
//*     - Include the current player assuming it is valid
//*         - Take the score
//*     - Exclude the current player
//* Combine the player's age and score into a single tuple
//*     - Then sort; this allows us to avoid the "age" check
//! Conflicts are created when player A is younger than player B and has a higher score
//*     - Thus, if we apply reverse thinking, player B's score should be >= player A's score

//! Recurrence Relation: F(i, prev) = max(F(i + 1, i) + players[i][1], F(i + 1, prev))
function bestTeamScore(scores, ages) {
  function getScore(i, prev) {
    //* Base Case: No more players to consider
    if (i === players.length) return 0;

    let maxScore = 0;

    //* Case 1: Include current player
    if (prev === -1 || players[i][1] >= players[prev][1]) {
      maxScore = Math.max(maxScore, getScore(i + 1, i) + players[i][1]);
    }

    //* Case 2: Exclude current player
    maxScore = Math.max(maxScore, getScore(i + 1, prev));

    return maxScore;
  }

  //* Combine players with their ages and score
  const players = scores.map((_, i) => [ages[i], scores[i]]);

  //* Sort players by AGE, if ages are equal, sort based on score
  players.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1]; //* Sorting based on score
    }
    return a[0] - b[0];
  });

  //* Start with no previous player index
  return getScore(0, -1);
}

console.log(bestTeamScore([1, 3, 5, 10, 15], [1, 2, 3, 4, 5])); //* 34
console.log(bestTeamScore([4, 5, 6, 5], [2, 1, 2, 1])); //* 16
console.log(bestTeamScore([1, 2, 3, 5], [8, 9, 10, 1])); //* 6

//* Time: O(2^n) - At each step we can make two choices
//* So the branching factor is 2 and the depth of the recursion tree is "n"
//* it takes O(n log n) to sort, but that is dominated by the exponential O(2^n)

//* Space: O(n) - The size of the players array scales with "n"
//* The depth of the recursion tree scales with "n"
