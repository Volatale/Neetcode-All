//* Find the MINIMAL LENGTH of a subarray whose sum >= target
//* If there isn't one, we need to return 0
//* The order of the elements matters here, so we cannot sort the array
//* We should pessimistically assume its impossible to find a subarray that sums to target
//* Then, when we are returning from the function, we can return 0 if "minLength" === Infinity
//! The key here is that the array contains POSITIVE integers only
//* Therefore, we know that the sum can only ever increase (any value < 1 is not present in the array)
//* We can use a (dynamic) sliding window approach instead of a brute force approach
//* If the sum of the window is >= target, then just record the value
//*     - We want the MINIMUM size vaid subarray, so extending does not help our case
//* Otherwise, we need to keep extending the window
function minSubArrayLen(target, nums) {
  let start = 0;
  let end = 0;

  //* Assume its impossible to find a valid subarray
  let minLength = Infinity;
  let sum = 0;

  while (end < nums.length) {
    //* Add the element to the window
    sum += nums[end];

    //* If the sum >= target, we don't need to add any more values (shrink the window)
    while (sum >= target) {
      minLength = Math.min(minLength, end - start + 1);
      sum -= nums[start++];
    }

    end++;
  }

  //* If minLength is infinity, we did not find a valid subarray
  return minLength < Infinity ? minLength : 0;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); //* 2
console.log(minSubArrayLen(4, [1, 4, 4])); //* 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); //* 0
console.log(minSubArrayLen(1, [5, 4, 3])); //* 1
console.log(minSubArrayLen(10, [10])); //* 1

//* Time: O(n) - The time taken scales with the input size (n)

//* Space: O(1) - The memory usage remains constant regardless of input size
