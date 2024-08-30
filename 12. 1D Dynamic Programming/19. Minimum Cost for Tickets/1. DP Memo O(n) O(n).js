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
//* Apply Memoization to avoid redundant work
function mincostTickets(days, costs) {
  function travel(i, memo) {
    //* Base Case: Traveled too far
    if (i > lastDay) return 0;

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Skip days that we DON'T travel on
    if (!travelDays.has(i)) {
      return (memo[i] = travel(i + 1, memo));
    }

    return (memo[i] = Math.min(
      travel(i + 1, memo) + costs[0], //* 1 Day Pass
      travel(i + 7, memo) + costs[1], //* 7 Day Pass
      travel(i + 30, memo) + costs[2] //* 30 Day Pass
    ));
  }

  //* Any day NOT in this set should be skipped
  const travelDays = new Set(days);
  const lastDay = days[days.length - 1];

  //* Start from day one
  return travel(1, {});
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
