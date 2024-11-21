//* We can derive the original array using the prefix array
//* Prefix sum arrays are calculated using this formula:
//*     - prefix[i] = prefix[i-1] + nums[i]
//! The inverse of addition is subtraction
//*     - Find the DIFFERENCE between each successive element to derive the original array
//* Original array:
//*     - nums[i] = prefix[i] - prefix[i-1]
function originalArray(nums) {
  if (nums.length <= 1) return nums;

  //* To avoid modifying the input
  const result = new Array(nums.length).fill(0);
  result[0] = nums[0]; //* The first element is always the same

  //* Prefix Sum Array: prefix[i] = prefix[i - 1] + nums[i]
  //* Original Array: nums[i] = prefix[i] - prefix[i - 1]
  for (let i = 1; i < nums.length; i++) {
    result[i] = nums[i] - nums[i - 1];
  }

  return result;
}

console.log(originalArray([1, 3, 6, 10])); //* [1, 2, 3, 4]
console.log(originalArray([1, 2, 3, 4, 5])); //* [1, 1, 1, 1, 1]
console.log(originalArray([3, 4, 6, 16, 17])); //* [3, 1, 2, 10, 1]
console.log(originalArray([4])); //* [4]
console.log(originalArray([])); //* []

//* Time: O(n) - We have to iterate over the entire input to calculate the prefix sum array

//* Space: O(n) - In order to avoid modifying the input array, we created a new array of length n
