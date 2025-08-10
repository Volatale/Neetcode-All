//* We are given an int[] `nums` and the goal is to find a peak element and then return its index
//*     - A peak element is an element that is strictly greater (>) than its neighbors
//*     - We can return ANY of the peaks if there exists more than one
//! Out of bounds elements are considered to be LESS than the adjacent in bounds elements
//*     - That is, nums[-1] === -Infinity, and nums[n] === -Infinity
//! The array is guaranteed to contain at least a single peak element
//*     - Thus, this guarantees that nums[i] !== nums[i + 1] for all `i`
//! Logically speaking, we should always travel toward the larger element
//*     - Why? Because in the worst case, the "peak" element is the first or last
//*     - If it exists as the first or last element, we know for sure that element is greater than at least ONE of its neighbors
//*     - And since we always travel TO larger elements, we know that we already passed the SMALLER element
//* The existence of a peak element implies that there are monotonically increasing subarrays within the array
//*     - Imagine we have [1, 2, 3, 4, 3], the subarrays are:
//*         - [1, 2, 3, 4] and [3, 4] (if we reversed it)
//*     - In other words, each "peak" element is part of TWO subarrays simultaneously
//*     - So all we have to do is keep moving toward the largest element in each subarray and we find the peak
//* And we are searching for a peak element (index) WITHIN the array itself
//! Thus, we can apply a binary search approach
//*     - The search space is the range of indices [0, n - 1]
//*     - And the range of indices is monotonically increasing (therefore we have a sorted search space)
//* `mid` represents the current element we are checking
//*     - If nums[mid] > nums[mid + 1], then we know nums[mid] is LARGER
//*     - Otherwise, nums[mid - 1] is larger than nums[mid], so search left
function findPeakElement(nums) {
  //* The search space is the range of valid indices [0, n - 1]
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* `mid` represents the index we (currently) think is a peak
    const mid = left + ((right - left) >> 1);

    if (mid + 1 < nums.length && nums[mid] >= nums[mid + 1]) {
      right = mid; //* This is a potential canddiate (peek)
    } else {
      left = mid + 1; //* A larger element exists on the right portion
    }
  }

  //* The index of a peak element
  return left;
}

console.log(findPeakElement([1, 2, 3, 4])); //* 3
console.log(findPeakElement([1, 2, 3, 1])); //* 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); //* 5
console.log(findPeakElement([5])); //* 0
console.log(findPeakElement([3, 2])); //* 0

//* Time: O(log n) - The search space is halved each iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
