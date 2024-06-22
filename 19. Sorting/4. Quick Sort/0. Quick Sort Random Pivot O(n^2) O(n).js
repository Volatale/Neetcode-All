//* Partition the array into elements < pivot and > pivot
//* Repeat this process until completion
function quickSort(nums, left = 0, right = nums.length - 1) {
  if (left < right) {
    const pivot = partition(nums, left, right);
    quickSort(nums, left, pivot - 1); //* Quicksort the LEFT partition
    quickSort(nums, pivot + 1, right); //* Quicksort the RIGHT partition
  }

  return nums;
}

//* Find a pivot element
//* Iterate through the array
//* Swap elements to place SMALLER elements on the LEFT
//* Finally, place the pivot into the correct position
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

console.log(quickSort([4, 3, 9, 5]));
console.log(quickSort([2, 8, 3, 1]));
console.log(quickSort([10, 2, 3, 5, 4, 6, 7, 9, 8, 1]));
console.log(quickSort([1, 2, 3]));
console.log(quickSort([3, 2, 1]));
console.log(quickSort([5]));

//* Time: O(n log n) or O(n^2)

//* Space: O(log n)
