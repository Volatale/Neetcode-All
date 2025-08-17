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
//*     - The array doesn't exist anywhere

function findInMountainArray(target, mountainArray) {
  const n = mountainArray.length();

  //* Find the peak index (so we can binary search on [0, p - 1] and [p + 1, n - 1])
  const peakIndex = findPeakIndex(nums);
  if (mountainArray.get(peakIndex) === target) return peakIndex;

  //* Search the increasing partition of the subarray
}
