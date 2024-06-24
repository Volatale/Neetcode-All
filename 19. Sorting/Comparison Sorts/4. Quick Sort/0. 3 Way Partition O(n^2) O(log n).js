function quickSort(nums, left = 0, right = nums.length - 1) {
  if (left < right) {
    //* Anything to the left of small is smaller than pivot
    //* Anything to the right of large is larger pivot
    const [small, large] = partition(nums, left, right);

    //* Recursively sort the left and right subarrays too
    quickSort(nums, left, small - 1);
    quickSort(nums, large + 1, right);
  }

  return nums;
}

//* Three Way Partition (Dutch National Flag Algorithm)
//* Choose a random pivot, then swap it with the right element
//* Elements that are LESS than pivot are placed on the left
//* Elements that are GREATER than pivot are placed on the right
function partition(nums, left, right) {
  const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
  const pivot = nums[pivotIndex]; //* Store the value of the pivot before swapping

  //* Swap the right element and the pivot
  [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

  let small = left; //* Index of next smaller element
  let i = left; //* Travels looking for elements to partiton
  let large = right; //* Index of next greater element

  while (i <= large) {
    if (nums[i] < pivot) {
      //* Put the smaller element on the left
      [nums[i], nums[small]] = [nums[small], nums[i]];
      small++;
      i++;
    } else if (nums[i] > pivot) {
      //* Put the larger element on the right
      [nums[i], nums[large]] = [nums[large], nums[i]];
      large--;
    } else {
      i++; //* Don't swap
    }
  }

  //* Return both pivots
  return [small, large];
}

console.log(quickSort([4, 3, 9, 5]));
console.log(quickSort([2, 8, 3, 1]));
console.log(quickSort([10, 2, 3, 5, 4, 6, 7, 9, 8, 1]));
console.log(quickSort([1, 2, 3]));
console.log(quickSort([3, 2, 1]));
console.log(quickSort([5]));

//* Time: O(n log n) or O(n^2)

//* Space: O(log n)
