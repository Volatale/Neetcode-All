//* We are looking for a subarray to remove such that:
//*     - (sum(subarray[0:n-1]) - sum(subarray([j:i])) % p === 0
//* i and j are two different indices
//*     - Thus, in a brute force manner, we need to find the start and end of the (valid) subarray
//! We need to know what the REMAINING subarray's sum is after the removal
//*     - Which means we need to know what it is BEFORE removal (and then we can derive the AFTER sum)
//* Get the sum of the entire array
//!     - Sum of Remaining Array = totalSum - sum
//!     - Check if remaining array is divisible by k = (totalSum - sum) % p === 0
//* j - i + 1 gives us the length of the subarray we are removing
function minSubarray(nums, p) {
  //* Get the sum of the entire array
  const totalSum = nums.reduce((acc, curr) => acc + curr, 0);

  //* It is impossible to remove something
  if (totalSum < p) return -1;

  //* We don't need to remove anything
  if (totalSum % p === 0) return 0;

  let minLength = Infinity;

  //* Try every possible subarray [i:j]
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      //* Found a valid subarray we can remove (j - i + 1 = subarray length)
      if ((totalSum - sum) % p === 0) {
        minLength = Math.min(minLength, j - i + 1);
      }
    }
  }

  //* If we didn't find a subarray to remove, or we removed the entire array, return -1
  return minLength === Infinity || minLength === nums.length ? -1 : minLength;
}

console.log(minSubarray([3, 1, 4, 2], 6)); //* 1
console.log(minSubarray([6, 3, 5, 2], 9)); //* 2
console.log(minSubarray([1, 2, 3], 3)); //* 0
console.log(minSubarray([4, 5, 6, 7], 1)); //* 0

//* Time: O(n^2) - We have a nested for loop, both of which scale with the input length

//* Space: O(1) - No extra space is being used, so the space usage remains constant regardless of input size
