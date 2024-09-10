//* Instead of tracking the scores of both players
//*     - We should instead just track the maximum return value while alternating between players
//* Start on Alice's turn
//*     - Take a window of values (ranging from [1 to 3])
//*     - We can either take 1, 2 or 3 stones at each step
//* We are told both players are PLAYING OPTIMALLY
//!     - Thus, we have to try EVERY possible move and only keep the OPTIMAL move
//*     - The result of the overaching problem can only be computed once we have the FULL context
//*         - To get the full context, we need to compute all of the prior subproblems
//* Alternate between Alice and Bob each call
//*     - If Alice - Bob < 0, Bob won
//*     - Else if Alice - Bob > 0, Alice won
//*     - Else, Alice - Bob === 0, so its a tie
//! Return the DIFFERENCE between (Alice - Bob) and (Bob - Alice) at each level
//*     - stoneSum - takeStones(j + 1)
//*         - (Alice - Bob) on depth 0, (Bob - Alice) on depth 1, (Alice - Bob) on depth 2 etc etc.
//*         - Ultimately, we only care about the return value of the FIRST call to takeStones()
//*     - By alternating between equations
//*         - We Maximize Alice's score from her perspective
//*         - And we Maximize Bob's score from HIS perspective

//* Apply Tabulation to avoid recursion overhead
//*     - Based on the memoization solution, we rely on "j + 1"
//!     - So iterate BACKWARDS to ensure prior subproblems are already calculated
//* Our current state only relies on the results of the previous 3 subproblems
//*     - So we can optimize space usage to be constant
function stoneGameIII(stoneValue) {
  if (stoneValue.length === 0) return 0;

  const n = stoneValue.length;

  //* dp[i] = Maximum value score we can get starting at index i
  //* We only rely on the previous 3 states
  const dp = new Array(3).fill(0);

  //* Subproblems rely on "j + 1", so we need to work backwards
  for (let i = n - 1; i >= 0; i--) {
    let stoneSum = 0;
    let maxScore = -Infinity;

    //* Try taking 1, 2 or 3 stones
    for (let j = i; j < Math.min(i + 3, n); j++) {
      stoneSum += stoneValue[j];

      //* Either (Alice - Bob) or (Bob - Alice) depending on whos turn it is
      maxScore = Math.max(maxScore, stoneSum - dp[(j + 1) % 3]);
    }

    dp[i % 3] = maxScore;
  }

  //* dp[0] gives us Alice's score; if this is > 0, Alice won
  const result = dp[0];

  if (result > 0) {
    return "Alice";
  } else if (result < 0) {
    return "Bob";
  } else {
    return "Tie";
  }
}

console.log(stoneGameIII([1, 2, 3, 7])); //* "Bob"
console.log(stoneGameIII([1, 2, 3, -9])); //* "Alice"
console.log(stoneGameIII([1, 2, 3, 6])); //* "Tie"
console.log(stoneGameIII([-50, 20])); //* "Bob"
console.log(stoneGameIII([1, 2, 3])); //* "Alice"
console.log(stoneGameIII([4, 5])); //* "Alice"
console.log(stoneGameIII([-10, 5])); //* "Bob"

//* Time: O(n) - There are "n" possible indices to iterate over
//* Within each loop, we do 3 inner loops in the worst case (constant)
//* It takes O(n) to create the DP array

//* Space: O(1) - We only rely on the previous 3 subproblem results
//* So the space usage remains constant regardless of input size
