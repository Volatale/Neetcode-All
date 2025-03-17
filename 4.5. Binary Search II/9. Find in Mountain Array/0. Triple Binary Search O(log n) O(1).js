//* Mountain Array is defined as:
//*     - arr.length >= 3
//*     - arr[0] < arr[1] < ... arr[i-1] < arr[i]
//*     - arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
//! There are no adjacent duplicates
//* The array is both:
//*     - Monotonically increasing (up to index i)
//*     - Monotonically decreasing (beyond index i)
//* So we can apply binary search
//*     - The search space is at least "partially" sorted

//! Binary Search MULTIPLE times
//* 1st binary search finds the PEAK element
//*     - "p" represents index of the pivot element
//*     - [0..p-1] is monotonically INCREASING (sorted)
//*     - [p + 1, n-1] is monotonically DECREASING (sorted)
//* Check if peakIndex holds the target, if not, continue searching
//* 2nd binary search finds the target in the array [0...p-1]
//*     - If the target exists here, immediately return the index
//* 3rd binary search finds the target in the array [p+1...n-1]
//*     - If the target doesn't exist here then we have to return -1

function findInMountainArray(target, mountainArr) {
  const n = mountainArr.length();

  //* Find the index of the peak element (so we can binary search on [0...p-1] and [p+1...n-1])
  const peakIndex = findPeakElement(0, mountainArr.length() - 1, mountainArr);
  if (mountainArr.get(peakIndex) === target) return peakIndex;

  //* Search the left portion of the subarray for the target ([0...p-1])
  let targetIndex = binarySearch(0, peakIndex - 1, target, mountainArr);
  if (targetIndex !== -1) return targetIndex;

  //* Search the right portion of the subarray for the target ([p+1...n-1])
  targetIndex = binarySearchReverse(peakIndex + 1, n - 1, target, mountainArr);

  return targetIndex;
}

function binarySearch(left, right, target, mountainArr) {
  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (mountainArr.get(mid) >= target) {
      right = mid; //* This "could" be the value, or we need a smaller value
    } else {
      left = mid + 1; //* We need a larger value
    }
  }

  //* Return the index if the target exists, and -1 if not
  return mountainArr.get(left) === target ? left : -1;
}

function binarySearchReverse(left, right, target, mountainArr) {
  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (mountainArr.get(mid) <= target) {
      right = mid; //* The larger values are on the left (sorted in descending order)
    } else {
      left = mid + 1; //* We need a SMALLER value
    }
  }

  //* Return the index if the target exists, and -1 if not
  return mountainArr.get(left) === target ? left : -1;
}

function findPeakElement(left, right, mountainArr) {
  while (left < right) {
    //* Index where the peak element could be
    const mid = left + ((right - left) >> 1);

    if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
      left = mid + 1; //* Peak element has to be on the right
    } else {
      right = mid; //* Peak element must exist on the left
    }
  }

  //* Index of the peak element
  return left;
}

//* Time: O(log n) - It takes O(log n) to find the index of the peak element
//* And finding the target in the two segments of the array (excluding the peak) take O(log n) each

//* Space: O(1) - The memory usage remains constant regardless of input size
