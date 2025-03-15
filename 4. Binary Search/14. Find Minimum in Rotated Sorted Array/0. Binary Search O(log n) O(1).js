//! Once rotated, the array is at least PARTIALLY sorted
//* An O(log n) time complexity means we need to use binary search
//! The search space is the array itself
//*     - left = 0
//*     - right = nums.length - 1
//* [1, 2, 3, 4, 5], rotate twice
//* [3, 4, 5, 1, 2]
//* If nums[mid] > nums[right]
//*     - Then we are on the wrong side
//*     - We need to move to the right to find the SMALLER elements
//* [1, 2, 3, 4, 5], rotated 5 times
//* if nums[mid] > nums[left]
//*     - nums[right] > nums[left]
//*         - So don't go to the right
//*     - nums[mid] > nums[left]
//*         - So we should probably travel to the left
//! Determine what side "mid" is on
//*     - It is either on the "smaller" side
//*     - Or it is on the "larger" side
function findMin(nums) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* "Mid" is the index of the potential smallest element
    const mid = left + ((right - left) >> 1);

    //* If true, then "mid" is on the LARGER portion of the array
    if (nums[mid] > nums[right]) {
      left = mid + 1; //* Move to the SMALLER portion
    } else {
      right = mid; //* The smaller portion is on the left
    }
  }

  //* The minimum element in the array
  return nums[left];
}

console.log(findMin([1, 2, 3, 4, 5])); //* 1
console.log(findMin([5, 6, 3, 4])); //* 3
console.log(findMin([15, 17, 11, 13])); //* 11
console.log(findMin([20])); //* 20
console.log(findMin([1, 30])); //* 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); //* 0

//* Time: O(log n) - We are eliminating half of the search space every iteration

//* Space: O(1) - The memory usage remains constant regardless of the input size
