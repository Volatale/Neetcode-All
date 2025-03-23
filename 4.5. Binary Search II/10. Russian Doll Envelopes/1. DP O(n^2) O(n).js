//* We want to use a SMALL (width, height) envelope as a BASE
//* Then, we want to find LARGER envelopes to put the previous envelope(s) into
//* The goal is to find the maximum number of nestings we can do
//! So one way to view the problem is to find the LONGEST INCREASING SUBSEQUENCE
//*     - The main difference is that we have two dimensions to work with instead of just one
//* Similarly to the regular LIS problem, we can use Dynamic Programming
//*     - But since the array is not inherently monotonically increasing OR decreasing
//!     - We need to SORT the array somehow before doing anything
//* If two envelopes have the same width, sort them by height in DESCENDING order
//*     - Why? Because otherwise we may count multiple envelopes with the same width as part of the same subsequence
//* Take this example: [[2, 3], [3, 7], [4, 6], [4, 8]]
//!     - We are not allowed to add multiple envelopes with the SAME WIDTH within the SAME SUBSEQUENCE
//*         - So by sorting the HEIGHTS in descending order, we eliminate that possibility
//*     - We'd end up with the incorrect result if we proceeded with the current envelope ordering
//* Sorting properly would give us: [[2, 3], [3, 7], [4, 8], [4, 6]]
//*     - Now we know the latter elements are larger in some way (either by width or height)
//*         - So the envelopes are sorted in a monotonically increasing order
//*     - AND we also know that we won't accidently add an envelope with the same with to the current subsequence
//* After sorting, we can simply focus on find the HEIGHTS
//*     - This reduces the dimensionality to only 1
//* The problem has now been reduced to regular LIS
//* Every previous envelope is likely to be able to fit into the previous (excluding the same-width envelopes)
function maxEnvelopes(envelopes) {
  //* There is only ONE envelope
  if (envelopes.length === 1) return 1;

  //* Sort based on height DESC if widths are equal (prevents adding multiple envs with the same width)
  envelopes.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });

  //* dp[i] = Max No. of Nested Envelopes we can get up to and including index "i"
  const dp = new Array(envelopes.length).fill(1);
  let maxNested = 1;

  for (let i = 0; i < envelopes.length; i++) {
    for (let j = 0; j < i; j++) {
      //* Add this envelope to the current subsequence
      if (envelopes[i][1] > envelopes[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        maxNested = Math.max(maxNested, dp[i]);
      }
    }
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

//* Time: O(n^2) - It takes O(n log n) to sort the envelopes
//* Then, we have a pair of nested loops, both of which scale with input size (n)

//* Space: O(n) - The memory for sorting scales with the sorting algorithm used
//* The dp array scales in size proportionally with "n"
