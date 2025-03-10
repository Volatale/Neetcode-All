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
//* In our case, we can apply a sliding window approach
//*     - We need to REMOVE THE DUPLICATES from the nums array/
//*         - Otherwise it causes complications later
//*     - But before we do so, record the length of the unmodified array
//* Maintain the sliding window invariant:
//!     - A valid window has an END value of nums[start] + n - 1
//* So keep expanding the window while this invariant is true
//* Then, we can count the number of elements that DON'T exist in the window
//*     - (end - start). We don't add 1 here since "end" is one index AHEAD of the valid window
//* After every iteration, we increment "start" because we want to try with a new minimum
//! This logic only works if we sort the array
//*     - This is what allows us to check if the current window is valid or not
function minOperations(nums) {
  //* The length of the ORIGINAL array (before duplicates are removed)
  const n = nums.length;
  let operations = n; //* No. of operations needed does not exceed n

  //* Remove the duplicates from the array, then sort in ascending order
  nums = [...new Set(nums)].sort((a, b) => a - b);

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  while (start < nums.length) {
    //* Shift "end" while window is valid: valid range is [x...x + n + 1] (min, max)
    while (end < nums.length && nums[end] < nums[start] + n) {
      end++;
    }

    //* The "end" pointer is NOT inclusive (we went 1 index BEYOND the valid index, so no + 1)
    operations = Math.min(operations, n - (end - start));
    start++; //* Try a new minimum value
  }

  return operations;
}

console.log(minOperations([4, 2, 5, 3])); //* 0
console.log(minOperations([1, 2, 3, 5, 6])); //* 1
console.log(minOperations([1, 10, 100, 1000])); //* 3
console.log(minOperations([1, 1, 1])); //* 2
console.log(minOperations([1, 1, 3])); //* 1
console.log(minOperations([1, 5, 3, 2])); //* 1

//* Time: O(n log n) - We have to sort the array, so the time taken scales with the time needed to sort

//* Space: O(sort) - The memory usage scales with the sorting algorithm used
