function upperBound(nums, target) {
  //* Search space is the nums array itself
  let left = 0;
  let right = nums.length - 1;

  //* Left and Right congregate toward a single value
  while (left < right) {
    let mid = left + ((right - left + 1) >> 1);

    //* We are looking for the FIRST value >= target
    if (nums[mid] <= target) {
      left = mid;
    } else {
      right = mid - 1; //* Don't eliminate "mid", it could be the correct value
    }
  }

  //* Index of the first element >= target
  return left;
}

console.log(upperBound([1, 2, 3, 4, 5, 9], 7)); //* 9

//* Time: O(log n) - The search space halves each iteration of the loop

//* Space: O(1) - The space complexity remains constant regardless of input size
