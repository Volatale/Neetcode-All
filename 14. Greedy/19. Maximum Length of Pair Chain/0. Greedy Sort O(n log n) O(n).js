//* Sort the intervals (pairs) by the SECOND value
//*         - So we ARE allowed to sort the input
//* Why sort?
//!     - There is no constraint on the ORDER we process them in
//*     - We are more likely to fit SHORTER interals than LONGER intervals
//* For example, [[1, 8], [2, 3], [4, 5]]
//*     - If we include [1, 8], the NEXT pair must be [9, n > 9]
//*         - The larger the second number, the lower the chance that we can extend the chain
//*     - If we were to start with [2, 3], the next pair need only be [4 , n > 4]
//*         - So essentially, we are MORE likely to be able to include CLOSER / SMALLER pairs
function findLongestChain(pairs) {
  //* Put the SHORTER intervals earlier since we can fit more of them
  pairs.sort((a, b) => a[1] - b[1]);

  let maxLength = 1; //* Minimum pairs is always 1
  let end = pairs[0][1]; //* Ending of first pair

  //* Iterate over every pair (skip first)
  for (let i = 1; i < pairs.length; i++) {
    //* If this chain comes after prev (we reversed the order)
    if (end < pairs[i][0]) {
      maxLength++;
      end = pairs[i][1]; //* Next pair must beat this value
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
    [1, 8],
    [4, 5],
    [2, 3],
  ])
);

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

//* Time: O(n log n) - It takes O(n log n) to sort the pairs
//* Then, it takes O(n) to iterate through all of the pairs

//* Space: O(n) - Sorting naturally uses O(n) space (if merge sort is used)
