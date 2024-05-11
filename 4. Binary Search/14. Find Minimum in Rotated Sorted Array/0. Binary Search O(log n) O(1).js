//* The array is sorted, so we know there is a monotonic element
//* We are told to find the MINIMUM in the rotated sorted array
//* So there exists a point in the array in which ASCENDING swaps to DESCENDING
//* And vice versa, our aim is to detect this exact index
//* We know the elements are UNIQUE, the array is SORTED, and we have monotonicity
//* So naturally, binary search will work here
//* We just need to know what side the mid element is currently on
//* So check the right neighbor, if nums[mid] > nums[right]
//* Then you know the "right" side of the array is SMALLER
//* Therefore, search in the right portion of the array (left = mid + 1 eliminates the left)
//* Otherwise, we KNOW we are in the smaller portion since nums[mid] < nums[right]
//* In that case, search the left portion
function findMinimumInRotatedSortedArray(nums) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  //* Left and right will converge on the MINIMUM element eventually
  while (left < right) {
    //* Mid represents the index of the element we want to check
    let mid = left + ((right - left) >> 1);

    //* True means that "mid" is on the LARGER portion of the array
    if (nums[mid] > nums[right]) {
      left = mid + 1; //* Move to the SMALLER portion of the array
    } else {
      right = mid; //* We ARE on the smaller portion, don't eliminate mid, this could be the minimum
    }
  }

  //* This is the minimum element
  return nums[left];
}

console.log(findMinimumInRotatedSortedArray([3, 4, 5, 1, 2])); //* 1
console.log(findMinimumInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2])); //* 0
console.log(findMinimumInRotatedSortedArray([11, 13, 15, 17])); //* 11

//* Time: O(log n) - We halve the search space each iteration of the loop

//* Space: O(1) - The space usage remains constant regardless of the input size
