//! Brute Force
//*     - Try every possible subarray
//*     - Track the cumulative sum of all elements in the subarray
//*     - Valid subarrays have a sum >= target
//*     - Track the maximum length so far
//*         - (j - i + 1) gives us the length of the subarray
//*     - Time Complexity is O(n^2) since it uses nested for loops
//*     - Space Complexity is O(1) -> memory usage remains constant regardless of input size
function minSubArrayLen(target, nums) {
  let minLength = Infinity; //* Assume we don't find a valid subarray

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      //* Include this element in the current subarray
      sum += nums[j];

      if (sum >= target) {
        minLength = Math.min(minLength, j - i + 1);
        break; //* No point checking further subarrays starting at "i"
      }
    }
  }

  //* If minLength < Infinity, we found a valid subarray
  return minLength < Infinity ? minLength : 0;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); //* 2
console.log(minSubArrayLen(4, [1, 4, 4])); //* 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); //* 0
console.log(minSubArrayLen(4, [2, 2, 4])); //* 1

//* Time: O(n^2) - We two nested for loops, both of which depend on the length of the input

//* Space: O(1) - The memory usage does not scale with the input size
