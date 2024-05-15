//* This is just a regular binary search
//* The search space is halved each iteration
function binarySearch(nums, target) {
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

console.log(binarySearch([1, 2, 3, 4, 5], 3)); //* 2
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); //* 4
console.log(binarySearch([10, 20, 30], 10)); //* 0
console.log(binarySearch([-1, 0, 3, 5, 9, 12], -1)); //* 0

//* Time: O(log n) - We half the input each iteration
//* log2(6) = 2.5... instead of processing each element

//* Space: O(1) - We don't use any extra space that scales with input size
