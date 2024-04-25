//* Test every subarray for a window of values that sum to >= target
//* The moment we find a subarray >= sum, just break
//* Adding more values does not help us, it only increases the subaray size, which we don't want
function minimumSizeSubarraySum(target, nums) {
  //* Infinity can be beaten by any value, we can't start at 0
  let minLength = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        //* j - i + 1 is the window size
        minLength = Math.min(minLength, j - i + 1);
        break;
      }
    }
  }

  //* If minLength === Infinity, we didn't find a subarray >= target
  return minLength < Infinity ? minLength : 0;
}

console.log(minimumSizeSubarraySum(7, [2, 3, 1, 2, 4, 3])); //* 2
console.log(minimumSizeSubarraySum(4, [1, 4, 4])); //* 1
console.log(minimumSizeSubarraySum(11, [1, 1, 1, 1, 1, 1, 1, 1])); //* 0
console.log(minimumSizeSubarraySum(1, [5, 4, 3])); //* 1
console.log(minimumSizeSubarraySum(10, [10])); //* 1

//* Time: O(n^2) - We have nested for loops, both of whom depend on the length of the input

//* Space: O(1) - We use no extra space that scales with the input size
