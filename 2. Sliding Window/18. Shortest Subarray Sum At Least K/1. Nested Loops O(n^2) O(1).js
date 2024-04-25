//* Check every subarray
//* Any lower value can beat infinity
//* But a subarray cannot be 0 size, so we can't start at 0
//* If we find a subarray that sums to >= k, then take the length of it
//* Then break out of the inner loop; adding more values at this point does not help
function shortestSubarraySumWithAtLeastK(nums, k) {
  let minLength = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= k) {
        minLength = Math.min(minLength, j - i + 1); //* j - i + 1 gives subarray size
        break; //* No point adding more values now
      }
    }
  }

  return minLength < Infinity ? minLength : -1;
}

console.log(shortestSubarraySumWithAtLeastK([1], 1)); //* 1
console.log(shortestSubarraySumWithAtLeastK([1, 2], 4)); //* -1
console.log(shortestSubarraySumWithAtLeastK([2, -1, 2], 3)); //* 3

//* Time: O(n^2) - We have a nested for loop, both of whom depend on the input size

//* Space: O(1) - We don't use any space that scales with the input size
