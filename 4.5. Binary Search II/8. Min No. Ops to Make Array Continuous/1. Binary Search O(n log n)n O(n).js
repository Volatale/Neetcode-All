//* A continous array can be defined as follows:
//*     - All of the element is unique (frequency of 1)
//*     - The difference between the max and minimum elements is equal to nums.length - 1
//! Another way to word this is that, when sorted, nums follows the following formula:
//*     - [x...x + n - 1]
//*     - Where "x" is the minimum element
//* For example, the following arrays are continuous:
//*     - [1, 2, 3]
//*     - As is [4, 5, 6, 7, 8]
//! [1, 4, 5] is NOT continous
//*     - It must follow the range [x...x + n - 1]
//! We can apply Binary Search in our case
//* Eliminate the duplicates from the array (convert it into a set), then sort it
//*     - But before doing so, get the length of the pre-modified array
//* Then, remember that since the array is SORTED, and contains no duplicates
//!     - The array exhibits a monotonically increasing pattern
//* We know the formula for a valid continuous array is:
//*     - [x...x + n - 1] for any starting value "x"
//*     - [1, 2, 3, 4, 5] -> n = 5, x = 1
//*         - (5 - 1) = 4
//*         - (n - 1) === 4, so the array is valid
//* Instead of using a sliding window approach, we can use binary search
//* For every element, find what the LAST element in the range should be
//! Then, use Binary Search to find the insertion index of the last element
//*     - Since the array contains no duplicates, either left or right bisect will work
//* The formula (index - i) tells us how many elements are in the range that ACTUALLY exists in the array
//* Finally, n - (index - i) tells us how many elements we'll need to change given our choice of "x" (the start)
//*     -
function minOperations(nums) {
  const n = nums.length;

  //* The maximum no. of operations is n
  let operations = nums.length;

  //* Remove the duplicates, and sort the array so we can binary search
  nums = [...new Set(nums)].sort((a, b) => a - b);

  //* For every element x, the "valid" range is [x...x + n - 1], use binary search (monotonically increasing)
  for (let i = 0; i < nums.length; i++) {
    const last = nums[i] + n - 1; //* The last value in the "valid" range starting at x
    const index = rightBisect(nums, last); //* The index of the last value
    const rangeLength = index - i; //* The count of elements that are continuous ([1, 2, 3] = 3)
    operations = Math.min(operations, n - rangeLength); //* No. of Elements that are NOT continuous (need to be replaced)
  }

  return operations;
}

function rightBisect(nums, target) {
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

  return left;
}

console.log(minOperations([4, 2, 5, 3])); //* 0
console.log(minOperations([1, 2, 3, 5, 6])); //* 1
console.log(minOperations([1, 10, 100, 1000])); //* 3
console.log(minOperations([1, 1, 1])); //* 2
console.log(minOperations([1, 1, 3])); //* 1
console.log(minOperations([1, 5, 3, 2])); //* 1

//* Time: O(n log n) - Sorting the array takes O(n log n) on average
//* Then, we iterate through the entire input array in the worst case O(n)
//* Within each iteration, we binary search (which takes O(log n))

//* Space: O(n) - In the worst case, every element in nums is unique
