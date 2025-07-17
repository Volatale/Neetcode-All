//* A `peak` element is said to be strictly greater than its neighbors
//* Given an integer array, we need to return any peak that exists in the array
//*     - There can be multiple peaks in the same input
//! Out of bounds is always considered -Infinity (so in-bounds elements are always greater)
//* One observation we can make is that if we travel toward the larger elements, we will always find the peak
//* Either the element will be greater than both its neighbors
//* Or, it'll be greater than ONE of its neighbors, and the other element is out of bounds
//* We are searching for something within the array, so our search space is the array itself/
//*     - Specifically, the array indices, which are monotonically increasing
//* There is also no problem with duplicate elements; we can return ANY of the potential peaks
//*     - So we continuously move toward ANY of the larger elements
//* If nums[mid] > nums[mid + 1], then we are already at the larger element
//*     - right = mid (don't eliminate this element from the search space)
//* Otherwise, a larger element exists in the right partition somewhere
//*     - left = mid + 1 (eliminate the current element)
function findPeakElement(nums) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* Mid represents the element we are checking for "peak" property
    const mid = left + ((right - left) >> 1);

    if (mid + 1 === nums.length || nums[mid] > nums[mid + 1]) {
      right = mid; //* Search the left partition
    } else {
      left = mid + 1; //* Search the right partition
    }
  }

  return left;
}

console.log(findPeakElement([10])); //* 0 (10)
console.log(findPeakElement([1, 5, 2])); //* 1 (5)
console.log(findPeakElement([1, 2, 5, 1])); //* 2 (5)
console.log(findPeakElement([1, 2, 3, 7])); //* 3 (7)
console.log(findPeakElement([1, 2, 3, 7])); //* 3 (7)
console.log(findPeakElement([55, 66, 67, 68, 69])); //* 4 (69)
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); //* 5 (6)

//* Time: O(log n) - We halve the search space each iteration, so the time taken is logarithmic with respect to `n`

//* Space: O(1) - The memory usage remains constant regardless of input size
