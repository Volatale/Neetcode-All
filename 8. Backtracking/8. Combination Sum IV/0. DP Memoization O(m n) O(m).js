//* The number of ways to count something is usually a brute force endeavour
//* Usually, combinations are not unique if the order is different
//*     - So [1, 5] would be the same as [5, 1]
//* In THIS case, those ARE counted as different combinations
//* Since we're going to have repeated subproblems
//* It is a good idea to memoize the results of the calls
//*     -  This lets us cut the time complexity down immensely
//* Only explore a path if that path is going to be valid
function combinationSumIV(nums, target) {
  function dp(target) {
    //* Base Cases
    if (target < 0) return 0;
    if (target === 0) return 1;

    //* Use the memoized value
    if (memo.hasOwnProperty(target)) return memo[target];

    //* Track the number of ways we can make "target"
    let ways = 0;

    //* Try every value
    for (let i = 0; i < nums.length; i++) {
      let leftover = target - nums[i];

      if (leftover >= 0) {
        ways += dp(leftover, memo);
      }
    }

    //* Memoize the value
    memo[target] = ways;
    return ways;
  }

  const memo = {};
  return dp(target);
}

console.log(combinationSumIV([1, 2, 3], 4));
console.log(combinationSumIV([9], 3));

//* Time: O(m * n) - Where "m" is target an "n" is nums.length
//* We memoize the results so that we don't do redundant work
//* Each of the "m" target values can lead to potentially "n" recursive calls

//* Space: O(m)
//* "memo" stores the result for each target from 0 to "m"
//* Therefore, in the worst case, memo has "m" keys
