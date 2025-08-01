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
  function rob(n) {
    //* Out of bounds, can't rob house
    if (n < 0) return 0;

    //* At each step, we can either rob the house or not
    //* If we rob it, we can't rob the adjacent house (so n - 2)
    return Math.max(rob(n - 2) + nums[n], rob(n - 1));
  }

  return rob(nums.length - 1);
}

console.log(houseRobber([1, 2, 3, 1])); //* 4
console.log(houseRobber([2, 7, 9, 3, 1])); //* 12
console.log(houseRobber([4, 3, 7, 8, 1, 2])); //* 14

//* Time: O(2^n) - At each level of recursion, we have two choices
//* Rob the house or don't, the branching factor is 2
//* We have 1 non-constant parameter; n

//* Space: O(n) - The depth of the recursion tree is "n"
//* At each level, we can reduce "n" by 1
