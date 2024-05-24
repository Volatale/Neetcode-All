function bubbleSortII(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
      }
    }
  }

  return nums;
}

console.log(bubbleSortII([2, 8, 1, 3, 4, 5, 7, 6]));
console.log(bubbleSortII([5, 2, 3]));
console.log(bubbleSortII([1]));
console.log(bubbleSortII([1, 2, 3, 4]));

//* Time: O(n^2) - We have a nested for loop, both of which scale with "n"

//* Space: O(1) - The space usage remains constant regardless of input
