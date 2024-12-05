//* Use reverse thinking
//* Find the maximum length subarray whose sum = sum - x
//*     - Remove that subarray from the original (input) array
//* This leaves us with the elements that should be removed
//*     - To get the length of this array, we can use a formula:
//*     - operations = length of original array - maximum length subarray
//* Essentially, we are deriing the answer instead of computing it directly
//* Use a sliding window approach to calculate the length of the subarray
//*     - A variable is used to track the sum of elements within the window
//!     - If sum > target, then we need to shrink the window

//! In order to MINIMIZE something, we need to maximize something else
//*     - In our case, we want to minimize the number of operations needed to reduce "x" to 0
//*     - This implies we need to MAXIMIZE the length of the subarray we DON'T remove
//* So if we get the (maximum) length of the subarray that sums to "sum - x"
//*     - We can subtract this from nums.length to get the number of elements we need to remove
//!     - The number of elements we need to remove is whatever is left over after this removal
function minOperations(nums, x) {
  //* Why -x? target = sum - x, so subtract x immediately
  let target = -x;

  //* Get the sum of all elements
  for (let i = 0; i < nums.length; i++) {
    target += nums[i];
  }

  //* Target is negative; can't reduce x
  if (target < 0) return -1;

  //* Sliding Window
  let start = 0;
  let end = 0;

  //* Tracks sum of elements in window
  let sum = 0;
  let maxLength = -1;

  while (end < nums.length) {
    sum += nums[end];

    //* Shrink window if sum > target
    while (sum > target && start <= end) {
      sum -= nums[start++];
    }

    //* Found valid (maximum) subarray
    if (sum === target) {
      maxLength = Math.max(maxLength, end - start + 1);
    }

    end++;
  }

  //* No. of Operations = length - maxLength (leaves only the elements that are removed)
  return maxLength === -1 ? -1 : nums.length - maxLength;
}

console.log(minOperations([1, 1, 4, 2, 3], 5)); //* 2
console.log(minOperations([5, 6, 7, 8, 9], 4)); //* -1
console.log(minOperations([3, 2, 20, 1, 1, 3], 10)); //* 5
console.log(minOperations([5, 2, 3, 1, 1], 5)); //* 1

//* Time: O(n) - It takes O(n) to calculate target, and it also takes O(n) to find the subarray to remove

//* Space: O(1) - We are not using any additional space that will scale with the input size
