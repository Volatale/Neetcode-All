//* In a brute force manner, try every possible subarray
//*     - Average = sum / k
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
//* j - i + 1 gives us the number of elements in the current subarray
function numOfSubarrays(nums, k, threshold) {
  let subarrays = 0;

  //* Average = sum / k. Multiplication is the inverse of division: sum >= k * threshold
  let thresholdToBeat = k * threshold;

  //* Try every possible subarray
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      //* If the subarray size === k, and we have a valid subarray
      if (j - i + 1 === k && sum >= thresholdToBeat) {
        subarrays++;
      }
    }
  }

  return subarrays;
}

console.log(numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)); //* 3
console.log(numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5)); //* 6

//* Time: O(n^2) - We have a nested for loop, both of which scale with nums.length (n)
//* So the time taken is quadratic

//* Space: O(1) - We are not using any additional space that scales with the input size (n)
