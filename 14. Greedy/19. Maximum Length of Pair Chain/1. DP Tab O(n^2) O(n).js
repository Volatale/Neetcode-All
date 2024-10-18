//* For each pair at index i
//*     - Look at all of the previous pairs (j < i)
//*     - And check if we can extend the chain
//* This logic is analogous to the Longest Increasing Subsequence approach

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (i, prev)
//*     - There is no need to cache both states (a, b)
//*         - The only LIMITING factor on whether we can include elements is b
//*         - If c > b, then c will ALSO be greater than a
//*             - We were already told b > a
function findLongestChain(pairs) {
  const n = pairs.length;

  //* Sort the pairs in ASCENDING order based on index 0 (a)
  pairs.sort((a, b) => a[0] - b[0]);

  //* dp[i] = Length of longest chain ENDING at "i" (don't track j state)
  const dp = new Array(n).fill(1);
  let maxLength = 1;

  //* Iterate over all pairs
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      //* If pairs[i] can follow pairs[j], extend dp[i]
      if (pairs[j][1] < pairs[i][0]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }

      //* Potentially update new max
      maxLength = Math.max(maxLength, dp[i]);
    }
  }

  return maxLength;
}

console.log(
  findLongestChain([
    [1, 2],
    [2, 3],
    [3, 4],
  ])
); //* 2

console.log(
  findLongestChain([
    [1, 2],
    [7, 8],
    [4, 5],
  ])
); //* 3

console.log(
  findLongestChain([
    [1, 2],
    [2, 3],
    [1, 2],
    [4, 5],
  ])
); //* 2

console.log(
  findLongestChain([
    [10, 20],
    [15, 19],
  ])
); //* 1

console.log(
  findLongestChain([
    [-10, -8],
    [8, 9],
    [-5, 0],
    [6, 10],
    [-6, -4],
    [1, 7],
    [9, 10],
    [-4, 7],
  ])
); //* 4

//* Time: O(n^2) - There are "n" possible values for "i"
//* And in the worst case, "n" possible values for prev
//* If we manage to include every pair, there are "n" possible prev in total
//* Sorting the pairs takes O(n log n)

//* Space: O(n) - We only keep one row in memory at the same time
//* Sorting naturally uses O(n) memory (if merge sort is used)
