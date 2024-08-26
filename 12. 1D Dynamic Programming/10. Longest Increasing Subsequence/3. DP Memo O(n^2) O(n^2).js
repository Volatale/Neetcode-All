//* At each step, we can include or exclude the current element
//* We need to track what index we are currently trying to make that decision for
//* We can ONLY include an element if it is GREATER than the previously selected element

//* Apply memoization
function lengthOfLIS(nums) {
  function LIS(i, prevIndex, memo) {
    //* No more elements to consider
    if (i === nums.length) return 0;

    const key = `${i}-${prevIndex}`;
    //* Utilize memoized value
    if (memo.hasOwnProperty(key)) return memo[key];

    //* Be pessimistic
    let longest = 0;

    //* Case 1: Include element (but only if it is larger than the previous)
    if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
      longest = LIS(i + 1, i, memo) + 1;
    }

    //* Case 2: Exclude current element
    longest = Math.max(longest, LIS(i + 1, prevIndex, memo));

    memo[key] = longest;
    return longest;
  }

  //* Prev index is set to -1
  return LIS(0, -1, {});
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); //* 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); //* 4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); //* 1
console.log(lengthOfLIS([1, 3, -2, -1, 4])); //* 3
console.log(lengthOfLIS([1, 2, -1, -3, 3, 2])); //* 3
console.log(lengthOfLIS([1, 2, 3, 4])); //* 4
console.log(lengthOfLIS([1])); //* 1

//* Time: O(n^2) - There are "n" elements to consider
//* And there are "n" possible previous indices
//* (n + 1) index states * (n + 1) prev indices = n^2 + 2 possible states

//* Space: O(n^2) - There are n^2 unique subproblems to memoize
//* The depth of the recursion tree scales with "n"
