//* Find the MINIMAL LENGTH of a subarray whose sum >= target
//* If there isn't one, we need to return 0
//* The order of the elements matters here, so we cannot sort the array
//* We should pessimistically assume its impossible to find a subarray that sums to target
//* Then, when we are returning from the function, we can return 0 if "minLength" === Infinity
//* In a brute force manner, we can try every possible subarray
//! The key here is that the array contains POSITIVE integers only
//* Therefore, we know that the sum can only ever increase (any value < 1 is not present in the array)
function minSubArrayLen(target, nums) {
  //* Assume its impossible to find a valid subarray
  let minLength = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      //* Add this element to subarray
      sum += nums[j];

      //* Found a valid subarray
      if (sum >= target) {
        minLength = Math.min(minLength, j - i + 1);
        break; //* Why break? Because extending the subarray does not help
      }
    }
  }

  //* If minLength is infinity, we did not find a valid subarray
  return minLength < Infinity ? minLength : 0;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); //* 2
console.log(minSubArrayLen(4, [1, 4, 4])); //* 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); //* 0
console.log(minSubArrayLen(1, [5, 4, 3])); //* 1
console.log(minSubArrayLen(10, [10])); //* 1

//* Time: O(n^2) - We are using a pair of nested loops, both of which scale with "n" in the worst case

//* Space: O(1) - The memory usage remains constant regardless of input size
