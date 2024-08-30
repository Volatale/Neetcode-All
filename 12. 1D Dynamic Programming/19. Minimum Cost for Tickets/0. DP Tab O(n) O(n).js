//* There are three choices we can make at each step
//* We don't know which is the best choice
//*     - So it is a good idea to try ALL THREE choices

/**
 *! Recurrence Relation
 *!     F(n) = min(
 *!         F(n + 1) + costs[0]
 *!         F(n + 7) + costs[1]
 *!         F(n + 30) + costs[2]
 *!        )
 */
//* Apply Tabulation to avoid recursion overhead
function mincostTickets(days, costs) {
  const travelDays = new Set(days);
  const lastDay = days[days.length - 1];

  //* dp[i] = Minimum cost needed to travel on day "i"
  const dp = new Array(days.length + 1).fill(0);

  //* "i" = day, start from day 1
  for (let i = 1; i <= lastDay; i++) {
    if (!travelDays.has(i)) {
      dp[i] = dp[i - 1];
    } else {
      const oneDay = dp[i - 1] + costs[0];
      const sevenDay = dp[Math.max(0, i - 7)] + costs[1];
      const thirtyDay = dp[Math.max(0, i - 30)] + costs[2];

      dp[i] = Math.min(oneDay, sevenDay, thirtyDay);
    }
  }

  return dp[lastDay];
}

console.log(mincostTickets([1, 2, 3], [3, 4, 5])); //* 4
console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15])); //* 11
console.log(mincostTickets([1], [100, 200, 300])); //* 100
console.log(
  mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15])
); //* 17

//* Time: O(n) - We are memoizing the results of each subproblem
//* The only non-constant parameters we are dealing with is "i" (day)
//* Thus there are only "n" possible unique subproblems

//* Space: O(n) - The depth of the recursion tree scales with "n"
//* Where "n" is the last day in the days array
//* The state transitions by "1" at each step (minimum)
//* In the worst case, the memo object stores "n" keys/values
