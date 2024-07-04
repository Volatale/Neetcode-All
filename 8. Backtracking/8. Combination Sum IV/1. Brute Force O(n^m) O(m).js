//* The number of ways to count something is usually a brute force endeavour
//* Usually, combinations are not unique if the order is different
//*     - So [1, 5] would be the same as [5, 1]
//* In THIS case, those ARE counted as different combinations
//* Only explore a path if that path is going to be valid
function combinationSumIV(nums, target) {
  function bruteForce(target) {
    //* Base Cases
    if (target < 0) return 0;
    if (target === 0) return 1;

    //* Track the number of ways we can make "target"
    let ways = 0;

    //* Try every value
    for (let i = 0; i < nums.length; i++) {
      let leftover = target - nums[i];

      if (leftover >= 0) {
        ways += bruteForce(leftover);
      }
    }

    return ways;
  }

  return bruteForce(target);
}

console.log(combinationSumIV([1, 2, 3], 4));
console.log(combinationSumIV([9], 3));

//* Time: O(n^m)
//* The depth of the recursion scales with "target" (m)
//* In the worst case, each call creates "n" different branches

//* Space: O(m) - The depth of the recursion scales with "m"
//* In the worst case, we subtract 1 each level
