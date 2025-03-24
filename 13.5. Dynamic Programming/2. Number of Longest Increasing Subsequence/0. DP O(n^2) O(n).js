//* We know we can use Dynamic Programming to find the Longest Increasing Subsequence
//* But can we use Binary Search to find the NUMBER of LIS that exist?
//!     - No, because we want the total count
//* If we binary search, we have no real way to see which subsequences we've already considered
//* The binary search variation works because for the regular LIS problem, we only need to know the LENGTH
//*     - It wouldn't matter if multiple LIS existed, because they all have the same length regardless
//* In our case, we DO care about each individual LIS, because we can't count the same one multiple times
//* Thus, we need to fall back to the regular Dynamic Programming approach
//! This time, however, there are actually TWO difference pieces of information that need vtracking:
//*     - The LENGTH of the longest increasing subsequence ending at the current index (inclusive)
//*     - The COUNT of the longest increasnig subsequences ending at the current index (inclusive)
//* Why do we care about the count?
//*     - Because using only the lengthDP array, we can't tell how many LIS we actually have in total
//*     - If we did it that way, we'd have to do an O(n^2) loop for EVERY index in the array (to get all of the individual LIS)
//* By also tracking the count of LIS up to the current index, we are also able to efficiently get the total number of LIS
//* Why does this work?
//*     - As the length of the LIS increases, so will the "maxLength" variable
//*         - So even if countDP[]'s LIS length is technically invalid, it is only temporary
//*         - Remember, we essentially simulating adding nums[j] to the current subsequence in lengthDP[i]
//*     - Whenever you find a new max length LIS, we update the values accordingly
//*         - maxLength is set to lengthDP[i] (because we need to know how long the current max length LIS is)
//*         - LISCount = countDP[i] because we didn't find an LIS that has an EQUAL length to the current best
//*             - And we know that lengthDP[i] is the current best, so we should keep all of the LIS up to "i" with a length of lengthDP[i]
//*     - If we DO find an LIS with the same length as the current best
//*         - Then we simply add countDP[i] to the current total, because we know this is the current best
function findNumberOfLIS(nums) {
  if (nums.length === 0) return 0;

  const n = nums.length;

  //* lengthDP[i] = Longest Increasing Subsequence ending at index i
  //* countDP[i] = Number of Longest Increasing Subsequences ending at index i
  const lengthDP = new Array(n).fill(1);
  const countDP = new Array(n).fill(1);

  let maxLength = 0;
  let LISCount = 0;

  //* "i" represents the index the subsequence will END at
  //* "j" represents the values we will are trying to include in the subsequence
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (lengthDP[i] < lengthDP[j] + 1) {
          lengthDP[i] = lengthDP[j] + 1;
          countDP[i] = countDP[j]; //* Retain the previous count
        } else if (lengthDP[i] === lengthDP[j] + 1) {
          //* We found a subsequence that has the same length as length[i], accumulate the LIS
          countDP[i] += countDP[j];
        }
      }
    }

    if (lengthDP[i] === maxLength) {
      LISCount += countDP[i]; //* Found a (current) max length LIS
    } else if (lengthDP[i] > maxLength) {
      maxLength = lengthDP[i]; //* We have a new max length LIS
      LISCount = countDP[i]; //* Get the current count of LIS that ends at this index
    }
  }

  return LISCount;
}

console.log(findNumberOfLIS([1, 1, 1])); //* 3
console.log(findNumberOfLIS([1, 2, 3, 1, 2, 3])); //* 4
console.log(findNumberOfLIS([1, 2, 1, 2])); //* 3

//* Time: O(n^2) - We have a pair of nested for loops, both of which scale with "n"

//* Space: O(n) - There are two DP arrays that scale with the input size (n)
