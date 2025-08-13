//* We are given a mountain array `nums` (int[])
//*     - The values INCREASE to a peak, after which they will DECREASE
//* The goal is to return the index of the peak
//! The array therefore exhibits a monotonic property
//*     - The array is monotonically INCREASING up to the peak index
//*     - And then after the peak, the values DECREASE
//! Therefore, the array can be said to be sorted (subarray-wise)
//* We are specifically searching for an INDEX within the array
//*     - Thus, our search space is the range of array indices [0, n - 1]
//*     - The range of indices is also monotonically sorted
//* With all of these observations, we can apply a binary search approach
//* Logically speaking, we ALWAYS want to travel in the direction of the LARGER element
//* But the direction we search in flips depending on what side of the array we are on (increasing vs decreasing)
//* We can use the adjacent values to determine what side of the array we are on and then act accordingly
function peakIndexInMountainArray(arr) {
  //* The search space is the range of indices [0, n - 1]
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    //* `mid` represents the index we (currently) think is the peak
    const mid = left + ((right - left) >> 1);

    if (mid + 1 < arr.length && arr[mid] > arr[mid + 1]) {
      right = mid; //* Found a potential candidate, or it exists on the left
    } else {
      left = mid + 1; //* Peak element exists on the right
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

//* Time: O(log n) - The search space is halved each iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
