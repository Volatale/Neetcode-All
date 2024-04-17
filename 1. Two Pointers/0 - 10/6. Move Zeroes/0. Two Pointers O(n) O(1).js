//* Use Two Pointers
//* Anything on the left side of "left" is guaranteed to not be a 0
//* Right moves forward, ahead of left to search for NON-zero elements
//* If we find one, we swap it with nums[left], then increment left
function moveZeroes(nums) {
  let left = 0; //* There are no 0s to the left of "left"
  let right = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[right] !== 0) {
      //* Swapping values
      const temp = nums[right];
      nums[right] = nums[left];
      nums[left] = temp;
      left++;
    }

    right++;
  }

  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); //* [1, 3, 12, 0, 0]
console.log(moveZeroes([0])); //* [0]
console.log(moveZeroes([0])); //* [0]

//* Time: O(n) - The time taken to iterate over the array scales with the size of the input

//* Space: O(1) - The space usage remains constant - we only use two variables
