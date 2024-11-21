//* Check every possible subarray
function subarraySum(nums, k) {
  //* There are no elements
  if (nums.length === 0) return 0;

  let subarrays = 0;

  //* Calculate the sum of every possible subarray
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      //* Found a valid subarray
      if (sum === k) {
        subarrays++;
      }
    }
  }

  return subarrays;
}

console.log(subarraySum([1, 1, 1], 2)); //* 2
console.log(subarraySum([3, 0, 3], 3)); //* 4
console.log(subarraySum([1, 2, 3], 3)); //* 2
console.log(subarraySum([1, -1, 1], 0)); //* 2

//* Time: O(n^2) - We need to check all n * (n + 1) / 2 subarrays
//* So the time taken is quadratic

//* Space: O(1) - We are not using any extra space that scales with input size
