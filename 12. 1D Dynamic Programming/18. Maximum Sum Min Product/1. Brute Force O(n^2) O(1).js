//! Numerical Precision Problems, doesn't work

//* Try every subarray
//* Track the minimum value found within each subarray
//* Multiply that by the sum of elements in the subarray
function maxSumMinProduct(nums) {
  let maxProduct = 0;

  //* Try every subarray and take the maximum
  for (let i = 0; i < nums.length; i++) {
    let minValue = Infinity;
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      minValue = Math.min(nums[j], minValue);
      sum += nums[j];
      maxProduct = Math.max(maxProduct, minValue * sum);
    }
  }

  return maxProduct % (10 ** 9 + 7);
}

console.log(maxSumMinProduct([1, 2, 3, 2])); //* 14
console.log(maxSumMinProduct([1])); //* 1
console.log(maxSumMinProduct([2, 3, 3, 1, 2])); //* 18
console.log(maxSumMinProduct([4, 4, 4])); //* 48
console.log(maxSumMinProduct([3, 1, 5, 6, 4, 2])); //* 60

//* Time: O(n^2) - The number of subarrays is n * (n + 1) / 2
//* So the time complexity is exponential

//* Space: O(1) - We only use constant space variables
