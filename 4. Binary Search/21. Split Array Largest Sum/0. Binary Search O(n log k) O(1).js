//* This is an optimization problem (find the MINIMUM successful candidate)
//* So we have a predicate to test, and something to work towards (the minimum)
//* The MINIMUM sum a subarray can hold is the max(nums)
//* Imagine if we had [10, 2], and K = 2, the minimized largest sum is 10 in that case
//* The MAXIMUM sum an array can hold is every element at once
//* [10, 20, 30], k = 1; every element has to fit into ONE subarray, so the sum is 60
//* If we take "mid" to represent the maxSum that we want to test, we don't have to test every possibility
//* Instead, we can just binary search to narrow down our options
function splitArrayLargestSum(nums, k) {
  function canSplit(maxSum) {
    let sum = 0;
    let subarrays = 1; //* We start with a subarray

    for (let i = 0; i < nums.length; i++) {
      sum += nums[i]; //* Add the element to this "array"

      //* This means we have to create a NEW subarray
      if (sum > maxSum) {
        //* Start a new subaray with this element (couldn't fit into the other)
        sum = nums[i];
        subarrays++;

        //* You can't create more than K subarrays
        if (subarrays > k) return false;
      }
    }

    //* Successfully split into <= k subarrays with this maxSum
    return true;
  }

  //* If K = 1, and nums = [10], the minimum the array can be is 10 (max(nums))
  //* At worst, every element needs to fit into ONE array, so take the sum of everything
  let left = Math.max(...nums);
  let right = nums.reduce((sum, curr) => (sum += curr), 0);

  while (left < right) {
    //* Mid represents the "maxSum" that each array can have
    let mid = left + ((right - left) >> 1);

    if (canSplit(mid)) {
      right = mid; //* Found a new best, don't eliminate mid
    } else {
      left = mid + 1; //* Creates too many arrays, increase mid
    }
  }

  return left;
}

console.log(splitArrayLargestSum([1, 2, 3, 4, 5], 1)); //* 10
console.log(splitArrayLargestSum([1, 2, 3, 4, 5], 2)); //* 9
console.log(splitArrayLargestSum([7, 2, 5, 10, 8], 2)); //* 18

//* Time: O(n log k) - Where "k" is the sum of nums
//* We do a binary search on the range of maxSum we can have
//* Ranging from max(nums) to sum(nums)
//* Within each binary search, we do an O(n) iteration (in the worst case)

//* Space: O(1) - We only use constant space variables
