//* We are given an array of SORTED integers (ascending order)
//* We are also given an integer "target"
//* The goal is to write a function to search for "target" in nums
//* If target eists, we return its index, otherwise we return -1
//* Since the array is sorted, the array exhibits monotonicity
//*     - In other words, nums[i] < nums[i + 1] ... < nums[n-1]
//* Additionally, the search space is the array itself
//* So we can use a binary search approach instead of performing a linear search
function search(nums, target) {
  //* The boundaries on the search space (the array indices)
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1; //* Search the right portion
    } else {
      right = mid - 1; //* Search the left portion
    }
  }

  //* Target does not exist in the array
  return -1;
}

console.log(search([1, 2, 3, 4, 5], 3)); //* 2
console.log(search([-1, 0, 3, 5, 9, 12], 9)); //* 4
console.log(search([10, 20, 30], 10)); //* 0
console.log(search([-1, 0, 3, 5, 9, 12], -1)); //* 0

//* Time: O(log n) - We are eliminating half of the search space every iteration
//* So the time complexity scales logarithmically (base 2)

//* Space: O(1) - The memory usage does not scale with the input size
