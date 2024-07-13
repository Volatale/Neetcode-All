function lowerBound(nums, target) {
  //* Search space is the nums array itself
  let left = 0;
  let right = nums.length - 1;

  //* Left and Right congregate toward a single value
  while (left < right) {
    let mid = left + ((right - left) >> 1);

    //* We are looking for the FIRST value >= target
    if (nums[mid] >= target) {
      right = mid; //* Don't eliminate "mid", it could be the correct value
    } else {
      left = mid + 1;
    }
  }

  //* Index of the first element >= target
  return left;
}

console.log(lowerBound([0, 5, 9, 13, 17, 19, 20, 22], 15)); //* 4
console.log(lowerBound([0, 2, 4, 7, 8], 1)); //* 1
console.log(lowerBound([5], 5)); //* 0
console.log(lowerBound([0, 5, 13, 19, 22, 41, 55, 68, 72, 81, 98], 69)); //* 8

//* Time: O(log n) - The search space halves each iteration of the loop

//* Space: O(1) - The space complexity remains constant regardless of input size
