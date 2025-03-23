//* A pair p1 is defined as pairs[i] = [a, b]
//* A pair p2 = [c, d] FOLLOWS a pair if:
//*     - b < c, or, alternatively
//*     - c > b
//* We want to return the LENGTH of the longest chain
//*     - There is no need to store information about the pairs themselves
//! We do not need to use all of the given pairs
//! And we can select the pairs in ANY ORDER we want
//* Sort the pairs based on their SECONDARY value in ascending order
//*     - Pairs with a smaller secondary value are easier to extend
//*     - For example, [a, b] can be extended by any pair [c > b, d]
//*         - Thus, [1, 2] can be extended by [3, d]
//*         - Whereas [1, 5] can only be extended by [6, d]
//*     - There are more numbers > 2 than numbers > 5, so the latter leaves us with LESS options
//* Now, the problem can be reduced to the regular Longest Increasing Subsequence problem
function findLongestChain(pairs) {
  //* We want the pairs (intervals) that END earlier first
  pairs.sort((a, b) => a[1] - b[1]);

  //* dp[i] = Max Length of a chain ENDING at index "i"
  const dp = new Array(pairs.length).fill(1);
  let longest = 1;

  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < pairs.length; j++) {
      if (pairs[i][0] > pairs[j][1]) {
        //* Include the current pair in the chain
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    longest = Math.max(longest, dp[i]);
  }

  return longest;
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

console.log(findLongestChain([[1, 5]])); //* 1

console.log(
  findLongestChain([
    [1, 2],
    [3, 4],
    [5, 6],
    [5, 5],
    [7, 7],
  ])
); //* 4

//* Time: O(n^2) - It takes O(n log n) to sort the pairs
//* Then, we have a pair of nested for loops, both of which scale with "n"

//* Space: O(n) - The dp array's size scales proportionally with the size of the input
