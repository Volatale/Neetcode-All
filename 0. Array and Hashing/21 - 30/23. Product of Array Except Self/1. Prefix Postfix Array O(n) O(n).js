//* Calculate the prefix product array in a forward pass
//* Calculate the postfix product array in a backward pass
//* Then, results[i] is the product of prefix[i - 1] * postfix[i + 1]
//* If we go out of bounds, assume the number to be 1 (to stay neutral)
function productExceptSelf(nums) {
  const prefix = [];
  const postFix = [];
  const results = [];

  //* Get the prefix array (loop forward)
  for (let i = 0; i < nums.length; i++) {
    const val = i - 1 < 0 ? 1 : prefix[i - 1];
    prefix[i] = val * nums[i];
  }

  //* Get the postfix array (loop backwards)
  for (let i = nums.length - 1; i >= 0; i--) {
    const val = i + 1 >= nums.length ? 1 : postFix[i + 1];
    postFix[i] = val * nums[i];
  }

  //* Calculate the results
  for (let i = 0; i < nums.length; i++) {
    const leftVal = i - 1 < 0 ? 1 : prefix[i - 1];
    const rightVal = i + 1 >= nums.length ? 1 : postFix[i + 1];
    results[i] = leftVal * rightVal;
  }

  return results;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]
console.log(productExceptSelf([2, 3, 4])); // [12, 8, 6]
console.log(productExceptSelf([5, 3])); // [3, 5]

//* Time: O(n) - We end up iterating over the entire array 3 times
//* Each loop scales with the length of the input, so it is linear time
//* O(3n) -> O(n)

//* Space: O(n) - The results, prefix and post arrays all scale proportionally with the input length
