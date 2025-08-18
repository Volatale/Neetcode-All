//* We have an array of pairs envelopes where [i] = [w_i, h_i]
//*     - Where `w_i` represents the WIDTH
//*     - And Where `h_i` represents the HEIGHT
//* An envelope can fit into another if BOTH the width and height of one is > the other
//!     - Or alternatively, if one envelope's width and height are less than the other
//* Our goal is to return the MAXIMUM number of envelopes we can stack
//* Logically speaking, the problem devolves into Longest Increasing Subsequence
//* It is fundamentally a dynamic programming problem
//* dp[i] = The maximum number of stacked envelopes unto and including index i
//*     - dp[3] = maximum no. of stacked envelopes from [0...3]
//! Sort the pairs based on their width, and then their height as a fallback
//*     - Specifically, the heights should be sorted in DESCENDING order
//*     - This eliminates the following possibility
//*         - [[6, 4], [6, 7]] -> 2
//*     - It should in fact be:
//*         - [[6, 7], [6, 4]] -> 1
//!         - We are ASSUMING the width is fine, but 6 === 6
//*         - Therefore, we need a "defence mechanism" to prevent the above situation
//* After sorting, we can avoid focusing on the width and solely focus on the heights
//*     - Thus, the dimensionality of the problem reduces to 1
function maxEnvelopes(envelopes) {
  //* The max no.of stacked envelopes in an array of one is 1
  if (envelopes.length === 1) return 1;

  //* Sort based on width in ASC, then height in DESC in the case of ties
  envelopes.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });

  //* dp[i] = Max No. of nested envelopes in the range [0...i] inclusive
  const dp = new Array(envelopes.length).fill(1);
  let maxNested = 1;

  for (let i = 0; i < envelopes.length; i++) {
    for (let j = 0; j < i; j++) {
      //* Add this envelope to the current subsequence
      if (envelopes[i][1] > envelopes[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    maxNested = Math.max(maxNested, dp[i]);
  }

  return maxNested;
}

console.log(
  maxEnvelopes([
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3],
  ])
); //* 3

console.log(
  maxEnvelopes([
    [1, 1],
    [1, 1],
    [1, 1],
  ])
); //* 1

console.log(
  maxEnvelopes([
    [1, 3],
    [4, 5],
  ])
); //* 2

console.log(maxEnvelopes([[6, 6]])); //* 1

console.log(
  maxEnvelopes([
    [1, 3],
    [2, 4],
    [3, 6],
    [1, 4],
    [2, 5],
    [10, 12],
  ])
); //* 4

console.log(
  maxEnvelopes([
    [1, 3],
    [3, 5],
    [6, 7],
    [6, 8],
    [8, 4],
    [9, 5],
  ])
); //* 3

console.log(
  maxEnvelopes([
    [2, 3],
    [4, 8],
    [4, 6],
    [3, 7],
  ])
); //* 3

//* Time: O(n^2) - The time taken scales quadratically with the input size

//* Space: O(n) - The memory usage scales with the input size
