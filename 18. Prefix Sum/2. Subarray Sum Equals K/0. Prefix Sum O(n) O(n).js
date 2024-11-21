//* In the brute force version, we calculate the same sum(s) multiple times
//* In the end, all we really care about is the "prefix sum"
//* We need to track how many times a subarray of the value "sum - k" has been found
//*     - There could be multiple ways to generate the same sum
//*     - So the hashtable serves as a way to count the frequency
//! There is ALWAYS a way to get a subarray of sum 0 (by taking no elements at all)
//*     - This is similar to the logic used for DP (tabulation)
//* A prefix sum is defined as
//*     - prefixSum[i] = nums[0] + nums[1] + ... + nums[i]
//* If there's a subarray with sum k ENDING at index i
//*     - It means the SUM of the elements in that subarray is k
//* We can denote the START index of the subarray as j
//* The sum of subarray nums[j] to nums[i] can be expressed as:
//*     - prefixSum[i] - prefixSum[j-1] = k
//!     - j - 1 because we want to INCLUDE prefixSum[j]
//*         - [j] would mean we subtract that too, which we don't want
//* Then we can rearrange the equation and get:
//*     - prefixSum[j-1] = prefixSum[i] - k

//* Another way to look at it is like so:
//*     - The prefix sum will end at some index "i"
//*     - Imagine we have [1, 1, 1, 1, 1] and k = 3
//*         - The first 4 elements sum to 4
//*     - Do we have a subarray we can "chop off" (from the left) to get the sum of 3 (k)?
//*         - freq = { 0 : 1, 1 : 1, 2 : 1, 3 : 1, 4 : 1 }
//*             - These are all of the subarrays (sums) found thus far (and their frequencies)
//*         - [[1], 1, 1, 1] -> Yes, we can cut off the leftmost subarray of [1]
//!     - sum - k gives us the amount we need to remove from the current prefix sum to reach k
//*         - So 4 - 3 = 1, so we need to "cut off" a subarray that sums to 1
//*     - And freq[prefixSum-k] tells us how many subarrays we have that we "could" cut off
//*         - So we take the cumulative sum of all of those subarrays (since we aren't doing a nested loop)
//! The hashtable is populated lazily (from left to right)
//*     - Thus we never account for more subarrays than we need to at any given point
function subarraySum(nums, k) {
  //* There are no elements
  if (nums.length === 0) return 0;

  let subarrays = 0;
  let prefixSum = 0;

  //* Frequency of subarrays that sum to key
  //* There is always 1 way to get subarray of sum 0 (take no elements at all)
  const freq = { 0: 1 };

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    //* We need to remove a subarray that sums to diff to make "k"
    const diff = prefixSum - k;

    //* No. of subarrays we have found thus far that we can remove to make "k"
    subarrays += freq[diff] || 0;

    //* Increase frequency of subarray that has sum of "prefixSum"
    freq[prefixSum] = (freq[prefixSum] || 0) + 1;
  }

  return subarrays;
}

console.log(subarraySum([1, 1, 1], 2)); //* 2
console.log(subarraySum([3, 0, 3], 3)); //* 4
console.log(subarraySum([1, 2, 3], 3)); //* 2
console.log(subarraySum([1, -1, 1], 0)); //* 2
console.log(subarraySum([1, -1, 1], 3)); //* 0

//* Time: O(n) - Iterating over the entire array takes O(n) time
//* The object (hashtable) lookups take Θ(1) on average

//* Space: O(n) - In the worst case, the number of keys grows with the number of elements in the input
