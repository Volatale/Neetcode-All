//! TLE -> We can't use Dynamic Programming here
//* We need a subsequence in the range [i...j] such that:
//*     - nums[i] < nums[i + 1] < nums[i + 2] < ... nums[j - 1] < nums[j]
//*         - AND
//*     - |nums[i] - nums[i + 1]| for all "i" in the subsequence [i...j] inclusive <= k
//! Examples:
//*     - [4, 2, 1, 4, 3, 4, 5, 8, 15], 3
//*         [4, 5, 8] has a length of 3
//*         [2, 4, 5, 8] has a length of 4
//*         [1, 4, 5, 8] has a length of 4
//*         [1, 3, 4, 5, 8] has a length of 5
//*     - [1, 1, 1, 1, 1], k = 1
//*         - Return 1 (every element is the same)
//* dp[i] = Length of longest increasing subsequence up to index i (inclusive)
//* "i" represents the FINAL element in the subsequence
//* "j" represents all of the elements BEFORE index "i"
//* We need to consider adding nums[j] to the subsequence that dp[i] represents
//* But only if the difference between the LAST element added to that subsequence and the current <= k
//! The subsequences "already" contain nums[i] in each
//*     - We are simply seeing if nums[j] can be ADDED to that subarray
//* For example, if we start with 4 -> [4]
//*     - Lets say we want to add 3 to the subsequence, then we get [3, 4]
//! In other words, imagine if nums[j] was added to the START of the subsequence
//* Since we already have [4], we can simply check if |3 - 4| <= k
//*     - If it is, we can add it to the current subsequence
//* Repeat the process for every other subsequence / index
function lengthOfLIS(nums, k) {
  //* dp[i] = Length of LIS up to index i (inclusive)
  const dp = new Array(nums.length).fill(1);

  //* The minimum length is 1 (a subsequence of a single element)
  let longest = 1;

  //* "i" represents the FINAL element in the subsequence (should be the largest)
  //* "j" represents the elements BEFORE the final (that should be smaller)
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      //* We already know nums[i] > nums[j], so just make sure the difference is <= k
      if (nums[i] > nums[j] && nums[i] - nums[j] <= k) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    longest = Math.max(longest, dp[i]);
  }

  return longest;
}

console.log(lengthOfLIS([1, 2, 3], 1)); //* 3
console.log(lengthOfLIS([4, 2, 1, 3, 4, 5, 8, 15], 3)); //* 5
console.log(lengthOfLIS([1, 1, 1, 1, 1], 1)); //* 1
console.log(lengthOfLIS([1, 5], 1)); //* 1
console.log(lengthOfLIS([7, 4, 5, 1, 8, 12, 4, 7], 5)); //* 4
console.log(lengthOfLIS([7], 4)); //* 1

//* Time: O(n^2) - We have a pair of nested for loops, both of which scale with the input size

//* Space: O(n) - The memory usage scales with nums.length (n)
