//* This is just a regular binary search
//* The search space is halved each iteration
function binarySearch(nums, target) {
  //* Start at both ends of the array
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    //* Avoid overflow by subtracting first
    let mid = left + ((right - left) >> 1);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  //* Target does not exist in the array
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5], 3)); //* 2
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); //* 4
console.log(binarySearch([10, 20, 30], 10)); //* 0
console.log(binarySearch([-1, 0, 3, 5, 9, 12], -1)); //* 0

//* Time: O(log n) - We half the input each iteration
//* log2(6) = 2.5... instead of processing each element

//* Space: O(1) - We don't use any extra space that scales with input size
