//* Don't remove the "mid" element from the search space
//* Right starts at nums.length instead of nums.length - 1
//* It is possible that you have an array like [1, 2, 3], and target = 4
//* That means we need to return 3
function searchInsertPosition(nums, target) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length;

  while (left < right) {
    //* Mid represents the index of the element we are testing
    let mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid; //* Don't eliminate mid, this could be our value
    } else {
      left = mid + 1; //* Element is too small
    }
  }

  //* Index of the found element, or where it SHOULD be
  return left;
}

console.log(searchInsertPosition([1, 3, 5, 6], 5)); //* 2
console.log(searchInsertPosition([0, 1, 2, 3], 4)); //* 4
console.log(searchInsertPosition([1, 3, 4, 5], 2)); //* 1
console.log(searchInsertPosition([1, 5, 7, 10], 4)); //* 1
console.log(searchInsertPosition([1, 5, 7, 10], 2)); //* 1
console.log(searchInsertPosition([1], 0)); //* 0
console.log(searchInsertPosition([1], 2)); //* 1

//* Time: O(log n) - We halve the search space every iteration of the loop

//* Space: O(1) - No space usage scales with the input size
