//* We are given an int[] `nums` and an int `k`
//* The goal is to find the `kth` SMALLEST distance among all pairs (i, j) where:
//*     - 0 <= i < j < nums.length
//! The "distance" in this case is defined as the absolute difference between nums[i] and nums[j]
//* Since we need to find the KTH SMALLEST, this hints toward this being an optimization problem
//* In essence, we have a range of possible distances among all pairs, indicated by the smallest and largest values in nums
//* For example:
//*     - [1, 1, 2, 3, 4, 5], k = 2
//*     - Smallest = 1
//*         - Smallest difference possible is 0
//*         - (1 - 1) = 0
//*     - Largest = 5
//*         - Largest difference is nums[0], nums[n-1] (largest - smallest)
//*         - (5 - 1) = 4
//* Our optimal (kth smallest) pair distance lies within this range
//! Additionally, the range of values is monotonically non-decreasing
//* Thus, we can likely apply binary search
//*     - Our search space is the range of pair distances
//*     - And the range of pair distances is monotonically non-decreasing
//* Specifically, our `mid` value will represent the MAXIMUM possible pair distance
//! When it comes to narrowing our search, we can apply sliding window
//*     - Why? Because the same index can be reused for MULTIPLE pairs
//*     - Using sliding window allows us to compute ALL of those possible pairs immediately
//* The main intuition behind the extremes of the array (nums[n-1] - nums[0]) applies here too
//*     - Due to the way that pairs work, if the extremes of an array (or subarray) are valid, so are the pairs WITHIN the subarray
//*     - Lets say we have [1, 2, 3, 4] and start = 0, end = 3
//*         - If (4 - 1) = 3 is valid, then we can pair 1 with EVERY other element in the array (subarray)
//*         - Because as start and end converge, the difference between the values decreases
//*             - Thus, as the distance between start and end increases, so does the difference between the values
//*         - So if nums[end] - nums[start] is valid, so is nums[end] - nums[start + 1]
//* In other words, if nums[start] - nums[end] is valid
//*     - So is EVERY pair in the range [start..end]
//*     - Hence, we can immediately account for every pair in the range
//! The sliding window constraint here is:
//*     - nums[end] - nums[start] <= maxDistance
//*     - Otherwise, we need to shrink the window
//! Additionally, we should SORT the array to ensure monotonicty exists within the array
//*     - This way, we can simply perform a calculation like (nums[j] - nums[i])
//*       as opposed to Math.abs(nums[j] - nums[i])
function smallestDistancePair(nums, k) {
  function canMake(maxDistance) {
    //* Pointers for sliding window
    let start = 0;
    let end = 0;

    let pairs = 0;

    while (end < nums.length) {
      //* Distance is too larger, breaks the constraint
      while (nums[end] - nums[start] > maxDistance) {
        start++;
      }

      //* Immediately account for all the pairs within the current range
      pairs += end - start;
      end++;
    }

    return pairs >= k;
  }

  //* Sort the array into monotonically non-decreasing order
  nums.sort((a, b) => a - b);

  //* The search space is the range of possible pair differences
  let left = 0;
  let right = nums[nums.length - 1] - nums[0];

  while (left < right) {
    //* `mid` represents the maximum pair distance for the current test
    const mid = left + ((right - left) >> 1);

    if (canMake(mid)) {
      right = mid; //* Found successful candidate; don't eliminate from search space
    } else {
      left = mid + 1; //* We need a larger maximum pair distance
    }
  }

  //* Kth Smallest Distance
  return left;
}

console.log(smallestDistancePair([1, 3, 1], 1)); //* 0
console.log(smallestDistancePair([10, 5], 0)); //* 0
console.log(smallestDistancePair([1, 1, 1], 2)); //* 0
console.log(smallestDistancePair([1, 6, 1], 2)); //* 5
console.log(smallestDistancePair([1, 8, 2, 4], 3)); //* 3

//* Time: O(n log n + n log r) - Where `r` is the no. of values in the range [0, nums[n-1] - nums[0]]
//* The array is sorted, which likely takes O(n log n) time
//* Within each binary search iteration (log r), we perform O(n) work

//* Space: O(n) - The memory usage scales with the size of the input due to the sorting algorithm
