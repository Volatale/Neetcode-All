//* We need to return the no. of NON-EMPTY subsequences such that:
//*     - The sum of the minimum and maximum elements is <= 10
//* "Subsequences" imples we can ignore some elements, but the relative order must be maintained
//* If we sort the array, we can then apply a two pointer approach
//*     - We only ever need the values of TWO elements at any given point
//* A two pointer approach will work because a sorted array exhibits monotonicity
//* Either nums[left] + nums[right] is LARGER than target, in which case we decrement right
//* Or, the sum is <= target, which means the subseqeunce is valid
//! It is also worth noting that a single element can be both the minimum AND the maximum simultaneously
//*     - This occurs in cases such as "[3], target = 6", because 3 = 3 <= 6
//* Instead of doing brute force computations, we can simply add all of the valid subsequences at once
//* Lets say we have: [3, 5, 6, 7], target = 9
//*     [3] -> (3 + 3 <= 9)
//*     [3, 5] -> (3 + 5 <= 9)
//*     [3, 5, 6] -> (3 + 6 <= 9). Note that there are THREE subsequences within these boundaries
//*     [3, 6] -> (3 + 6 <= 9). There is ONE valid subsequence with these boundaries
//! The number of subsequences in an array is ALWAYS a power of 2
//*     - Thus, the same rule applies for a subarray too
//* Therefore, the total number of (valid) subsequences is bounded by "n" itself
//* We can precompute the powers of two
//*     - Then, we can use those values to determine the count in the current range (left, right)
//* Since we know the number of subsequences is always a power of 2, we can do powersOf2[right - left] to get the count
//*     - How do we know the inner subsequences are valid? Because the array is sorted in non-decreasing order
//*     - nums[0] <= nums[1] <= ... <= nums[n - 1], so if nums[0] and nums[2] are valid endpoints, nums[0] and nums[1] is ALSO valid
//* Take the example again: [3, 5, 6, 7], target = 9 (it is already sorted)
//*     - (3 + 7) > target, so we decrement right by 1
//*     - (3 + 6) <= target, so this is a valid subarray (so just compute the number of subsequences that exist in this subarray)
//*         - powersOf2 = [1, 2, 4, 8], left = 0, and right = 2
//!         - powersOf2[2 - 0] resolves to 4, which we know is correct from the previous example
//* Essentially, find valid subarray boundaries using left and right
//* Then, for each valid subarray boundary, compute how many subsequences exist within a subarray of size (right - left)
//! Also note that sorting is okay here because we ONLY care about the minimum and maximum elements
//*     - We don't care about the elements WITHIN the subarray bounds, so their order is irrelevant
//*     - [3, 9, 2], target = 11, here, the minimum in a subarray could STILL be 2, regardless of its order, for example
function numOfSubsequences(nums, target) {
  if (nums.length === 0) return 0;

  //* Sorting the array introduces monotonicity, which allows for two pointer approaches
  nums.sort((a, b) => a - b);

  const MOD = 10 ** 9 + 7;
  let subsequences = 0;

  //* Two pointers used to mark the boundaries of the subsequences
  let left = 0;
  let right = nums.length - 1;

  //* No. of subsequences is ALWAYS a power of 2
  const powersOfTwo = new Array(nums.length).fill(0);
  powersOfTwo[0] = 1;

  //* Precompute each power of two
  for (let i = 1; i < nums.length; i++) {
    powersOfTwo[i] = (powersOfTwo[i - 1] * 2) % MOD;
  }

  while (left <= right) {
    if (nums[left] + nums[right] > target) {
      //* Need a smaller sum
      right--;
    } else {
      //* Compute the no. of possible subsequences that can be in the range (we already know the subarray is valid)
      subsequences = (subsequences + powersOfTwo[right - left]) % MOD;
      left++;
    }
  }

  return subsequences;
}
