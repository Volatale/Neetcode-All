//* We simply want to find every valid pair (i, j) whose sum < target
//* If we sort the array into ascending order, we know the array is monotonically non-decreasing
//! Why can we sort? Because the index constraint is that i < j
//*     - But nums[i] + nums[j] === nums[j] + nums[i]
//*     - So the ORDER of the two elements doesn't matter
//*         - We don't actually care about the pairs themselves
//*         - The task is simply to COUNT the number of valid pairs
//! Thus, we can find the maximum subarray such that nums[left] + nums[right] < target
//* Use a Two Pointer approach where left starts at 0 and right starts at n - 1
//* If we have a valid subarray where nums[left] + nums[right] < target:
//*     - We can pair nums[left] with every element in the valid subarray
//* For example, take the following example:
//*     - [1, 2, 3, 7], target = 6
//*         - (1 + 7) = 8, so this is invalid
//*         - We need a SMALLER sum, so decrement right
//*     - That gives us [1, 2, 3]
//*         - (1 + 3) = 4, so we know the two extremes are valid
//*     - Thus, we can pair 1 (the value) with every other element in this valid subarray
//*         - (1 + 2) = 3
//*         - (1 + 3) = 4
//!             - So far we have TWO valid pairs
//*     - Then, we increment left (since we already formed every pair using nums[left])
//*     - That leaves us with [2, 3]
//*         - (2 + 3) = 5, so we know the two extremes are valid
//*     - Once again, we can pair nums[left] with every other element in the valid subarray
//*         - (2 + 3) = 5
//* So we end up with 3 pairs (2 + 1)
function countPairs(nums, target) {
  let pairs = 0;

  //* Sort the elements into ascending order (creates monotonicity)
  nums.sort((a, b) => a - b);

  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  //* Find the maximum subarray such that nums[left] + nums[right] < target
  while (left < right) {
    //* Decrement right until nums[left] + nums[right] < target
    while (left < right && nums[left] + nums[right] >= target) {
      right--;
    }

    //* Now we know every nums[left] can pair with everything in the range
    pairs += right - left;
    left++;
  }

  return pairs;
}

console.log(countPairs([1, 2, 3, 7], 6)); //* 3
console.log(countPairs([-1, 1, 2, 3, 1], 2)); //* 3
console.log(countPairs([-6, 2, 5, -2, -7, -1, 3], -2)); //* 10

//* Time: O(n log n) - Sorting an array generally takes O(n log n) time complexity
//* Then, finding the valid pairs takes O(n) in the worst case

//* Space: O(n) - Assuming the sorting algorithm used is merge sort, the memory usage scales with the input size (n)
