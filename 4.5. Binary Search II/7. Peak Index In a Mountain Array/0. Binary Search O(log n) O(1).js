//! We can apply Binary Search since the search space is "sorted" (even if the sorting is partial)
//* Values increase to a peak, then they decrease, thus, the array is both:
//*     - Monotonically increasing
//*     - AND Monotonically decreasing
//! How do we define a mountain array?
//*     - A mountain array is guaranteed to have three or more elements
//*         - We can always look at the NEXT element over (mid + 1) and not risk going out of bounds
//*     - On top of that, the array can't have adjacent duplicates
//*         - Thus, it is easy to determine which direction we need to travel in

//* Mid represents the index of the element we THINK stores the peak
//* If the element to the RIGHT of mid is smaller, then the peak element exists on the left somewhere
//!     - OR, the current element is the peak, so don't necessarily eliminate "mid" from the search space
//* If the element to RIGHT of mid is LARGER, the peak exists on the right
//* Ultimately, we want to travel in the direction of the peak
function peakIndexInMountainArray(arr) {
  //* The search space is the array itself
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    //* Index we are checking to see if it holds the peak
    const mid = left + ((right - left) >> 1);

    if (arr[mid] < arr[mid + 1]) {
      left = mid + 1; //* The peak element exists on the right
    } else {
      right = mid; //* We either found the peak element, or it exists on the left
    }
  }

  //* Index of the peak element
  return left;
}

console.log(peakIndexInMountainArray([0, 5, 0])); //* 1
console.log(peakIndexInMountainArray([0, 2, 1, 0])); //* 1
console.log(peakIndexInMountainArray([0, 1, 2, 0])); //* 2
console.log(peakIndexInMountainArray([0, 5, 9, 152, 1])); //* 3
console.log(peakIndexInMountainArray([1, 5, 10, 15, 17, 19, 5, 3])); //* 5
console.log(peakIndexInMountainArray([1, 2, 6, 5, 4, 3, 2])); //* 2
console.log(peakIndexInMountainArray([5, 6, 5])); //* 1
console.log(peakIndexInMountainArray([5, 6, 5, 4])); //* 1
console.log(peakIndexInMountainArray([5, 6, 7, 4])); //* 2

//* Time: O(log n) - We eliminate half of the search space every iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
