//* Calculate the prefix, starting from 1
//*     - The prefix variable represents the product of all numbers prior to "i"
//* Set result[i] = the product of all the numbers before the current index
//* Then multiply the prefix by the current element in nums[i]
//* Do the same for the postfix, but going backward (since it is a postfix)
function productExceptSelf(nums) {
  const result = [];
  let prefix = 1;

  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let post = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= post;
    post *= nums[i];
  }

  return result;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]
console.log(productExceptSelf([2, 3, 4])); // [12, 8, 6]
console.log(productExceptSelf([5, 3])); // [3, 5]

//* Time: O(n) - We iterate through the array twice, which ends up being O(2n)
//* Simplified, that results in O(n) time where "n" is the length of the array

//* Space: O(1) - The size of the output array scales with the size of the input array
//* However, leetcode says that the result's space usage does not count toward the space complexity
//* So O(n) -> O(1)
