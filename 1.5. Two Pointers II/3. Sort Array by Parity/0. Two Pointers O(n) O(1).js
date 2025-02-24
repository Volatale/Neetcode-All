//* Use two pointers
//*     - "left" is the index of the next EVEN
//*     - "right" is the index of the next ODD
//* If nums[left] is already even, move on
//* Else if nums[right] is already odd, move on
//* Else, the elements at [left] and [right] are out of place -> swap them
function sortArrayByParity(nums) {
  //* There is nothing to sort
  if (nums.length <= 1) return nums;

  let left = 0; //* Index of next even
  let right = nums.length - 1; //* Index of next odd

  while (left < right) {
    if ((nums[left] & 1) === 0) {
      left++; //* Element at left is already even, move on
    } else if (nums[right] & 1) {
      right--; //* Element at right is already odd, move on
    } else {
      //* Elements are out of place, so swap them
      [nums[left], nums[right]] = [nums[right], nums[left]];
    }
  }

  return nums;
}

console.log(sortArrayByParity([3, 1, 2, 4])); //* [2, 4, 3, 1]
console.log(sortArrayByParity([0])); //* [0]
console.log(sortArrayByParity([5, 1, 2, 5, 9, 2, 4, 8, 1]));

//* Time: O(n) - We iterate through the entire array once

//* Space: O(1) - The memory usage remains constant regardless of input size
