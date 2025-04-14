//* Create a sorted array from the elements in "instructions"
//* We start with an empty container "nums"
//* For each element (left to right) in instructions, insert it into nums
//* Before we do anything, we have to query:
//*     - The number of elements < nums[i]
//*     - And the number of elements > nums[i]
//* Then, we take the minimum of both of these
//! How do we know how many elements are less than or greater than nums[i]?
//* Use binary seach to find both the leftmost AND rightmost insertion indices of nums[i]
//*     - No. of Elements < nums[i] = leftInsertionIndex
//*     - No. of Elements > nums[i] = n - rightInsertionIndex
//* Since the future results depend on the previous results, we should track nums as we go
//*     - (Literally) insert the elements into nums
//*     - We need to ensure the array remains sorted afte every iteration
//*         - Otherwise the binary searched indices wll be incorrect

//* Example: [1, 5, 6, 2]
//*     [] -> min(0, 0) = 0. Insert 1
//*         - [1]
//*     [1] -> min(1, 0) = 0. Insert 5
//*         - [1, 5]
//*     [1, 5] -> min(2, 0) = 0. Insert 6
//*         - [1, 5, 6]
//*     [1, 5, 6] -> min(1, 2) = 1. Insert 2
//*         - [1, 2, 5, 6]
function createSortedArray(instructions) {
  const nums = [];
  let totalCost = 0;

  //* Insert the elements into nums
  for (let i = 0; i < instructions.length; i++) {
    const leftInsertionIndex = bisectLeft(nums, instructions[i]);
    const rightInsertionIndex = bisectRight(nums, instructions[i]);

    //* No. of Elements < nums[i] = leftInsertionIndex
    //* No. of Elements > nums[i] = n - rightInsertionIndex
    totalCost += Math.min(
      leftInsertionIndex,
      nums.length - rightInsertionIndex
    );

    //* Add the element to the array
    nums.splice(rightInsertionIndex, 0, instructions[i]);
  }

  return totalCost % (10 ** 9 + 7);
}

function bisectLeft(nums, target) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  //* Leftmost insertion position
  return left;
}

function bisectRight(nums, target) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left + 1) >> 1);

    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  //* Leftmost insertion position
  return left;
}

console.log(createSortedArray([1, 5, 6, 2])); //* 1
console.log(createSortedArray([1, 2, 3, 6, 5, 4])); //* 3
console.log(createSortedArray([1, 3, 3, 3, 2, 4, 2, 1, 2])); //* 4

//* Time: O(n^2) - For every element in instructions, we perform two binary searches O(log n)
//* However, inserting takes O(n) in the worst case because we have to splice the array
//* If we had a (sorted) map (like in C++), or a TreeMap (like in Java), this could be done in O(n log n)

//* Space: O(n) - The memory usage scales linearly with the input size
//* The nums array has the same size as the input (nums.length)
