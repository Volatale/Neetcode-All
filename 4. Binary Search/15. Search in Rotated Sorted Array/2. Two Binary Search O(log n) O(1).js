//* By finding the pivot (minimum) element, we know what element SHOULD be at index 0
//* Since the array is sorted, [51, 52, 50] means index 2 has the pivot element (minimum)
//* Then, we check if target should exist on the LEFT of the pivot, or the right
//* We either set left or right to mid depending on the above
//* Finally, we just do a regular binary search on the correct side of the array
//* If the element does NOT exist, then just return -1
function searchInRotatedSortedArray(nums, target) {
  //* Lets us check which side the target should exist on
  const pivot = findPivotElement(nums);

  //* Search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  //* Check which side the target SHOULD exist on (it might not exist in the array at all)
  //* Eliminate any useless values from the search space
  if (nums[pivot] <= target && target <= nums[right]) {
    left = pivot;
  } else {
    right = pivot;
  }

  while (left < right) {
    //* Mid represents the index of the element we want to test
    let mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return nums[left] === target ? left : -1;
}

//* Same as finding the MINIMUM element in a rotated sorted array
function findPivotElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = left + ((right - left) >> 1);

    //* if nums[mid] > nums[right], the mid element is in the GREATER portion
    if (nums[mid] > nums[right]) {
      left = mid + 1; //* Search the right side since elements over there are smaller
    } else {
      right = mid; //* Otherwise we ARE in the smaller portion, so stay on this side
    }
  }

  return left;
}

console.log(searchInRotatedSortedArray([2, 3, 1], 2)); //* 0
console.log(searchInRotatedSortedArray([4, 5, 1, 2, 3], 2)); //* 3
console.log(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 0)); //* 4
console.log(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 5)); //* 1
console.log(searchInRotatedSortedArray([1], 0)); //* -1
console.log(searchInRotatedSortedArray([3, 1, 2], 2)); //* 2
console.log(searchInRotatedSortedArray([55, 50, 51, 52, 53, 54], 50)); //* 1
console.log(searchInRotatedSortedArray([2, 3], 2)); //* 0
console.log(searchInRotatedSortedArray([4, 5], 5)); //* 1

//* Time: O(log n) - We perform TWO binary searches
//* One to find the pivot element, and one to find the target itself

//* Space: O(1) - The space usage remains constant regardless of the input size
