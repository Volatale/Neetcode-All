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

//* Apply memoization to avoid redundant work
//!     - We only have one non-constant parameter; "i"
//*     - Regardless of whos turn it is, the maximum from this stack frame will be the same
//*         - As in, the sum of stones [1, 2, 3], for example, is the same no matter whos turn it is
//*         - So we can get away with just caching the index
function stoneGameIII(stoneValue) {
  function takeStones(i, memo) {
    //* Base Case: There are no more stones to consider
    if (i === stoneValue.length) return 0;

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* The maximum at this level
    let result = -Infinity;

    let stoneSum = 0;

    //* Try taking 1, 2 or 3 stones at each level (try every possibility)
    for (let j = i; j < Math.min(i + 3, stoneValue.length); j++) {
      stoneSum += stoneValue[j];

      //* Either (Alice - Bob) or (Bob - Alice) depending whos turn it is
      result = Math.max(result, stoneSum - takeStones(j + 1, memo));
    }

    memo[i] = result;
    return result;
  }

  const result = takeStones(0, {});

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

//* Time: O(n) - We are memoizing the results of each subproblem
//* In reality, there are 3^n calls in the worst case, but we only have "n" possible indices
//* So the time complexity is reduced to O(n)

//* Space: O(n) - The space usage scales with the height of the tree
