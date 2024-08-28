//* Sum the number of ways at each level of recursion
//* Prune paths by ensuring we don't go out of bounds
//* Try every possible path to get every distinct way

//! Recurrence Relation: F(i,t) = sum(F(i+1,n-c) for all coins)
//* Apply memoization to avoid redundant work
//* We only need to track the current "target"
//*     - We can choose ANY number at ANY index
function combinationSum4(nums, target) {
  function sum(i, target, memo) {
    //* Successfully made target
    if (target === 0) return 1;

    //* Utilize memoized value
    if (memo.hasOwnProperty(target)) return memo[target];

    let ways = 0;

    for (let num of nums) {
      //* Prune recursive calls
      if (target >= num) {
        ways += sum(i + 1, target - num, memo);
      }
    }

    memo[target] = ways;
    return ways;
  }

  if (nums.length === 0 || target === 0) return 0;

  return sum(0, target, {});
}

console.log(combinationSum4([1], 1)); //* 1
console.log(combinationSum4([1, 2, 3], 4)); //* 7
console.log(combinationSum4([9], 3)); //* 0
console.log(combinationSum4([4, 2, 1, 5], 6)); //* 20

//* Time: O(n * t) - Where "n" is the length of the nums array
//* And "t" is the targete value
//* There are (n + 1) * (t + 1) unique subproblems to solve/memoize

//* Space: O(t) - The depth of the recursion tree scales with nums.length
//* Since there are (n + 1) * (t + 1) unqiue problems
//* There will also be an equal amount of keys/values stored in the worst case
