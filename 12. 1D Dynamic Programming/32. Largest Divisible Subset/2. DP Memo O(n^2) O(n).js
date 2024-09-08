//* At each level of recursion, we have two choices
//*     - Exclude the current element
//*     - Include the current element
//*         - Only if the "new" element is divisible by every element in our subset
//* If we have an array of elements sorted in DESCENDING order
//*     - [8, 4, 2]
//*     - if a % b = 0 and b % c = 0
//*         - Then we know a % c = 0 as well
//*     - 8 % 4 = 0, 4 % 2 = 0
//*         - So 8 % 2 = 0 as well
//! By sorting, we can take advantage of this logic
//*     - If nums[i] (current) % prev === 0
//*     - Then we know that nums[i] is divisible by every element in the subset

//* In this variation we assume the current element exists in the subarray
//*     - And we do a for loop to try and include every OTHER element
function largestDivisibleSubset(nums) {
  function findSubset(i, memo) {
    //* Base Case: No more elements to consider
    if (i === nums.length) return [];

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Assume the current element can fit
    let longest = [nums[i]];

    //* Try including every other value
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] % nums[i] !== 0) continue;

      const temp = [nums[i], ...findSubset(j, memo)];

      if (temp.length > longest.length) {
        longest = temp;
      }
    }

    memo[i] = longest;
    return longest;
  }

  //* Sort in ASCENDING order so we can always perform nums[i] % nums[prev]
  nums.sort((a, b) => a - b);

  const memo = {};
  let longest = [];

  //* Consider every starting position (prior values may limit future values)
  for (let i = 0; i < nums.length; i++) {
    const temp = findSubset(i, memo);

    if (temp.length > longest.length) {
      longest = temp;
    }
  }

  return longest;
}

console.log(largestDivisibleSubset([8, 4, 2])); //* [2, 4, 8]
console.log(largestDivisibleSubset([5, 10, 15])); //* [5, 10] or [5, 15]
console.log(largestDivisibleSubset([2, 7])); //* [2] or [7]
console.log(largestDivisibleSubset([1, 2, 3])); //* [1, 2] or [1, 3]
console.log(largestDivisibleSubset([1, 2, 4, 8])); //* [1, 2, 4, 8]
console.log(largestDivisibleSubset([9, 5, 1, 2, 3, 4, 6, 7, 8])); //* [1, 2, 4, 8]
console.log(largestDivisibleSubset([3, 4, 6, 9])); //* [3, 6]

//* Time: O(n^2) - We are memoizing the results of each call
//* We do an outer loop that scales with n, and an inner loop that also scales with n
//* Within each call, we do "n" calls in the worst case per level
//* But since we memoize the results, there are only n^2 possibilities
//* Sorting takes O(n log n) but this is dominated by the exponential time complexity

//* Space: O(n) - The depth of the recursion tree scales with "n"
//* The memo object stores "n" keys and values in the worst case
