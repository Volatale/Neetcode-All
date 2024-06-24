function quickSort(nums, low = 0, high = nums.length - 1) {
  if (low < high) {
    let j = partition(nums, low, high);

    quickSort(nums, low, j - 1);
    quickSort(nums, j + 1, high);
  }

  return nums;
}

//* "i" finds the first element > pivot
//* "j" finds the first element <= pivot
//* Swap nums[i] and nums[j]
//* Outside of the loop, swap nums[j] and nums[low]
//* "j" then becomes the "pivot"
//* Anything to the left of pivot is smaller
//* Anything to the right is larger
function partition(nums, low, high) {
  let pivot = nums[low];

  let i = low + 1; //* Pivot element is already accounted for
  let j = high;

  while (i <= j) {
    //* Increment "i" until you find an element > pivot
    while (i <= j && nums[i] <= pivot) {
      i++;
    }

    //* Decrement "j" until you find an element <= pivot
    while (i <= j && nums[j] > pivot) {
      j--;
    }

    //* Swap the elements at i and j, or break
    if (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
    } else {
      break;
    }
  }

  [nums[low], nums[j]] = [nums[j], nums[low]];

  //* Partitioning Position
  return j;
}

console.log(quickSort([4, 3, 9, 5]));
console.log(quickSort([2, 8, 3, 1]));
console.log(quickSort([10, 2, 3, 5, 4, 6, 7, 9, 8, 1]));
console.log(quickSort([1, 2, 3]));
console.log(quickSort([3, 2, 1]));
console.log(quickSort([5]));

//* Time: O(n log n) or O(n^2)

//* Space: O(log n)
