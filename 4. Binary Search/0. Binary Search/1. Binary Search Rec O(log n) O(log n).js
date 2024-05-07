//* Recursive Binary Search
function binarySearchRec(nums, target, left = 0, right = nums.length - 1) {
  //* Base Case
  if (left > right) return -1;

  //* Avoid Overflows
  let mid = left + ((right - left) >> 1);

  if (nums[mid] === target) {
    return mid;
  } else if (nums[mid] > target) {
    return binarySearchRec(nums, target, left, mid - 1); //* Eliminate Right
  } else {
    return binarySearchRec(nums, target, mid + 1, right); //* Eliminate Left
  }
}

console.log(binarySearchRec([1, 2, 3, 4, 5], 3)); //* 2
console.log(binarySearchRec([-1, 0, 3, 5, 9, 12], 9)); //* 4
console.log(binarySearchRec([10, 20, 30], 10)); //* 0
console.log(binarySearchRec([-1, 0, 3, 5, 9, 12], -1)); //* 0

//* Time: O(log n) - We halve the search space each time we call the function

//* Space: O(log n) - The number of recursive calls scales with the logarithm base 2 of the input
//* If the input size is 8, then there are 3 recursive calls
