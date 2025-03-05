//* Now that we know we can track the bits that exist in the current subarray
//* There is another approach we can try: Sliding Window
//* The sliding window invariant means we need to keep ONLY valid elements within the window
//* If we ever add an element to the window that is NOT valid (bitmask & nums[j] !== 0)
//*     - Then we know we need to shrink the window until it IS valid
//* In other words, when expanding, we can tell whether we still have a valid window or not
//* So it is possible to uphold the sliding window invariant
//* If a subarray from [0, n] inclusive is valid
//*     - Then any subarray WITHIN that subarray is ALSO valid
//*     - Since we know all of the elements within the subarray will AND with each other to equal 0
function longestNiceSubarray(nums) {
  let longest = 1; //* One element is always nice

  //* Sliding Window
  let start = 0;
  let end = 0;

  //* Tracks bits of elements that exist in window (subarray)
  let bitmask = 0;

  while (end < nums.length) {
    //* If adding nums[end] to the subarray would make it invalid, shrink
    while ((bitmask & nums[end]) !== 0) {
      bitmask = bitmask & ~nums[start++]; //* Remove the bits in nums[start] from the bitmask
    }

    //* Add the current element to the subarray
    bitmask |= nums[end];

    //* Check the length of the valid subarray
    longest = Math.max(longest, end - start + 1);
    end++;
  }

  return longest;
}

console.log(longestNiceSubarray([1, 3, 8, 48, 10])); //* 3
console.log(longestNiceSubarray([3, 1, 5, 11, 13])); //* 1
console.log(longestNiceSubarray([4, 8])); //* 2

//* Time: O(n) - We iterate through the entire array once, so the time taken scales with "n"

//* Space: O(1) - The memory usage remains constant regardless of input size
