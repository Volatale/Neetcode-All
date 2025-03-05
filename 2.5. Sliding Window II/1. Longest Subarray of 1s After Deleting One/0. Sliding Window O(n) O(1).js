//* Use a sliding window approach
//* Track the number of zeroes that exist within the current window
//* If that number > 1, then THE WINDOW IS INVALID
//*     - To repair the sliding window invariant, we have to SHRINK it on the left
//* Remove the leftmost element from the sliding window
//*     - If it is a 0, then we can decrement zeroes
//*     - Why? Because a "0" has left the window, which means we can now fit another
//* Keep shrinking until the window is valid again (zeroes <= 1)
//* For a VALID window, we can assume ALL of the elements within the window are 1s
//*     - Why? Because we HAVE to delete an element regardless
//*     - So if we find a valid subarray, we can just subtract 1 from its length
//* At the very end, deleting a 0 or a 1 will have the same effect
//*     - The window was already valid, so we know losing an element decreases the subarray length
function longestSubarray(nums) {
  let maxOnes = 0;
  let zeroes = 0; //* Count of zeroes that exist in the window

  //* Pointers used to mark start and end of the sliding window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    if (nums[end] === 0) zeroes++;

    //* Too many zeroes in window - Shrink window until zeroes <= 1
    while (zeroes > 1) {
      if (nums[start] === 0) zeroes--; //* A zero left the window
      start++;
    }

    //* Check if we have a new maximum
    maxOnes = Math.max(maxOnes, end - start + 1);
    end++;
  }

  //* Subtract one from the max consecutive ones
  return maxOnes > 0 ? maxOnes - 1 : 0;
}

console.log(longestSubarray([1, 1, 0, 1])); //* 3
console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])); //* 5
console.log(longestSubarray([1, 1, 1])); //* 2

//* Time: O(n) - We iterate over the entire nums array, which takes O(n)

//* Space: O(1) - The memory usage remains constant regardless of input size
