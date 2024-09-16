//* Track the current index and number of seats
//* There are a few cases to handle that change depending on the current character
//*     - If we have 2 seats
//*         - And we are at "S", we'd have 3 seats, so we say the next call has 1 seat (3 % 2)
//!             - Essentially, we don't have a choice, seats are split up into groups of 2, not 3
//*         - If we are at a "P", we can CHOOSE to split, or not (sum the results)
//*             - If you DO split, the number of seats becomes 0
//*             - If we DON'T split, the number of seats stays 2
//*     - If we have LESS than 2 seats
//*         - If we are at "S", then seats has to decrease (and we know seats + 1 <= 2 at this point)
//*         - Otherwise, don't split

//* Apply memoization to avoid redundant work
function numberOfWays(corridor) {
  function countDividers(i, seats) {
    if (i === corridor.length) {
      return seats === 2 ? 1 : 0;
    }

    //* Utilize memoized value
    if (memo[i][seats] !== -1) {
      return memo[i][seats];
    }

    if (seats === 2) {
      if (corridor[i] === "P") {
        //* Either add divider before current plant or not
        return (memo[i][seats] =
          ((countDividers(i + 1, 0) % MOD) +
            (countDividers(i + 1, seats) % MOD)) %
          MOD);
      } else {
        //* FORCED to put divider before current seat; we already have 2 seats
        return (memo[i][seats] = countDividers(i + 1, 1) % MOD);
      }
    } else {
      return (memo[i][seats] =
        countDividers(i + 1, seats + (corridor[i] === "S" ? 1 : 0)) % MOD);
    }
  }

  const MOD = 10 ** 9 + 7;

  //* There are "n" indices and 3 possible seat numbers for each
  const memo = new Array(corridor.length)
    .fill(0)
    .map(() => new Array(3).fill(-1));

  return countDividers(0, 0);
}

console.log(numberOfWays("SSSS")); //* 1
console.log(numberOfWays("P")); //* 0
console.log(numberOfWays("SSPPSPS")); //* 3
console.log(numberOfWays("PPSPSP")); //* 1
console.log(numberOfWays("SSSSS")); //* 0

//* Time: O(n) - In the worst case, there 2 possible branches from a single call
//* The depth of the recursion tree scales with s.length (n)
//* We are memoizing the results to each subproblem
//* There are "n" possible indices, and 3 possible numbers of seats (0, 1, 2)
//* (n + 1) * (3) = O(n * 3) = O(n)

//* Space: O(n) - The depth of the recursion tree scales with n
//* We increment i by 1 each successive call
//* There are n * 3 unique subproblems, thus n * 3 unique keys/values stored in memo
