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
function largestDivisibleSubset(nums) {
  function findSubset(i, prev) {
    //* Base Case: No more elements to consider
    if (i === nums.length) return [];

    //* Case 1: Exclude current element
    let longest = findSubset(i + 1, prev);

    //* Case 2: Include current element
    if (nums[i] % prev === 0) {
      let temp = [nums[i], ...findSubset(i + 1, nums[i])];

      if (temp.length > longest.length) {
        longest = temp;
      }
    }

    return longest;
  }

  //* Sort in ASCENDING order so we can always perform nums[i] % nums[prev]
  nums.sort((a, b) => a - b);

  //* Prev = 1 because n % 1 is always 0
  return findSubset(0, 1);
}

console.log(largestDivisibleSubset([8, 4, 2])); //* [2, 4, 8]
console.log(largestDivisibleSubset([5, 10, 15])); //* [5, 10] or [5, 15]
console.log(largestDivisibleSubset([2, 7])); //* [2] or [7]
console.log(largestDivisibleSubset([1, 2, 3])); //* [1, 2] or [1, 3]
console.log(largestDivisibleSubset([1, 2, 4, 8])); //* [1, 2, 4, 8]
console.log(largestDivisibleSubset([9, 5, 1, 2, 3, 4, 6, 7, 8])); //* [1, 2, 4, 8]
console.log(largestDivisibleSubset([3, 4, 6, 9])); //* [3, 6]

//* Time: O(2^n) - Each call generates 2 more calls in the worst case
//* The depth of the recursion tree scales with "n" since we transition the state by 1 each call
//* Within each call, we also do O(n) worth of work in the worst case (spread operator)
//* But the maximum subset size we can have is 32, so the work done by the spread operator is bounded by 32 (constant)

//* Space: O(n) - The depth of the recursion tree scales with "n"
//* At each level, we store an array, which could be of equal length to the input in the worst case
//* But these arrays are not kept in memory simultaneously
