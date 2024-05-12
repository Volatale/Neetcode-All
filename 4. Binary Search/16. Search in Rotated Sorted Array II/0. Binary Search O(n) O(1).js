//* This problem is almost the same as Search in Rotated Sorted Array
//* Except elements are not guaranteed to be unique
//* Imagine we have an input like [1, 1, 0, 1]
//* That means left === mid, and mid === right
//* So all we have to do here is increment left and decrement right
//* Essentially, just skip these elements
//* We are unable to make a decision on where to move if we DON'T skip left and right
function searchInRotatedSortedArrayII(nums, target) {
  //* Find the "pivot" element (the minimum in the rotated sorted array)
  //* Tells us what side of the array we are on
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* Mid represents the index of the element we are testing
    let mid = left + ((right - left) >> 1);

    //* We can't make a decision in this case since they are all equal; skip both left & right
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    }
    //* If true, left to mid is an INCREASING subaray
    else if (nums[mid] >= nums[left]) {
      //* If target exists within these bounds, we are on the correct side
      if (target >= nums[left] && target <= nums[mid]) {
        right = mid;
      } else {
        left = mid + 1; //* We are on the wrong side
      }
      //* Mid to Right is an INCREASING subarray
    } else if (nums[mid] <= nums[right]) {
      //* If target exists within these bounds, we are on the correct side
      if (target >= nums[mid] && target <= nums[right]) {
        left = mid;
      } else {
        right = mid - 1; //* We are on the wrong side
      }
    }
  }

  return nums[left] === target ? true : false;
}

console.log(searchInRotatedSortedArrayII([2, 5, 6, 0, 0, 1, 2], 0)); //* True
console.log(searchInRotatedSortedArrayII([2, 5, 6, 0, 0, 1, 2], 3)); //* False
console.log(searchInRotatedSortedArrayII([0, 0, 0, 3], 1)); //* False
console.log(searchInRotatedSortedArrayII([0, 0, 0, 3], 3)); //* True
console.log(searchInRotatedSortedArrayII([4, 5, 1, 2, 3], 3)); //* True
console.log(searchInRotatedSortedArrayII([4, 5, 1, 2, 3, 4], 4)); //* True
console.log(searchInRotatedSortedArrayII([1], 1)); //* True
console.log(searchInRotatedSortedArrayII([1, 0], 0)); //* True
console.log(searchInRotatedSortedArrayII([1, 0, 1, 1, 1], 0)); //* True

//* Time: O(n) - Binary search itself halves the search space each iteration
//* But take an array like [1, 1, 1, 1, 1, 1] and target = 4
//* nums[left] === nums[right] the whole way through, which means left++, right--
//* Essentially, we process each element in the array and the search space reductions don't happen at all

//* Space: O(1) - The space usage remains constant regardless of the input size
