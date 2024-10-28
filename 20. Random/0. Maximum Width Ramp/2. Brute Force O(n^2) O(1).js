//* For each index, we want to find two indices (i, j) such that:
//*     - i < j (so two different indices)
//*     - nums[i] <= nums[j]
//* The values WITHIN these gaps are IRRELEVANT
//*     - We ONLY care about the distance between the two pointers
//* For example - [5, 8, 1, 0, 3, 4, 5, 0]
//*     - We could have "i" at 0 and we can have "j" at 6
//*         - 5 <= 5 (so these choices are valid)
//*         - 6 - 0 = 6
function maxWidth(nums) {
  //* If there are only 2 values, the max width ramp we can have is 1
  if (nums.length === 2) return nums[0] <= nums[1] ? 1 : 0;

  let maxRamp = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      //* Only check valid ramps
      if (nums[i] <= nums[j]) {
        maxRamp = Math.max(maxRamp, j - i);
      }
    }
  }

  return maxRamp;
}

console.log(maxWidth([6, 0, 8, 2, 1, 5])); //* 4
console.log(maxWidth([9, 8, 1, 0, 1, 9, 4, 0, 4, 1])); //* 7
console.log(maxWidth([1, 2, 3, 4, 5])); //* 4
console.log(maxWidth([3, 2, 1])); //* 0
console.log(maxWidth([5, 8, 1, 0, 3, 4, 5, 0])); //* 6

//* Time: O(n^2) - Check every possible range, which takes quadratic time

//* Space: O(1) - We are only using a constant amount of space
