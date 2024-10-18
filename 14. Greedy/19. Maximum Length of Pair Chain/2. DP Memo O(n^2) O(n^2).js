//* At each step, we have two choices
//*     - Include the current element
//*     - Or, exclude it
//* Logically, we should sort the arrays to ensure we can fairly check every pair
//*     - Sort based on index 0 in ascending order
//!     - If we don't sort, it is harder to guarantee that we checked every possibility
//* This problem is extremely similar to Longest Increasing Subsequence
//*     - Except we compare PAIRS instead of individual values

//* Apply memoization to avoid redundant work
//*     - We have 2D state (i, prev)
//*     - There is no need to cache both states (a, b)
//*         - The only LIMITING factor on whether we can include elements is b
//*         - If c > b, then c will ALSO be greater than a
//*             - We were already told b > a
function findLongestChain(pairs) {
  function findChains(i, prev, memo) {
    //* There are no more pairs
    if (i === pairs.length) return 0;

    //* Utilize memoized value
    const key = `${i}-${prev}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let longest = 0;

    if (prev === -Infinity || pairs[i][0] > prev) {
      //* Include current element
      longest = Math.max(longest, findChains(i + 1, pairs[i][1], memo) + 1);
    } else {
      //* Exclude current element
      longest = Math.max(longest, findChains(i + 1, prev, memo));
    }

    return (memo[key] = longest);
  }

  //* Sort the pairs in ASCENDING order based on index 0 (a)
  pairs.sort((a, b) => a[0] - b[0]);

  //* We only need to track "b" and compare with "c"
  return findChains(0, -Infinity, {});
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

//* Time: O(n^2) - There are "n" possible values for "i"
//* And in the worst case, "n" possible values for prev
//* If we manage to include every pair, there are "n" possible prev in total
//* Sorting the pairs takes O(n log n)

//* Space: O(n^2) - There are n^2 unique subproblems, thus n^2 results to cache
//* The height of the recursion tree scales with "n"
//* There are "n" pairs to make a choice for
//* Generally, sorting uses O(n) space due to merge sort
