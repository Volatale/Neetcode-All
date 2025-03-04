//* We don't need to do the second iteration, we can instead use math
//* We have the formula (m = max value in nums, k = k)
//*     - m + (m + 1) + (m + 2) + ... + (m + k - 1)
//* So if m = 5, and k = 3, then we can make the following observation:
//!     - There are 3 iterations of the arithmetic series
//!     - We add a constant k - 1 times (m + 1) + (m + 2) etc.
//* Break up the formula into two parts
//*     - There are "m" iterations of the series
//*         - So we get (k * m)
//*     - There are k - 1 constants to add
//*         - Arithmetic series is: n * (n + 1) / 2
//* Once again, lets say m = 5 and k = 3
//*     - (k * m) = 15 (3 * 5)
//*     - (k - 1) = 2 (3 - 1)
//*         - (k * (k - 1) / 2) = 3
//* So in total, we get 18
//*     - 15 + 3 = 18
//*     - (k * m) + (k * (k - 1) / 2) = 18
function maximizeSum(nums, k) {
  //* Result = m + (m + 1) + (m + 2) + ... + (m + k - 1)
  //* m occurs k times, and then we add the sum of n natural numbers up to k - 1
  return k * Math.max(...nums) + (k * (k - 1)) / 2;
}

console.log(maximizeSum([1, 2, 3, 4, 5], 3)); //* 18
console.log(maximizeSum([5, 5, 5], 2)); //* 11
console.log(maximizeSum([1], 5)); //* 15

//* Time: O(n) - It takes O(n) to get the maximum element
//* The formula computes in O(1) time

//* Space: O(1) - The memory usage remains constant regardless of the input size
