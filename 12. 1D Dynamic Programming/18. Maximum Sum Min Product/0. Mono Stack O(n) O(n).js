//! Numerical Precision Problems, doesn't work

//* Use a monotonically non-decreasing stack
//* Store the sum of each successive element in a prefix array
//* Keep pushing elements to the stack
//* When we find an element < top of the stack
//*     - Keep popping and use the prefix array to calculate the product
function maxSumMinProduct(nums) {
  if (nums.length === 0) return 0;

  const MOD = 10 ** 9 + 7;
  let maxProduct = 0;
  const stack = [];
  const dp = new Array(nums.length + 1).fill(0);

  //* Calculate the prefix sum array
  for (let i = 0; i < nums.length; i++) {
    dp[i + 1] = dp[i] + nums[i];
  }

  //* Iterate over the array
  for (let i = 0; i <= nums.length; i++) {
    while (
      stack.length > 0 &&
      (i === nums.length || nums[stack[stack.length - 1]] > nums[i])
    ) {
      const j = stack.pop();
      const leftIndex = stack.length === 0 ? 0 : stack[stack.length - 1] + 1;
      const subarraySum = dp[i] - dp[leftIndex];
      const minProduct = BigInt(nums[j]) * BigInt(subarraySum);
      maxProduct =
        BigInt(maxProduct) > minProduct ? BigInt(maxProduct) : minProduct;
    }

    stack.push(i);
  }

  return Number(maxProduct % BigInt(MOD));
}

console.log(maxSumMinProduct([4, 5, 2]));
console.log(maxSumMinProduct([1, 2, 3, 2])); //* 14
console.log(maxSumMinProduct([1])); //* 1
console.log(maxSumMinProduct([2, 3, 3, 1, 2])); //* 18
console.log(maxSumMinProduct([4, 4, 4])); //* 48
console.log(maxSumMinProduct([3, 1, 5, 6, 4, 2])); //* 60

//* Time: O(n) - It takes O(n) to iterate through the entire nums array
//* The inner loop only triggers "n" times at most

//* Space: O(n) - In the worst case, every element is stored in the stack
