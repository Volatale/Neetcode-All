//* "k" is essentially the boundary between the left and right
//* First, reverse the entire array from 0 to n - 1
//* Then reverse from 0 up to (but not including) k
//* Finally, reverse from "k" to n - 1
function rotateArray(nums, k) {
  const n = nums.length;

  k = k % n; //* Rotating twice is the same as rotating 4 times if "n" is 2

  reverse(nums, 0, n - 1); //* Reverse the entire array
  reverse(nums, 0, k - 1); //* Reverse the left portion
  reverse(nums, k, n - 1); //* Reverse the right portion

  return nums;
}

function reverse(nums, left, right) {
  //* Swap the left and right elements
  while (left < right) {
    nums[left] ^= nums[right];
    nums[right] ^= nums[left];
    nums[left] ^= nums[right];
    left++;
    right--;
  }

  return nums;
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); //* [5, 6, 7, 1, 2, 3, 4]
console.log(rotateArray([-1, -100, 3, 99], 2)); //* [3, 99, -1, 100]
console.log(rotateArray([5], 1)); //* []
console.log(rotateArray([1, 2], 1)); //* [2, 1]
console.log(rotateArray([0, 1, 2, 3], 2)); //* [2, 3, 0, 1]
console.log(rotateArray([0, 1, 2, 3], 5)); //* [3, 0, 1, 2]
console.log(rotateArray([0, 1], 4)); //* [0, 1]

//* Time: O(n) - The time taken scales with the size of the input

//* Space: O(n) - We create a new array that scales linearly in size proportional to "n"
