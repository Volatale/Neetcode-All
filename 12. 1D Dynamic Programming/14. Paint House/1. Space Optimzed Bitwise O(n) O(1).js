//* We can't choose the same color twice in a row
//*     - So track the PREVIOUS choice that was made
//* Ultimately, we want to try every possible combination
//* Take the minimum out of all three paths

//* i = index, c = color
/**
 *! Recurrence Relation: F(i, c) =
 *!      min(
 *!           F(i + 1, 0) + houses[i][0]
 *!           F(i + 1, 1) + houses[i][1]
 *!           F(i + 1, 2) + houses[i][2]
 *!         )
 */
//* Apply tabulation to avoid recursion overhead
//* We only need the previous row and the current row
//*     - Use bitwise alternation to swap between rows
function paintHouse(house) {
  const n = house.length;
  if (n === 0) return 0;

  //* dp[c] = Min cost to paint house "i" with color "c"
  const dp = new Array(2).fill(0).map(() => new Array(3).fill(Infinity));

  //* Initialize the first row
  dp[0] = [...house[0]];

  //* i = House. We don't need to track the color
  for (let i = 1; i < n; i++) {
    dp[i & 1][0] =
      house[i][0] + Math.min(dp[(i - 1) & 1][1], dp[(i - 1) & 1][2]);
    dp[i & 1][1] =
      house[i][1] + Math.min(dp[(i - 1) & 1][0], dp[(i - 1) & 1][2]);
    dp[i & 1][2] =
      house[i][2] + Math.min(dp[(i - 1) & 1][0], dp[(i - 1) & 1][1]);
  }

  //* Return the minimum cost among all paths
  return Math.min(dp[(n - 1) & 1][0], dp[(n - 1) & 1][1], dp[(n - 1) & 1][2]);
}

console.log(paintHouse([[10, 4, 2]])); //* 2

console.log(
  paintHouse([
    [20, 30, 40],
    [40, 30, 40],
    [20, 30, 40],
  ])
); //* 70

console.log(
  paintHouse([
    [17, 2, 17],
    [16, 16, 5],
    [14, 3, 19],
  ])
); //* 10

console.log(
  paintHouse([
    [17, 2, 17],
    [16, 16, 5],
  ])
); //* 7

//* Time: O(n) - There are "n" houses to iterate over
//* And there are 3 colors possible colors, so n * 3 unique subproblems

//* Space: O(1) - The space usage is always the same regardless of the number of houses
