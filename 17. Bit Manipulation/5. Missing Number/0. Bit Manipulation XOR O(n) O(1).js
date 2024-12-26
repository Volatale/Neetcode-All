//* The numbers are in the range [0, n]
//* The indices are in the range [0, n - 1]
//* Thus, there is one index that does NOT match a number that should exist in the array
//* If we take the XOR of "XOR", the current index and nums[i]
//*     - We end up with the missing number

//* This variation has no risk of overflowing
//*     - Although, the constraints won't allow for that either way
function missingNumber(nums) {
  let XOR = nums.length;

  //* Since the range is [0, n], the indices are in the range [0, n - 1]
  //* We want to XOR every index and nums[i] to find the missing number
  for (let i = 0; i < nums.length; i++) {
    XOR = XOR ^ i ^ nums[i];
  }

  return XOR;
}

console.log(missingNumber([3, 0, 1])); //* 2
console.log(missingNumber([0, 1])); //* 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); //* 8
console.log(missingNumber([0])); //* 1

//* Time: O(n) - It takes O(1) to get the sum of "n" natural numbers
//* But it takes O(n) to get the "actual" sum of the array

//* Space: O(1) - We are not using any additional space that will scale with the input size
