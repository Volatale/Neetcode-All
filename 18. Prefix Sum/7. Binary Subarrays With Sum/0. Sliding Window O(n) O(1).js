//* No. of Subarrays that sum to Exactly(k)
//*     - Is equal to the number of subarrays that sum to AT MOST k
//*     - Minus the number of subarrays that sum to AT MOST k - 1

//* Instead of checking every individual subarray in a brute force manner
//* We can use a sliding window approach
//* Why Sliding Window?
//!     - The sliding window invariant states that if we have a valid window
//*       a (contiguous) sub-window of that window should ALSO be valid
//*     - If we have [0, 0, 0] and goal = 0
//*         - Then there are 6 subarays that sum to goal
//*         - If start = 0 and end = 2, then we know there are 3 elements WITHIN the window
//*             - 2 - 0 + 1 = 3 elements in the window / range
//*         - But we ALSO know that the sub-windows within this range are valid
//*             - So we count them too
//*     - Hence, we can use a sliding window approach to avoid recomputing subarray sums repeatedly
function numSubarraysWithSum(nums, goal) {
  //* Exactly(k) = atMost(k) - atMost(k - 1)
  return atMost(nums, goal) - atMost(nums, goal - 1);
}

function atMost(nums, k) {
  //* nums[i] is either 0 or 1, so we can't have a subarray that sums to -1 (if goal = 0, k could be -1)
  if (k < 0) return 0;

  //* Sliding Window
  let start = 0;
  let end = 0;

  let subarrays = 0;
  let sum = 0;

  while (end < nums.length) {
    //* Add element to window
    sum += nums[end];

    //* Shrink window if necessary - remove the element at index "start" from the window
    while (sum > k) {
      sum -= nums[start++];
    }

    //* A valid window (subarray) means all of the sub-windows (subarrays) are ALSO valid, otherwise the window would shrink
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(numSubarraysWithSum([1, 0, 1, 0, 1], 2)); //* 4
console.log(numSubarraysWithSum([0, 0, 0], 0)); //* 6
console.log(numSubarraysWithSum([0, 0, 0, 0, 0], 0)); //* 15
console.log(numSubarraysWithSum([1, 1, 1], 1)); //* 3

//* Time: O(n) - We iterate through the entire array twice technically, but each call takes O(n)
//* O(2n) -> O(n), so the time taken is linear

//* Space: O(1) - We are not using any additional space that will scale with the input size
