//* Apply a sliding window approach
//* [1, 3, 2, 3, 3], k = 2
//*     - The subarray length is n
//*     - [1, 3, 2, 3] is a VALID subarray
//*         - 3 occurs at least k times (twice)
//! But we can't simply shrink the window here
//! Nor can we keep expanding
//* If a valid subarray spans [i...j]
//*     - Then every element AFTER j is ALSO a valid subarray
//* But there could ALSO be valid subarrays  WITHIN [i...j] as well
//* So we have a problem; we can't simply expand or shrink without missing subarrays
//* Take the example again:
//*     - [1, 3, 2, 3, 3], k = 2
//* [1, 3, 2, 3] is a valid subarray because 3 occurs at least twice
//*     - But there are ALSO elements AFTER index 3 (another 3)
//* We already know that extending the subarray to INCLUDE that element is valid too
//! So we can immediately get the rest of the subarrays that span [i..j] and beyond
//*     - (nums.length - end) = Number of subarrays we'd get by expanding beyond [i...j]
//* Now that the subarrays that require EXPANDING from this start/end point have been handled
//* We can shrink the subarray without missing any other subarrays
//*     - If the subarray remains valid, get all of the "extend" subarrays once again
function countSubarrays(nums, k) {
  const maxElement = Math.max(...nums);
  let freqOfMax = 0; //* Tracks frequency of max element in the window
  let subarrays = 0;

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* Add the current element to the window
    if (nums[end] === maxElement) freqOfMax++;

    //* Collect all of the subarrays from [i...j] and beyond, then shrink
    while (freqOfMax >= k) {
      //* If [i...j] is valid, there are (n - j) EXTRA subarrays to collect
      subarrays += nums.length - end;

      //* Now we are safe to shrink the window (the "extended" subarrays have already been collected)
      if (nums[start] === maxElement) freqOfMax--;
      start++;
    }

    end++;
  }

  return subarrays;
}

console.log(countSubarrays([1, 3, 2, 3, 3], 2)); //* 6
console.log(countSubarrays([1, 3, 2, 1], 3)); //* 0
console.log(countSubarrays([1, 2, 3, 4, 5], 1)); //* 5
console.log(countSubarrays([5, 5, 5, 5], 4)); //* 1

//* Time: O(n) - In the worst case, we process each element in nums three times
//* Once to get the max element in nums, and twice for the sliding window logic O(3n) -> O(n)

//* Space: O(1) - The memory usage remains constant regardless of input size
