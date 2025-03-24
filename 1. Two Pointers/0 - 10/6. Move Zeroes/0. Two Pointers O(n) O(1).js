//* Use two pointers (left and right)
//* Our goal is to move all of the 0s to the RIGHT
//* Or, alternatively, we can move all the NON-ZEROES to the left
//* So effectively, if we think in REVERSE, we can do the above
//* Right moves toward the end of the array each iteration (right++)
//*     - "right" is used to find elements that DO NOT equal 0
//* Left indicates the position of the next element NOT equal to 0
//! If nums[right] !== 0, swap the element with nums[left]
//*     - Then increment left (this lets us retain the relative ordering of nums)
//* Putting the elements that are NOT 0 on the left implicitly puts elements that ARE 0 on the right
function moveZeroes(nums) {
  //* There are either zero or one elements, so just return the array
  if (nums.length <= 1) return nums;

  let left = 0; //* Position of next NON-ZERO element
  let right = 0; //* Searches for NON-ZERO elements

  //* Search for elements that are NOT 0 and put them on the left
  while (right < nums.length) {
    if (nums[right] !== 0) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
    }

    right++;
  }

  return nums;
}

console.log(moveZeroes([0, 0, 1, 2, 0, 3])); //* [1, 2, 3, 0, 0, 0]
console.log(moveZeroes([0, 5, 1, 2])); //* [5, 1, 2, 0]
console.log(moveZeroes([0, 1])); //* [1, 0]
console.log(moveZeroes([1, 0])); //* [1, 0]
console.log(moveZeroes([1])); //* [1]
console.log(moveZeroes([0])); //* [0]

//* Time: O(n) - We iterate through the entire array once

//* Space: O(1) - The memory usage remains constant regardless of input size
