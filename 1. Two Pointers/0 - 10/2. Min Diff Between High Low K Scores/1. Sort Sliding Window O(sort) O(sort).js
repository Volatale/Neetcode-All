//* We want to minimize the difference between the highest and lowest scores
//* Sorting the array essentially puts a "constraint" on the minimum and maximum
//*     - The 0th element is the minimum, and the (n-1)th element is the maximum
//* We need to choose "k" of the scores whose differences are minimized
//* So this can be handled using a sliding window approach
//*     - It is similar to a fixed size sliding window (of size k in this case)
//! We can use the formula nums[i] - nums[i - k + 1] to get the difference
//* Why does this work? Because the array (when sorted) exhibits monotonicity
//*     - Which means that we know nums[i] <= nums[i + 1] <= ... <= nums[n - 1];
//* nums[i] is the maximum in this (size k) subarray and nums[i - k + 1] is the minimum
//* We want subarrays of size "k", but arrays are 0-indexed
//*     - So initialize "i" to k - 1 (uf k = 2, i should be 1 initially ([0, 1] = 2 elements))
//*     - Whenever we need the minimum in this subarray, nums[i - k + 1]
//*         - If "i = 1" and "k = 2", then [1 - 2] puts us out of bounds
//*           Add one to fix the offset (1 - 2 + 1 = 0)
//*     - This gives us (nums[1] - nums[0])
function minimumDifference(nums, k) {
  //* If there is only one element then nums[0] is both the min and max
  if (k === 1) return 0;

  //* Sort the array to ensure the scores are monotonically non-decreasing
  nums.sort((a, b) => a - b);

  //* Assume there is no minimum initially
  let minDiff = Infinity;

  //* Get the difference between the max and min element for each size "k" subarray
  for (let i = k - 1; i < nums.length; i++) {
    const diff = nums[i] - nums[i - k + 1];
    minDiff = Math.min(minDiff, diff);
  }

  return minDiff;
}

console.log(minimumDifference([90], 1)); //* 0
console.log(minimumDifference([9, 4, 1, 7], 2)); //* 2
console.log(minimumDifference([7, 3, 4, 1, 2], 3)); //* 2
console.log(minimumDifference([1, 2, 3, 4, 5], 3)); //* 2
console.log(minimumDifference([100, 200, 500, 300], 2)); //* 100

//* Time: O(sort) - Sorting the array takes O(n log n) on average (merge sort, quick sort etc.)
//* However, it takes O(n) to find the minimum difference in the worst case

//* Space: O(sort) - The memory usage scales with the sorting algorithm used under the hood
//* Merge sort uses O(n) memory, quick sort would use O(log n) and heap sort would use O(1)
//* On average, we'll assume merge sort is used, so that would be O(n) memory usage
