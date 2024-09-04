//* We have two choices to make at each level of recursion
//*     - Append "zero" 0s
//*     - Append "ones" 1s
//! There is no need to actually use a string
//*     - Just track the LENGTH of what the string would be
//*     - If length > high, this is NOT a valid "good" string

//! Recurrence Relation: F(n) = F(n + zero) + F(n + ones)
//* Apply tabulation to avoid recursion overhead
//!     - Push DP is more natural for this problem
//!     - Mirrors the memoized solution
function countGoodStrings(low, high, zero, one) {
  const MOD = 10 ** 9 + 7;

  //* dp[i] = Number of good strings we can get at a length of "i"
  const dp = new Array(high + 1).fill(0);
  let goodStrings = 0;

  //* Base Case: there is always a way to make an empty string
  dp[0] = 1;

  //* Push DP
  for (let length = 0; length <= high; length++) {
    //! There may not be any strings in this length
    if (dp[length] === 0) continue;

    //* Case 1: Append 0s "zero" times
    if (length + zero <= high) {
      dp[length + zero] += dp[length] % MOD;
    }

    //* Case 2: Append 1s "one" times
    if (length + one <= high) {
      dp[length + one] += dp[length] % MOD;
    }

    //* If this is a good string
    if (length >= low) {
      goodStrings += dp[length] % MOD;
    }
  }

  return goodStrings % MOD;
}

console.log(countGoodStrings(3, 3, 1, 1)); //* 8
console.log(countGoodStrings(1, 1, 1, 1)); //* 2
console.log(countGoodStrings(2, 3, 1, 2)); //*  5

//* Time: O(high) - We are caching the results of each subproblem
//* Whenever we find a valid substring, we technically find TWO of them
//* So we only have to cache based on the length (which ranges from 0 to high inclusive)
//* If we traveled along the "zero" path (at the top level), the "one" path will have the same result

//* Space: O(high) - The DP array scales with "high"
