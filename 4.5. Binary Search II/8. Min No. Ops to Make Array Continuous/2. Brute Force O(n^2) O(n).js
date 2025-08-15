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
//*     - Then, we just take the minimum
//*     - Here, sorting makes no difference since we'd use a set to check for missing elements
function minOperations(nums) {
  //* An array with a single element is continous ([x...x + n - 1])
  if (nums.length === 1) return 0;

  const n = nums.length;
  const distinct = new Set(nums); //* Get the distinct elements
  let minOperations = Infinity;

  for (let i = 0; i < n; i++) {
    let changes = 0;

    //* Count how many elements in the range [x...x + n - 1] are missing
    for (let x = nums[i]; x <= nums[i] + n - 1; x++) {
      if (!distinct.has(x)) {
        changes++;
      }
    }

    //* Take the minimum no. of operations if possible
    minOperations = Math.min(minOperations, changes);
  }

  return minOperations;
}

console.log(minOperations([4, 2, 5, 3])); //* 0
console.log(minOperations([1, 2, 3, 5, 6])); //* 1
console.log(minOperations([1, 10, 100, 1000])); //* 3
console.log(minOperations([1, 1, 1])); //* 2
console.log(minOperations([1, 1, 3])); //* 1
console.log(minOperations([1, 5, 3, 2])); //* 1

//* Time: O(n^2) - In the worst case, every element in nums is unique
//* So for each outer iteration (n), there are n INNER iterations

//* Space: O(n) - The memory usage scales with the number of unique elements in nums (up to n)
