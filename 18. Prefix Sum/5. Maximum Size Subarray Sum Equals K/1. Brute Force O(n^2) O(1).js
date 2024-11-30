//* Try every possible subarray and see if it sums to "k"
//! Note that we cannot immediately stop expanding a subarray just because sum > k
//*     - nums[i] can be negative, so we can't predict whether expanding will help or not
//*     - Expanding the subarray may or may not push us closer to the goal, so we have no choice BUT to expand
function maxSubarraySumEqualsK(nums, k) {
  //* There are no elements
  if (nums.length === 0) return 0;

  let maxLength = 0;

  //* Try every possible subarray
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      //* Found a valid subarray that sums to k
      if (sum === k) {
        //* j - i + 1 gives no. of elements in range
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }

  return maxLength;
}

console.log(maxSubarraySumEqualsK([1, -1, 5, -2, 3], 3)); //* 4
console.log(maxSubarraySumEqualsK([-2, -1, 2, 1], 1)); //* 2
console.log(maxSubarraySumEqualsK([0, 0, 0, 0, 0, 0], 0)); //* 6
console.log(maxSubarraySumEqualsK([1, 2, 3], 6)); //* 3
console.log(maxSubarraySumEqualsK([-1, 5, -4, 2, 3, 5], 11)); //* 5

//* Time: O(n^2) - We have a nested for loop, both of which scale with the input size
//* So the time taken scales quadratically

//* Space: O(1) - We are not using any extra space that will scale with the input size
