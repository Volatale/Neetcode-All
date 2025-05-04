//* The goal is to find the "pivot" index in the array
//*     - In other words, we have an array nums
//*     - And we want to find two subarrays [0:i], [i+1:n] such that they have the same sum
//* Since the problem involves prefix sums, we could use a prefix sum array
//* However, this requires O(n) memory, and the only value we'd really need is the last
//* After each index, we can simply add nums[i] to "leftSum" and remove the array entirely
//* rightSum = total - nums[i] - leftSum
//* Why this formula?
//*     - Because the left subarray does not include nums[i]
//*        - So we need to subtract nums[i] from the total
//*     - And the right subarray does not include nums[i] or leftSum
//*        - So we also need to subtract leftSum from the total
function pivotIndex(nums) {
  //* The left subarray starts with a sum of 0
  let leftSum = 0;
  let sum = 0;

  //* Calculate the total sum of the array
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  //* Find the pivot index
  for (let i = 0; i < nums.length; i++) {
    //* The right subarray is the sum of the entire array - nums[i] - leftSum
    const rightSum = sum - nums[i] - leftSum;

    //* Found the pivot index; left subarray and right subarray have an equal sum
    if (leftSum == rightSum) {
      return i;
    }

    //* Add the current element to the left subarray
    leftSum += nums[i];
  }

  //* There is no pivot index
  return -1;
}

console.log(pivotIndex([1, 1, 1, 1, 1])); //* 2
console.log(pivotIndex([1, 7, 3, 6, 5, 6])); //* 3
console.log(pivotIndex([1, 2, 3])); //* -1
console.log(pivotIndex([-1])); //* 0
console.log(pivotIndex([2, 1, -1])); //* 0

//* Time: O(n) - The time taken scales with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
