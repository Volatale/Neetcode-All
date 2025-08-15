//* We are given an int[] `nums` and are able to replace any element in nums with any number
//* Nums is considered to be `continuous` if:
//*     - All elements in nums are unique
//*     - max(nums) - min(nums) === nums.length - 1
//*         - [1, 2, 3] -> (3 - 1) === 2
//*         - nums.length - 1 === 2
//* We need to return the MINIMUM number of operations to make `nums` continuous
//! Logically speaking, since we need continous elements, sorting the array makes sense
//*     - This introduces a monotonic property to the array in case it didn't already have one
//* The number of operations we may need to make is in the range [0, n - 1]
//* Thus, our "search space" also exists within this range
//! We need to precomute the exact range of values the array must end up with
//*     - The elements in nums are in the range [x...x + n - 1]
//*     - Where `x` is the minimum element in nums
//* For example, if `x` = 4, and the array length is 4
//*     - Then we need a continous array of [4...7]
//*     - Which leaves us with [4, 5, 6, 7] in some ordering
//! In a brute force manner, we can try "starting" with every possible starting point (value)
//*     - Then, we just take the minimum no. of operations within each iteration
//*     - Here, sorting makes no difference since we'd use a set to check for missing elements
//! However, there is no real need to perform these checks in a brute force manner
//*     - We can instead use a sliding window approach
//* The sliding window invariant will enforce that the window holds elements in the range [x..x + n - 1]
//*     - If this invariant is broken, then we know we need to swap some elements
//*     - A valid window has an END value of nums[start] + n + 1
//! Just like in the brute force version, we need to remove the duplicates from the array
//*     - Otherwise we end up with complications
//* Additionally (as in the brute force version)
//*     - We want to try a new start value (x) within each iteration (outer loop)
//*     - The goal is to compute the number of MISSING values that exist within each [start..end] range
//! Essentially, for each `x` (nums[i]), we ensure that the END value exists within the current range
//*     - If it does, we shift `end` and try to make it so that is NOT the case
//* For example, if we have [1, 2, 3], then we don't have to perform ANY operations
//*     - Why? Because the window invariant is never broken
//*     - Thus, minOperations = Math.min(3, 3 - (3 - 0))
//*         - n = 3 (because the length of the array is 3)
function minOperations(nums) {
  //* An array with a single element is continous ([x...x + n - 1])
  if (nums.length === 1) return 0;

  const n = nums.length; //* Length of array BEFORE duplicate removals
  let minOperations = n; //* No. of operations will never exceed n

  //* Remove the duplicates from the array and then sort into ascending order
  nums = [...new Set(nums)].sort((a, b) => a - b);

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* Keep shifting `end` until the sliding window constraint is BROKEN
    while (end < nums.length && nums[end] < nums[start] + n) {
      end++;
    }

    minOperations = Math.min(minOperations, n - (end - start));
    start++; //* Try a new starting point (x)
  }

  return minOperations;
}

console.log(minOperations([1, 2, 3, 4, 5])); //* 0
console.log(minOperations([4, 2, 5, 3])); //* 0
console.log(minOperations([1, 2, 3, 5, 6])); //* 1
console.log(minOperations([1, 10, 100, 1000])); //* 3
console.log(minOperations([1, 1, 1])); //* 2
console.log(minOperations([1, 1, 3])); //* 1
console.log(minOperations([1, 5, 3, 2])); //* 1

//* Time: O(n log n) - The time taken scales with the time necessary to sort the array
//* Additionally, regardless of the sorting algorithm used, we must iterate over the entire array

//* Space: O(sort) - The memory usage scales with the sorting algorithm used
//* In the best case, heap sort is used which results in O(1) space, but merge sort (O(n)) is more likely
