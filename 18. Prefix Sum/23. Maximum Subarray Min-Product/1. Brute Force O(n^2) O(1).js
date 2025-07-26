//* Try every possible subarray and find the maximum min-product
//* For every subarray, calculate the sum and also track the minimum value within the array
function maxSumMinProduct(nums) {
  let maxProduct = 0;
  const MOD = 10 ** 9 + 7;

  //* Try every potential subarray
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    let min = Infinity;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      min = Math.min(min, nums[j]); //* Check if we have a new potential min

      //* Find the maximum min-product
      maxProduct = Math.max(maxProduct, sum * min);
    }
  }

  return maxProduct % MOD;
}

console.log(maxSumMinProduct([1, 2, 3, 2])); //* 14
console.log(maxSumMinProduct([2, 3, 3, 1, 2])); //* 18
console.log(maxSumMinProduct([3, 1, 5, 6, 4, 2])); //* 60

//* Time: O(n^2) - We have a pair of nested for loops, both of which scale with the input size

//* Space: O(1) - The memory usage remains constant regardless of the input size
