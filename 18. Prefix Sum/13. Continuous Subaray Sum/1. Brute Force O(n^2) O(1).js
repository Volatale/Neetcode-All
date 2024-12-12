//* Find a subarray such that:
//*     - sum(subarray[j:i]) % k === 0
//! A number being divisible by k is the same as being a multiple of k
//* In a brute force manner, try every possible subarray and check its divisibility
function checkSubarraySum(nums, k) {
  //* Try every possible subarray
  for (let i = 0; i < nums.length - 1; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      //* Subarray length is at least 2 and it is divisible by k (it is a multiple of k)
      if (j - i + 1 >= 2 && sum % k === 0) {
        return true;
      }
    }
  }

  return false;
}

console.log(checkSubarraySum([23, 2, 4, 6, 7], 6)); //* True
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6)); //* True
console.log(checkSubarraySum([23, 2, 6, 4, 7], 13)); //* False

//* Time: O(n^2) - We have a nested for loop, both of which scale with the length of nums

//* Space: O(1) - No extra space is being used; thus the space usage remains constant regardless of input size
