//* Choose a pivot element
//* Iterate through the entire array
//* Elements that are larger than the pivot go into an array
//* Same with elements that are equal, and elements that are smaller
//* There are 3 arays in total
//* Get the length of the larger array and the equal array
//* If k <= larger, the kth largest element HAS to exist in that array
//* Else if k > largerLength + equalLength, it cannot exist on the mid
//* Finally, the kth largest HAS to be the current element
//* We do k - largerLength - equalLength
//* We KNOW those aren't the elements we need so we subtract them from k
//* If we started with "k" = 2, and then larger = 1 and pivot = 1
//* And the smaller array is length 4
//* 2 - 1 - 1 = 0, so that lets us find the "kth" (0th) largest element in "smaller"
//! This version works well for lots of duplicates
function findKthLargest(nums, k) {
  if (nums.length === 0) return null;

  //* Randomly choose an index for the pivot
  const pivotIndex = Math.floor(Math.random() * nums.length);
  const pivot = nums[pivotIndex];

  //* Holds values larger than, equal to or smaller than pivot
  const larger = [];
  const equal = [];
  const smaller = [];

  //* Partition the array
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > pivot) {
      larger.push(nums[i]);
    } else if (nums[i] === pivot) {
      equal.push(nums[i]);
    } else {
      smaller.push(nums[i]);
    }
  }

  if (k <= larger.length) {
    return findKthLargest(larger, k); //* Kth largest HAS to exist on the larger side
  } else if (k > larger.length + equal.length) {
    return findKthLargest(smaller, k - larger.length - equal.length); //* Kth largest HAS to exist on the smaller side
  } else {
    return pivot; //* This element IS the kth largest
  }
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
