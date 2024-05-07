//* Don't remove the "mid" element from the search space
//* Right starts at nums.length instead of nums.length - 1
//* It is possible that you have an array like [1, 2, 3], and target = 4
//* That means we need to return 3
function searchInsertPosition(nums, target) {
  //* Index could be the last ([1, 2, 3], target = 4 -> [1, 2, 3, 4])
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = left + ((right - left) >> 1); //* >> Divides by 2 and truncates

    //* We don't elimiate the mid element in this case
    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  //* Either the correct position, or the index target WOULD be at
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
