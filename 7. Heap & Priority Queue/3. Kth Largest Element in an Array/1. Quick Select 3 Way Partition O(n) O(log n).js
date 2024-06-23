function findKthLargest(nums, k) {
  //* In [1, 2, 3, 4, 5], 1st smallest === 5th largest, so start from the end
  return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}

function quickSelect(nums, left, right, k) {
  const pivot = partition(nums, left, right);

  if (k < pivot) {
    //* Kth Largest must exist on the left
    return quickSelect(nums, left, pivot - 1, k);
  } else if (k > pivot) {
    //* Kth Largest must exist on the right
    return quickSelect(nums, pivot + 1, right, k);
  } else {
    //* This element IS the Kth Largest
    return nums[pivot];
  }
}

//* Perform a 3-Way Partition (Dutch National Flag Algorithm)
//* This means our partition is optimized even if we have lots of duplicates
//* We also take the random pivot to limit the chance of the O(n^2) worst case
//* Small represents the index of the next element SMALLER than the pivot
//* Large represents the index of the next element GREATER than the pivot
//* "i" travels through the array looking for things to partition
//* Return the MIDDLE element

//* If nums[i] < pivot, swap with small
//*     - Puts the smaller elements on the LEFT
//*     - Increment both small AND i
//*         - We know those elements are partitioned correctly
//* If nums[i] > pivot, swap with large
//*     - Puts the larger elements on the RIGHT
//*     - Decrement right, but leave "i" as is
//*     - The value that "right" held might need to be swapped too
//*         - If we increment "i", we will never sort that element
//* If nums[i] === pivot, just increment i (don't swap)
function partition(nums, left, right) {
  const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
  const pivot = nums[pivotIndex];

  //* Dutch National Flag style
  let small = left; //* Marks position of next smaller element
  let i = left; //* Travels through the array looking to partition
  let large = right; //* Marks position of next greater element

  while (i <= large) {
    if (nums[i] < pivot) {
      //* Put smaller element on the left side
      [nums[i], nums[small]] = [nums[small], nums[i]];
      small++;
      i++;
    } else if (nums[i] > pivot) {
      //* Put larger element on the right side
      [nums[i], nums[large]] = [nums[large], nums[i]];
      large--;
    } else {
      i++; //* Don't swap; value is already in place
    }
  }

  //* Returns the MIDDLE element
  return small + ((large - small) >> 1);
}

console.log(findKthLargest([1, 2, 3], 2)); //* 2
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); //* 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); //* 4
console.log(findKthLargest([5, -10], 1)); //* 5

//* Time: O(n) to O(n^2) - It takes O(n) to iterate through the input array
//* During each iteration, on average, the elements are split into halves
//* So the idea is that we reduce the input size so much per iteration
//* That we deviate away from an O(n^2) time complexity to an O(n)
//* This assumes a good pivot is chosen consistently

//* Space: O(n) - We split the array up into thirds
//* All in all, every element is included in the first iteration (recursive call)
