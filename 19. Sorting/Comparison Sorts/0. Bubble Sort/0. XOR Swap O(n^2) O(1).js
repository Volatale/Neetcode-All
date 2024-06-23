//* XOR Swaps won't work for floats, so be careful
//* Swap adjacent elements that are out of order
function bubbleSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        nums[i] ^= nums[j];
        nums[j] ^= nums[i];
        nums[i] ^= nums[j];
      }
    }
  }

  return nums;
}

console.log(bubbleSort([2, 8, 1, 3, 4, 5, 7, 6]));
console.log(bubbleSort([5, 2, 3]));
console.log(bubbleSort([1]));
console.log(bubbleSort([1, 2, 3, 4]));

//* Time: O(n^2) - We have a nested for loop, both of which scale with "n"

//* Space: O(1) - The space usage remains constant regardless of input
