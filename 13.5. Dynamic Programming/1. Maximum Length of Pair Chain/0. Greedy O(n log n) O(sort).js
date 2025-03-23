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
//! However, instead of using a Dynamic Programming approach, we can use a greedy approach
//*     - The only information we need is the value of the previous pair's "b"
//* We essentially have a standard interval problem since we sorted the pairs based on "b" in ascending order
//*     - Activity Selection Problem
//* Ideally, we want to take as many successive intervals that end early
//*     - We know that intervals that END earlier are more likely to lead to a longer chain
function findLongestChain(pairs) {
  //* We want the pairs (intervals) that END earlier first
  pairs.sort((a, b) => a[1] - b[1]);

  //* In each chosen pair [a, b], the only info we need is "b"
  let end = pairs[0][1];
  let length = 1;

  for (let i = 1; i < pairs.length; i++) {
    //* The next pair's "b" must beat end
    if (pairs[i][0] > end) {
      end = pairs[i][1];
      length++;
    }
  }

  return length;
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

//* Time: O(n log n) - Sorting the pairs takes O(n log n), then we iterate over every pair - 1 (n - 1)

//* Space: O(sort) - The memory used to sort scales with the sorting algorithm used
