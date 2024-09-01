//* Find the LENGTH of the longest increasing subsequence
//* Then find the NUMBER of unique longest increasing subsequences
//!     - ONLY count a subsequence if it has an EQUAL length to the original LIS

//* Apply memoization to avoid redundant work
function findNumberOfLIS(nums) {
  function findLongestLIS(i, prevIndex, memo) {
    //* No more elements to consider
    if (i === nums.length) return 0;

    //* Utilize memoized value
    if (memo.hasOwnProperty(prevIndex)) return memo[prevIndex];

    let longest = 0;

    //* Case 1: Include element (but only if its larger than prev)
    if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
      longest = findLongestLIS(i + 1, i, memo) + 1;
    }

    //* Case 2: Exclude current elememt
    longest = Math.max(longest, findLongestLIS(i + 1, prevIndex, memo));

    memo[prevIndex] = longest;
    return longest;
  }

  function countLIS(i, prevIndex, length, memo) {
    //* Finished Subsequence, but ensure it is actually an LIS
    if (i === nums.length) {
      return length === LISLength ? 1 : 0;
    }

    //* Utilize memoized value
    const key = `${prevIndex}-${length}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let count = 0;

    //* Case 1: Include current element
    if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
      count += countLIS(i + 1, i, length + 1, memo);
    }

    //* Case 2: Exclude current element
    count += countLIS(i + 1, prevIndex, length, memo);

    memo[key] = count;
    return count;
  }

  const LISLength = findLongestLIS(0, -1, {});
  return countLIS(0, -1, 0, {});
}

console.log(findNumberOfLIS([1, 3, 5, 4, 7])); //* 2
console.log(findNumberOfLIS([2, 2, 2, 2, 2])); //* 5

//* Time: O(n^2) - Both functions take O(n^2) - we are memoizing the results of each subproblem

//* Space: O(n^2) - The depth of the recursion tree(s) scale with "n"
//* There are n^2 subproblems for each function
