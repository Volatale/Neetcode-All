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
//*     - We can instead use a binary search approach
//* We already know the following:
//*     - We have an int[], whose length is n
//*     - The goal is to ensure a valid output by performing [0, n - 1] operations
//*         - The number of operations is monotonically increasing ([0, 1, 2, 3, 4 ... n - 1])
//*     - We are able to sort the array to ensure monotonicity
//* Therefore, we can say that:
//*     - We have a sorted search space (the number of operations in the range [0, n - 1])
//! For each "x" (element in nums), we can easily compute what the END value should be
//*     - For example, if we have [1, 2, 3], then we know for "1", the END value should be 3 ([1, 2, 3])
//* Therefore, we can simply find the (rightmost) insertion position and determine how many elements are in the correct position
//* Then, based on this, we know how many operations we need to perform
//*     - insertionIndex - i
//! Ensure that the duplicates in the input are removed
//*
function minOperations(nums) {
  //* An array with a single element is continous ([x...x + n - 1])
  if (nums.length === 1) return 0;

  const n = nums.length;
  let minOperations = n;

  //* Remove the duplicates from the array and sort to enforce monotonicity
  nums = [...new Set(nums)].sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    const last = nums[i] + n - 1; //* The value of the last element in the supposed subarray
    const index = rightBisect(nums, last); //* Insertion position of where the END value SHOULD be
    const consecCount = index - i; //* [1, 2, 3] = 3
    minOperations = Math.min(minOperations, n - consecCount);
  }

  return minOperations;
}

function rightBisect(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    //* `mid` represents the index we are checking (right-biased mid)
    const mid = left + ((right - left + 1) >> 1);

    if (nums[mid] <= target) {
      left = mid + 1; //* Candidate exists toward the right
    } else {
      right = mid - 1; //* Candidate exists toward the left
    }
  }

  return left;
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
//* Additionally, we create a set of size n, and a copy of size n
