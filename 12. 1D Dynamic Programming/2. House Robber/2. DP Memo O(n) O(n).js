//* At each level of recursion, we have two choices
//*     Either rob the current house or don't
//* If you DO rob the house
//*     - Get the profit from the current house (nums[n])
//*     - Decrement "n" by 2 since we can't rob an adjacent house
//* If we DON'T rob the house
//*     - We don't get the profit from the house
//*      - But we ARE allowed to rob an adjacent house

//! Recurrence Relation: F(n) = Math.max(F(n-2) + cost[n], F(n-1))
function houseRobber(nums) {
  function rob(n, memo) {
    //* Utilize memoization
    if (memo.hasOwnProperty(n)) return memo[n];

    //* Out of bounds, can't rob house
    if (n < 0) return 0;

    //* At each step, we can either rob the house or not
    //* If we rob it, we can't rob the adjacent house (so n - 2)
    memo[n] = Math.max(rob(n - 2, memo) + nums[n], rob(n - 1, memo));
    return memo[n];
  }

  return rob(nums.length - 1, {});
}

console.log(houseRobber([1, 2, 3, 1])); //* 4
console.log(houseRobber([2, 7, 9, 3, 1])); //* 12
console.log(houseRobber([4, 3, 7, 8, 1, 2])); //* 14

//* Time: O(n) - We use memoization to reduce the time complexity to O(n) (linear from exponential)
//* We only compute each subproblem once in total

//* Space: O(n) - The depth of the recursion tree is "n"
//* At each level, we can reduce "n" by 1
//* Since we only have one non-constant parameter, the memo object will have "n" keys at most
