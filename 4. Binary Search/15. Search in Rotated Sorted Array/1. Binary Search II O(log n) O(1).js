//* We need to find what "side" the mid element exists on
//* If nums[mid] >= nums[left], then we KNOW left to mid (inclusive)
//* Is an INCREASING subarray, in which case, check if target exists within these elements
//* We KNOW the elements can't be duplicates, so everything is strictly increasing from [left .. mid]
//* There is a chance that mid + 1 etc is ALSO increasing, but we can't make any guarantees there
//* If target DOES exist within the bounds of left to mid, then set right = mid
//* That way we search on the left side of the array
//* Else, you know that the target exists on the RIGHT side, and mid is on the left
//* If nums[mid] <= nums[right], then you know mid to right is INCREASING
//* Check if target can exist within the mid to right bounds
//* If it CAN, set left = mid to ensure we check the right side of the array
//* Else, check the left, since the target HAS to exist on the left, or not at all
function searchInRotatedSortedArray(nums, target) {
  //* Find the "pivot" element (the minimum in the rotated sorted array)
  //* Tells us what side of the array we are on
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    //* Mid represents the index of the element we are testing
    let mid = left + ((right - left) >> 1);

    //* If true, left to mid is an INCREASING subaray
    if (nums[mid] >= nums[left]) {
      //* If target exists within these bounds, we are on the correct side
      if (target >= nums[left] && target <= nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1; //* We are on the wrong side
      }
      //* Mid to Right is an INCREASING subarray
    } else if (nums[mid] <= nums[right]) {
      //* If target exists within these bounds, we are on the correct side
      if (target >= nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1; //* We are on the wrong side
      }
    }
  }

  return nums[left] === target ? left : -1;
}

console.log(searchInRotatedSortedArray([4, 5, 1, 2, 3], 2)); //* 3
console.log(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 0)); //* 4
console.log(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 5)); //* 1
console.log(searchInRotatedSortedArray([1], 0)); //* -1
console.log(searchInRotatedSortedArray([3, 1, 2], 2)); //* 2
console.log(searchInRotatedSortedArray([55, 50, 51, 52, 53, 54], 50)); //* 1
console.log(searchInRotatedSortedArray([2, 3], 2)); //* 0
console.log(searchInRotatedSortedArray([4, 5], 5)); //* 1

//* Time: O(log n) - Binary search halves the search space each iteration
//* All of the operations done within the loop are constant time

//* Space: O(1) - The space usage remains constant regardless of the input size
