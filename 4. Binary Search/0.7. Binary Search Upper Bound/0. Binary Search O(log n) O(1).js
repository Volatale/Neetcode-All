function rightBisect(nums, target) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left + 1) >> 1);

    //* Move to the RIGHTMOST target, or where target "would" be
    if (nums[mid] <= target) {
      left = mid + 1; //* The value is either too small, or we need the LAST occurrence
    } else {
      right = mid - 1; //* We need a SMALLER value
    }
  }

  //* Index of the last occurrence of target, or where it "would" be
  return left;
}

console.log(rightBisect([1, 1, 1, 1, 1], 1)); //* 5
console.log(rightBisect([1, 2, 3, 4], 5)); //* 4
console.log(rightBisect([1, 1, 2, 3, 4, 6], 5)); //* 5
console.log(rightBisect([], 10)); //* 0
console.log(rightBisect([10], 1)); //* 0
console.log(rightBisect([1, 2], 3)); //* 2
console.log(rightBisect([1, 2], 1)); //* 1
console.log(rightBisect([1, 2], 0)); //* 0

//* Time: O(log n) - We are eliminating half of the search space each iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
