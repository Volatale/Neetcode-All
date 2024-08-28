//* Sum the number of ways at each level of recursion
//* Prune paths by ensuring we don't go out of bounds
//* Try every possible path to get every distinct way

//! Recurrence Relation: F(i,t) = sum(F(i+1,n-c) for all coins)
//* We only need to track the current "target"
//*     - We can choose ANY number at ANY index
function combinationSum4(nums, target) {
  function sum(target) {
    //* Successfully made target
    if (target === 0) return 1;

    let ways = 0;

    for (let num of nums) {
      //* Prune recursive calls
      if (target >= num) {
        ways += sum(target - num);
      }
    }

    return ways;
  }

  if (nums.length === 0 || target === 0) return 0;

  return sum(target);
}

console.log(combinationSum4([1], 1)); //* 1
console.log(combinationSum4([1, 2, 3], 4)); //* 7
console.log(combinationSum4([9], 3)); //* 0
console.log(combinationSum4([4, 2, 1, 5], 6)); //* 20

//* Time: O(n^t) - Where "n" is the length of the nums array
//* And "t" is the targete value
//* At each level of recursion, there are "n" calls (one for each number)

//* Space: O(t) - The depth of the recursion tree scales with target
//* We return once target === 0
