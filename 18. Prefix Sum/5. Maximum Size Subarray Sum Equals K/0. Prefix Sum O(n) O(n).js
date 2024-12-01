//* This problem involves prefix sums
//* We want to find the LONGEST subarray that sums to "k"
//! Since nums[i] can be negative, we cannot use a Sliding Window approach
//*     - Why? Because extending the window may or may not put us closer to the goal
//*         - If our sum is 4 and we need to reach 6, the next element could be a -2, but it also may be a +2 (positive)
//*         - So we either get 4 + - 2 = 2, or we get 4 + 2 = 6, there are two possibilities at each step
//*         - We don't have consistent logic we can follow to know when to expand and/or shrink the window
//*     - Thus, the invariant of "A smaller subarray of a valid window should also be valid" is not true
//* Instead, we use a hashtable to keep track of the subarrays we have found thus far, and the index they END at
//* There is no need to repeatedly calculate the same subarray
//*     - We can use a prefix sum to track the cumulative running total as we traverse the array
//* We can apply the formula:
//*     - k = pref_i - pref_j
//*     - Thus, all we have to do is find some subarray "j" (that may or may not exist in the hashtable)
//*         - And then subtract / remove that from our current subarray (i) to reach "k"
//* pref_j = pref_i - k
//* So when we ask "sumToIndex[prefixSum - k] !== undefined", we are actually asking:
//!      "Is there a subarray (pref_j) that equals prefixSum - k (that exists in the hashtable)
//!       that we can remove from the current subarray (pref_i)?
//!       If there is, the removal of that subarray leaves us with k (which is our goal)"
function maxSubarraySumEqualsK(nums, k) {
  //* There are no elements
  if (nums.length === 0) return 0;

  let maxLength = 0;
  let prefixSum = 0;

  //* Hashtable to map the last known (end) index of (prefix sum) subarray that sums to "value"
  //* Assume that there is always a way to get a subarray sum of 0 (take no elements)
  //* 0 : -1 because if pref - k = 0, we don't need to remove any subarray: n - -1 = n + 1 (include first element)
  const sumToIndex = { 0: -1 };

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    //* If there is a subarray of sum "prefixSum - k" we can remove to get to "k"
    if (sumToIndex[prefixSum - k] !== undefined) {
      maxLength = Math.max(maxLength, i - sumToIndex[prefixSum - k]);
    }

    //* We only want the LONGEST subarrays, so only record the first occurrence
    if (sumToIndex[prefixSum] === undefined) {
      sumToIndex[prefixSum] = i;
    }
  }

  return maxLength;
}

console.log(maxSubarraySumEqualsK([1, -1, 5, -2, 3], 3)); //* 4
console.log(maxSubarraySumEqualsK([-2, -1, 2, 1], 1)); //* 2
console.log(maxSubarraySumEqualsK([0, 0, 0, 0, 0, 0], 0)); //* 6
console.log(maxSubarraySumEqualsK([1, 2, 3], 6)); //* 3
console.log(maxSubarraySumEqualsK([-1, 5, -4, 2, 3, 5], 11)); //* 5

//* Time: O(n) - We iterate through the entire input once
//* Lookups in the hashtable take Θ(1) on average

//* Space: O(n) - In the worst case, there are "n" keys in total
//* Imagine if we had an array like [1, 2, 3, 4, 5]: the
