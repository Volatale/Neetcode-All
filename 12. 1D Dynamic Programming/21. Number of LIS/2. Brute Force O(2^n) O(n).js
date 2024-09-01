//* Find the LENGTH of the longest increasing subsequence
//* Then find the NUMBER of unique longest increasing subsequences
//!     - ONLY count a subsequence if it has an EQUAL length to the original LIS
function findNumberOfLIS(nums) {
  function findLongestLIS(i, prevValue) {
    //* No more elements to consider
    if (i === nums.length) return 0;

    let longest = 0;

    //* Case 1: Include element (but only if its larger than prev)
    if (nums[i] > prevValue) {
      longest = findLongestLIS(i + 1, nums[i]) + 1;
    }

    //* Case 2: Exclude current elememt
    longest = Math.max(longest, findLongestLIS(i + 1, prevValue));

    return longest;
  }

  function countLIS(i, prevIndex, length) {
    //* Finished Subsequence, but ensure it is actually an LIS
    if (i === nums.length) {
      return length === LISLength ? 1 : 0;
    }

    let count = 0;

    //* Case 1: Include current element
    if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
      count += countLIS(i + 1, i, length + 1);
    }

    //* Case 2: Exclude current element
    count += countLIS(i + 1, prevIndex, length);

    return count;
  }

  const LISLength = findLongestLIS(0, -1);
  return countLIS(0, -1, 0);
}

console.log(findNumberOfLIS([1, 3, 5, 4, 7])); //* 2
console.log(findNumberOfLIS([2, 2, 2, 2, 2])); //* 5

//* Time: O(2^n) - In BOTH functions, we have 2 choices to make at each step
//* Include or exclude the element, thus, the branching factor is 2
//* And the depth of the recursion tree scales with "n" since we move by 1 index each call

//* Space: O(n) - The depth of the recursion tree scales with "n"
