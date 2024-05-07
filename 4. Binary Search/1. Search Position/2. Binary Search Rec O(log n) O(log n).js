//* Don't remove the "mid" element from the search space
//* Right starts at nums.length instead of nums.length - 1
//* It is possible that you have an array like [1, 2, 3], and target = 4
//* That means we need to return 3
function searchInsertPosition(nums, target, left = 0, right = nums.length) {
  //* Base Case
  if (left >= right) return left;

  const mid = left + ((right - left) >> 1); //* >> Divides by 2 and truncates

  if (nums[mid] >= target) {
    return searchInsertPosition(nums, target, left, mid); //* Eliminate the right side
  } else {
    return searchInsertPosition(nums, target, mid + 1, right); //* Eliminate the left side
  }
}

console.log(searchInsertPosition([1, 3, 5, 6], 5)); //* 2
console.log(searchInsertPosition([0, 1, 2, 3], 4)); //* 4
console.log(searchInsertPosition([1, 3, 4, 5], 2)); //* 1
console.log(searchInsertPosition([1, 5, 7, 10], 4)); //* 1
console.log(searchInsertPosition([1, 5, 7, 10], 2)); //* 1
console.log(searchInsertPosition([1], 0)); //* 0
console.log(searchInsertPosition([1], 2)); //* 1
console.log(searchInsertPosition([1, 3], 2)); //* 1

//* Time: O(log n) - We halve the search space every iteration of the loop

//* Space: O(log n) - The number of recursive calls scales logarithmically with the input size
