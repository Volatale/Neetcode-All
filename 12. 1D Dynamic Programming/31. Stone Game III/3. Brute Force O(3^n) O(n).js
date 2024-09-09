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
function stoneGameIII(stoneValue) {
  function takeStones(i) {
    //* Base Case: There are no more stones to consider
    if (i === stoneValue.length) return 0;

    //* The maximum at this level
    let result = -Infinity;

    let stoneSum = 0;

    //* Try taking 1, 2 or 3 stones at each level (try every possibility)
    for (let j = i; j < Math.min(i + 3, stoneValue.length); j++) {
      stoneSum += stoneValue[j];

      //* Either (Alice - Bob) or (Bob - Alice) depending whos turn it is
      result = Math.max(result, stoneSum - takeStones(j + 1));
    }

    return result;
  }

  const result = takeStones(0);

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

//* Time: O(3^n) - At each level, we have 3 choices; take 1, 2 or 3 stones
//* Both players are playing OPTIMALLY, so we need to try every possible move and take the best
//* The height of the recursion tree is "n" since in the worst case there are "n" levels of calls

//* Space: O(n) - The space usage scales with the height of the tree
