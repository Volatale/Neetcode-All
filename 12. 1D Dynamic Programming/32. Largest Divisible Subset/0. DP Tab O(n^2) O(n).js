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
  if (nums.length === 0) return 0;

  const n = nums.length;
  let longest = [];

  //* Sort the array so we only need to check for nums[i] % nums[j]
  nums.sort((a, b) => a - b);

  //* dp[i] = Largest divisible subset ending with nums[i]
  const dp = nums.map((_, i) => [nums[i]]);

  for (let i = 0; i < n; i++) {
    //* Include each element in its own subset

    //* Check all previous elements
    for (let j = 0; j < i; j++) {
      //* Element must be divisible by every other element in the subset
      if (nums[i] % nums[j] === 0 && dp[i].length < dp[j].length + 1) {
        dp[i] = [...dp[j], nums[i]];
      }
    }

    //* Potentially update the longest array
    if (dp[i].length > longest.length) {
      longest = dp[i];
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

//* Time: O(n^2) - We are doing two nested loops that both scale with "n"
//* Within the innermost loop, we are doing what "should" be an O(n) spread operation
//* However, the maximum subset size will be 32 if we just take factors of 2

//* Space: O(n) - The DP array's size scales with the input size
