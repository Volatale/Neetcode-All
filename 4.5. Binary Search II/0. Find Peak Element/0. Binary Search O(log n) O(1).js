//* We need to make some observations:
//!     - The array contains MULTIPLE peaks, so we can return ANY of them
//!     - Out of bounds elements are treated as -infinity
//*         - So in bounds elements are ALWAYS considered to be larger than out of bounds elements
//* For an array to have a peak element, we cannot have any adjacent duplicates
//*     - For example, [1] DOES have a peak element (1 is greater than both its neighbors)
//*     - But [1, 1] does NOT have a peak element: the ones are greater than -infinity, but 1 === 1
//! So another observation we can make is that:
//*     nums[i] !== nums[i + 1] for all i
//* The array is not necessarily FULLY sorted, but it is PARTIALLY sorted into segments
//*     - Since we know nums[i] !== nums[i + 1], at least ONE of the neighbors of an element is larger
//* Ultimately, we want to move in the direction of the LARGER element
//* Remember, there are MULTIPLE peaks, and we can return any of them
//* If nums[mid + 1] > nums[mid], then we should move in that direction
//!     - We already know nums[mid + 1] is greater than nums[mid - 1], so nums[mid + 1] > one of two neighbors
//*     - If the NEXT element after nums[mid + 1] is out of bounds, or that element is greater than ITS neighbor
//*         - Then we know that element is a peak element
//! We can make this observation solely because out of bounds elements are always treated as -infinity
function findPeakElement(nums) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* "mid" represents the index we're testing (to see if nums[mid] is a peak)
    const mid = left + ((right - left) >> 1);

    //* Move in the direction of the larger neighbor
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1; //* There is a larger neighbor to the right
    } else {
      right = mid; //* This is potentially a peak element; don't remove it from the search space
    }
  }

  //* The index of one of the array's peak elements
  return left;
}

console.log(findPeakElement([1, 2, 3, 4])); //* 3
console.log(findPeakElement([1, 2, 3, 1])); //* 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); //* 5
console.log(findPeakElement([5])); //* 0
console.log(findPeakElement([3, 2])); //* 0

//* Time: O(log n) - We eliminate half of the search space every iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
