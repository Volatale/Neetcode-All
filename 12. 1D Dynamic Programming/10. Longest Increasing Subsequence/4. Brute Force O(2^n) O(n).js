//* At each step, we can include or exclude the current element
//* We need to track what index we are currently trying to make that decision for
//* We can ONLY include an element if it is GREATER than the previously selected element
function lengthOfLIS(nums) {
  function LIS(i, prev) {
    //* No more elements to consider
    if (i === nums.length) return 0;

    //* Be pessimistic
    let longest = 0;

    //* Case 1: Include element (but only if it is larger than the previous)
    if (nums[i] > prev) {
      longest = LIS(i + 1, nums[i]) + 1;
    }

    //* Case 2: Exclude current element
    longest = Math.max(longest, LIS(i + 1, prev));

    return longest;
  }

  return LIS(0, -Infinity);
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); //* 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); //* 4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); //* 1
console.log(lengthOfLIS([1, 3, -2, -1, 4])); //* 3
console.log(lengthOfLIS([1, 2, -1, -3, 3, 2])); //* 3
console.log(lengthOfLIS([1, 2, 3, 4])); //* 4
console.log(lengthOfLIS([1])); //* 1

//* Time: O(2^n) - At each step, there are two decisions to make
//* Either include or exclude the current element
//* Therefore the branching factor is 2
//* We transition the state by 1 each call (i + 1)
//* Thus the depth of the recursion tree scales with the length of the input

//* Space: O(n) - The depth of the recursion tree scales with the length of the input
