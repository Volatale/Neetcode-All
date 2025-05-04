//* The goal is to find the "pivot" index in the array
//*     - In other words, we have an array nums
//*     - And we want to find two subarrays [0:i], [i+1:n] such that they have the same sum
//* If we do this in a brute force manner, we end up recalcuating the same sums repeatedly
//* Instead of doing that, we can observe the fact that this essentially involves prefix sums
//* So if we precompute the sums ahead of time, we can get the correct subarray sums in O(1) time
function pivotIndex(nums) {
  const n = nums.length;
  const prefixSum = new Array(n).fill(0);
  prefixSum[0] = nums[0];

  //* Create the prefix sum array
  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }

  //* Find the pivot index
  for (let i = 0; i < n; i++) {
    const leftSum = i > 0 ? prefixSum[i - 1] : 0;
    const rightSum = prefixSum[n - 1] - prefixSum[i];

    //* Found the pivot index
    if (leftSum === rightSum) return i;
  }

  //* There is no pivot index
  return -1;
}

console.log(pivotIndex([1, 1, 1, 1, 1])); //* 2
console.log(pivotIndex([1, 7, 3, 6, 5, 6])); //* 3
console.log(pivotIndex([1, 2, 3])); //* -1
console.log(pivotIndex([-1])); //* 0
console.log(pivotIndex([2, 1, -1])); //* 0

//* Time: O(n) - The time taken scales with the input size

//* Space: O(n) - The prefix sum array has "n" length
