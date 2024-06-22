//! TLE - Don't run it!
function findKthLargest(nums, k) {
  //* k = nums.length - k lets us find the kth smallest (=== ~kth largest)
  return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}

function quickSelect(nums, left, right, k) {
  //* Find the pivot index
  const pivot = partition(nums, left, right);

  if (k < pivot) {
    //* Kth largest exists on the left partition
    return quickSelect(nums, left, pivot - 1, k);
  } else if (k > pivot) {
    //* Kth largest exists on the right partition
    return quickSelect(nums, pivot + 1, right, k);
  } else {
    //* This element IS the kth largest
    return nums[pivot];
  }
}

function partition(nums, left, right) {
  //* Randomize Pivot selection and remain within bounds
  const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));

  //* Swap pivot with the rightmost element
  [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

  let low = left;

  //* Iterate through the entire array
  while (left < right) {
    //* Place SMALLER elements on the left
    if (nums[left] <= nums[right]) {
      [nums[left], nums[low]] = [nums[low], nums[left]];
      low++; //* The element is in the correct position; move to the next
    }

    left++;
  }

  //* Place pivot into the correct position; elements on left are smaller, opposite for right
  [nums[low], nums[right]] = [nums[right], nums[low]];
  return low;
}

console.log(findKthLargest([3, 2, 1], 2)); //* 2
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); //* 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); //* 4
console.log(findKthLargest([5, -10], 1)); //* 5
