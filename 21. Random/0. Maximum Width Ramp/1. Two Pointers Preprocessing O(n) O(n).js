//* For each index, we want to find two indices (i, j) such that:
//*     - i < j (so two different indices)
//*     - nums[i] <= nums[j]
//* The values WITHIN these gaps are IRRELEVANT
//*     - We ONLY care about the distance between the two pointers
//* For example - [5, 8, 1, 0, 3, 4, 5, 0]
//*     - We could have "i" at 0 and we can have "j" at 6
//*         - 5 <= 5 (so these choices are valid)
//*         - 6 - 0 = 6
//* The problem arises when there are MULTIPLE possibilities within a range
//*     - If (i, j) are valid, any range WITHIN these boundaries will have a smaller ramp
//*     - Hence we can use techniques to avoid recalculating
//* Precompute the maximum value to the right (including this element) for each index
//*     - Then we can use that to know at any given index if there even is a possible valid ramp
//*     - If there isn't, we need to move the left pointer; this value is too small
//*     - maxValAhead[right] tells us what the LARGEST value to the right is (including this value)
//*         - Thus, if nums[left] > maxValAhead, THIS ramp cannot be extended anymore
//*         - So keep moving left until it IS valid
function maxWidth(nums) {
  //* If there are only 2 values, the max width ramp we can have is 1
  if (nums.length === 2) return nums[0] <= nums[1] ? 1 : 0;

  const maxValAhead = new Array(nums.length).fill(0);
  let maxVal = 0;
  let maxRamp = 0;

  //* For each "i", determine the maximum value we can find (to the right)
  for (let i = nums.length - 1; i >= 0; i--) {
    maxVal = Math.max(maxVal, nums[i]);
    maxValAhead[i] = maxVal;
  }

  //* Two Pointers - maxValAhead[right] should be > nums[left]
  let left = 0;
  let right = 1;

  while (right < nums.length) {
    //* Current window cannot extend using this (left) value
    while (nums[left] > maxValAhead[right]) {
      left++;
    }

    //* Calculate current ramp
    maxRamp = Math.max(maxRamp, right - left);
    right++;
  }

  return maxRamp;
}

console.log(maxWidth([6, 0, 8, 2, 1, 5])); //* 4
console.log(maxWidth([9, 8, 1, 0, 1, 9, 4, 0, 4, 1])); //* 7
console.log(maxWidth([1, 2, 3, 4, 5])); //* 4
console.log(maxWidth([3, 2, 1])); //* 0
console.log(maxWidth([5, 8, 1, 0, 3, 4, 5, 0])); //* 6

//* Time: O(n) - It takes O(n) time to find the maximum value to the right for each index
//* Then, it takes O(n) to iterate over the entire array

//* Space: O(n) - The maxValAhead array scales proportionally in size with the input size
