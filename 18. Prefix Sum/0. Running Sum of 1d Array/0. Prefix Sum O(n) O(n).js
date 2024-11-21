//* We are told runningSum[i] = sum(runningSum[0] + runningSum[1] + ... nums[i])
//! So, we can derive another formula:
//*     - runningSum[i] = runningSum[i - 1] + nums[i]
//* There is no need to calculate the previous sums if we already have them
//*     - runningSum[i-1] is already the running sum up until the i-1th element (inclusive)
//*     - So we can simply add nums[i] to that element to get THIS index's element
function runningSum(nums) {
  if (nums.length <= 1) return nums;

  //* To avoid modifying the input
  const result = new Array(nums.length).fill(0);
  result[0] = nums[0]; //* The first element is always the same

  //* result[i] = nums[i] + result[i - 1]
  for (let i = 1; i < nums.length; i++) {
    result[i] = nums[i] + result[i - 1];
  }

  return result;
}

console.log(runningSum([1, 2, 3, 4])); //* [1, 3, 6, 10]
console.log(runningSum([1, 1, 1, 1, 1])); //* [1, 2, 3, 4, 5]
console.log(runningSum([3, 1, 2, 10, 1])); //* [3, 4, 6, 16, 17]
console.log(runningSum([4])); //* [4]
console.log(runningSum([])); //* []

//* Time: O(n) - We have to iterate over the entire input to calculate the prefix sum array

//* Space: O(n) - In order to avoid modifying the input array,
