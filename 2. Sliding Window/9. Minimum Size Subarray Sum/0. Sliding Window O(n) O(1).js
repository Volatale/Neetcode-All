//* Take a sliding window of variable size
//* Keep increasing the window of values while sum < target
//* While sum >= target, we have found a valid subarray
//* Record the number of values within the window (end - start + 1)
//* Then subtract the leftmost element in the window from the sum (to remove it from the window)
function minimumSizeSubarraySum(target, nums) {
  let start = 0;
  let end = 0;

  let sum = 0;
  let minLength = Infinity; //* Infinity can be beaten by any value, we can't start at 0

  while (end < nums.length) {
    sum += nums[end];

    //* If the sum >= target, we don't need to add any more values
    //* Adding more values beyond this does not help us, it gets us further from the goal
    while (sum >= target) {
      minLength = Math.min(minLength, end - start + 1);
      sum -= nums[start++];
    }

    end++;
  }

  //* We return 0 if we didn't find a subarray >= sum
  return minLength < Infinity ? minLength : 0;
}

console.log(minimumSizeSubarraySum(7, [2, 3, 1, 2, 4, 3])); //* 2
console.log(minimumSizeSubarraySum(4, [1, 4, 4])); //* 1
console.log(minimumSizeSubarraySum(11, [1, 1, 1, 1, 1, 1, 1, 1])); //* 0
console.log(minimumSizeSubarraySum(1, [5, 4, 3])); //* 1
console.log(minimumSizeSubarraySum(10, [10])); //* 1

//* Time: O(n) - The time taken to iterate through the array scales with the length of the input

//* Space: O(1) - We don't use any space that scales with the input size
