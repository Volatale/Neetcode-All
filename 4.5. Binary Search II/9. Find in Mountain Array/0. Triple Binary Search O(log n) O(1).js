//* A mountain array meets the following constraints:
//*     - arr.length >= 3
//*     - There exists some index `i` with (0 < i < arr.length - 1) such that:
//*         - arr[0] < arr[1] < ... arr[i - 1] < arr[i]
//*         - arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
//* Given a mountain array, the goal is to return the MINIMUM index such that mountainArray[i] === target
//*     - If it doesn't exist, return -1
//! A mountain array is essentially both monotonically increasing AND decreasing
//*     - There is a monotonically increasing subarray partition [arr[0]..arr[i - 1]]
//*     - And a monotonically decreasing subarray partition [arr[i + 1]..arr[n - 1]]
//! One of our other goals is to MINIMIZE the number of calls to `mountainArray.get()`
//* Additionally, we always favour returning the SMALLEST index that holds `target` (in the case of multiple potential targets)
//! With all of the above, a binary search approach makes sense
//*     - We have sorted search space (the range of indices [0, n - 1])
//*     - And we are attempting to optimize our search (in terms of both number of calls to get and leftmost index)
//* Logically speaking, we know the array is technically split into three groups (increasing, peak, decreasing)
//*     - Therefore, we should probably identify the peak index in the array
//*     - Knowing the peak gives us more information to go on, otherwise we are essentially searching in the dark (with no heuristic)
//* The peak allows us to determine the boundaries for each of the three groups in the array
//*     - For example, if the peak is at index i, then we know:
//*         - Increasing subarray exists in the range [0, i - 1]
//*         - Peak index exists at index i
//*         - Decreasing subarray exists in the range [i + 1, n - 1]
//* Once we have that information, we can determine the side in which it is possible for `target` to exist
//*     - Why? Because if we have [1, 2, 4, 3, 2, 1], and target = 3, then we KNOW it cannot exist on the INCREASING subarray partition
//* Then, we binary search on the INCREASING partition
//*     - If it doesn't exist here, we binary search on the DECREASING partition
//! If it doesn't exist on the decreasing partition either, then we return -1
//* By searching the increasing partition first we GUARANTEE that we get the leftmost index if it exists
//*     - And if it doesn't exist there, but exists in the right partition, then we return that instead (else we return -1)
function findInMountainArray(target, mountainArr) {
  const n = mountainArr.length();

  //* Find the peak index (so we can binary search on [0, p - 1] and [p + 1, n - 1])
  const peakIndex = findPeakIndex(mountainArr, 0, n - 1);
  if (mountainArr.get(peakIndex) === target) return peakIndex;

  //* Search the increasing partition of the subarray [0, p - 1]
  let targetIndex = binarySearch(mountainArr, 0, peakIndex - 1, target);
  if (targetIndex !== -1) return targetIndex;

  //* Search the decreasing partition of the subarray [p + 1, n - 1]
  targetIndex = reverseBinarySearch(mountainArr, peakIndex + 1, n - 1, target);
  if (targetIndex !== -1) return targetIndex;

  //* The target does not exist within the array (on either side of the peak)
  return -1;
}

function binarySearch(nums, left, right, target) {
  while (left < right) {
    //* `mid` represents the index we THINK is the target
    const mid = left + ((right - left) >> 1);

    if (nums.get(mid) >= target) {
      right = mid; //* Found candidate or it exists in the left partition
    } else {
      left = mid + 1; //* The candidate exists in the right partition
    }
  }

  //* Index of the target, or -1 if it doesn't exist
  return nums.get(left) === target ? left : -1;
}

function reverseBinarySearch(nums, left, right, target) {
  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (nums.get(mid) <= target) {
      right = mid; //* Found candidate, or it exists in the left partition
    } else {
      left = mid + 1; //* Candidate exists in the right partition
    }
  }

  //* Index of the target, or -1 if it doesn't exist
  return nums.get(left) === target ? left : -1;
}

function findPeakIndex(nums, left, right) {
  while (left < right) {
    //* `mid` represents the index we THINK is the peak
    const mid = left + ((right - left) >> 1);

    if (nums.get(mid) < nums.get(mid + 1)) {
      left = mid + 1; //* The larger elements exist on the right
    } else {
      right = mid; //* Found candidate, or it exists on the left
    }
  }

  return left;
}

//* Time: O(log n) - In the worst case, we perform three binary searches
//* The first is performed on the entire array size [0, n - 1]
//* The second and third are performed on a smaller partition of the array
//* O(log n) + O(log n) + O(log n)

//* Space: O(1) - The memory usage remains constant regardless of input size
