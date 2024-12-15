//* Average = sum / k
//* For a VALID subarray, we need:
//*     - sum / k >= threshold
//! Multiplication is the inverse of division
//*     - If we multiply both sides by K, we retain the direction of the inequality
//!     - Multiplication uses less CPU cycles than division
//*         - The alternative is calculating the average per subarray (there are n^2 subarrays in total)
//*           versus just calculating the new threshold once and comparing
//* So we have the following equations:
//*     - sum / k >= threshold
//*     - sum >= k * threshold
//* Instead of a brute force approach, we can use sliding window
//!     - nums[i] is always >= 1, thus we have an element of monotonicity
//*         - Expanding the window will always increase the sum
//*         - Decreasing the window will always decrease the sum
//*     - We specifically want a subarray of size K, so this works well with a fixed size sliding window
//*         - If end - start + 1 === k, then we have POTENTIAL valid subarray
//*         - Then we just check if the sum >= threshold
function numOfSubarrays(arr, k, threshold) {
  let sum = 0;
  let subarrays = 0;

  //* Average = sum / k. Multiplication is the inverse of division: sum >= k * threshold
  let thresholdToBeat = k * threshold;

  //* Sliding Window
  let start = 0;
  let end = 0;

  //* Try every possible subarray
  while (end < arr.length) {
    sum += arr[end];

    //* Subarray is size K
    if (end - start + 1 === k) {
      //* Found valid subarray
      if (sum >= thresholdToBeat) {
        subarrays++;
      }

      //* Left element is leaving window
      sum -= arr[start++];
    }

    end++;
  }

  return subarrays;
}

console.log(numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)); //* 3
console.log(numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5)); //* 6

//* Time: O(n) - We have to iterate through the entire array

//* Space: O(1) - We are not using any additional space that scales with the input size (n)
