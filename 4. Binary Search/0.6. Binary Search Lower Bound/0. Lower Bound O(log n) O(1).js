function leftBisect(nums, target) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);

    //* Move to the LEFTMOST target, or where target "would" be
    if (nums[mid] >= target) {
      right = mid - 1; //* The value is either too large, or we need the FIRST occurrence
    } else {
      left = mid + 1; //* We need a LARGER value
    }
  }

  //* Index of the first occurrence of target, or where it "would" be
  return left;
}

console.log(leftBisect([1, 1, 1, 1, 1], 1)); //* 0
console.log(leftBisect([1, 2, 3], 4)); //* 3
console.log(leftBisect([1, 2, 3], 2)); //* 1
console.log(leftBisect([5, 5, 6, 7], 4)); //* 0
console.log(leftBisect([5, 5, 6, 7], 5)); //* 0
console.log(leftBisect([1], 0)); //* 0
console.log(leftBisect([1], 1)); //* 0
console.log(leftBisect([1], 2)); //* 1

//* Time: O(log n) - We are eliminating half of the search space each iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
