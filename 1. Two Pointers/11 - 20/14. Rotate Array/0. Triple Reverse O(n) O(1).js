//* Given an int[] and an integer "k", we need to rotate the array by "k" steps
//*     - If "k = 3", we move every element over by 3 spaces
//* Firstly, if we take "n" to be nums.length, then k could be GREATER than "n"
//*     - So we perform k = k % n to remove all of the redundant rotations
//* Instead of using a separate array, we can modify the array in place
//* Simply perform three separate reversals in-place centered around "k"
//*     - Reverse the entire array (from 0, n - 1)
//*     - Reverse the left portion of the array (0, k - 1)
//*     - Reverse the right portion of the array (k, n - 1)
function rotate(nums, k) {
  const n = nums.length;

  //* Remove the redundant rotations
  k = k % n;

  reverse(nums, 0, n - 1); //* Reverse the entire array
  reverse(nums, 0, k - 1); //* Reverse the left portion
  reverse(nums, k, n - 1); //* Reverse the right portion

  return nums;
}

function reverse(nums, left, right) {
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); //* [5, 6, 7, 1, 2, 3, 4]
console.log(rotate([-1, -100, 3, 99], 2)); //* [3, 99, -1, 100]
console.log(rotate([5], 1)); //* []
console.log(rotate([1, 2], 1)); //* [2, 1]

//* Time: O(n) - The time taken scales with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
