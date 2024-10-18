//* At each step, we have two choices
//*     - Include the current element
//*     - Or, exclude it
//* Logically, we should sort the arrays to ensure we can fairly check every pair
//*     - Sort based on index 0 in ascending order
//!     - If we don't sort, it is harder to guarantee that we checked every possibility
//* This problem is extremely similar to Longest Increasing Subsequence
//*     - Except we compare PAIRS instead of individual values
function findLongestChain(pairs) {
  function findChains(i, prev) {
    //* There are no more pairs
    if (i === pairs.length) return 0;

    let longest = 0;

    if (prev === -Infinity || pairs[i][0] > prev) {
      //* Include current element
      longest = Math.max(longest, findChains(i + 1, pairs[i][1]) + 1);
    } else {
      //* Exclude current element
      longest = Math.max(longest, findChains(i + 1, prev));
    }

    return longest;
  }

  //* Sort the pairs in ASCENDING order based on index 0 (a)
  pairs.sort((a, b) => a[0] - b[0]);

  //* We only need to track "b" and compare with "c"
  return findChains(0, -Infinity);
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

//* Time: O(2^n) - We have two choices at each step
//* Include or exclude the current pair
//* Sorting the array takes O(n log n)

//* Space: O(n) - The height of the recursion tree scales with "n"
//* There are "n" pairs to make a choice for
//* Generally, sorting uses O(n) space due to merge sort
