//* Use a sliding window approach
//* There are no negative elements, so extending the subarray:
//*     - Either leaves the subarray sum as is, or
//*     - The subarray sum increases
//* Likewise, removing an element from the subarray does the opposite
//*     - It either leaves the subarray sum as is (if 0 left the window)
//*     - Or, it will decrease the sum (if 1 left the window)
//* The only problem is... if a valid subarray is [i...j]
//!     - We cannot simply shrink when we get a valid window
//*         - The current subarray could extend on the right
//*         - As in, [i...j + 1] could ALSO be valid, but we don't KNOW that for sure
//!     - But we also cannot simply extend
//*         - We could potentially miss subarrays that ALSO end at index "j"
//! Ideally, we want to both extend AND shrink, but that isn't possible
//* So we can can instead use the exclusion principle
//*     - Exactly(k) = atMost(k) - atMost(k - 1)
//* That way, we CAN maintain the sliding window invariant easily
//* If sum > goal, shrink the window
//* Otherwise, keep extending because the window is valid
function numSubarraysWithSum(nums, goal) {
  //* Exactly(k) = atMost(k) - atMost(k - 1)
  return atMost(nums, goal) - atMost(nums, goal - 1);
}

function atMost(nums, goal) {
  //* We can't have a goal of 0, so zero subarrays equal 0
  if (goal < 0) return 0;

  let subarrays = 0;

  //* Marks the start and end of the window
  let start = 0;
  let end = 0;

  //* Tracks the cumulative sum of elements within the window
  let sum = 0;

  while (end < nums.length) {
    //* Add the current element to the window
    sum += nums[end];

    //* Maintain the sliding window invariant (sum <= goal)
    while (sum > goal) {
      sum -= nums[start++];
    }

    //* There are (end - start + 1) subarrays ENDING at "end"
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(numSubarraysWithSum([1, 0, 1, 0, 1], 2)); //* 4
console.log(numSubarraysWithSum([0, 0, 0, 0, 0], 0)); //* 15
console.log(numSubarraysWithSum([1, 1, 0, 1], 2)); //* 3

//* Time: (n) - In atMost(), we process each element twice at most

//* Space: O(1) - The memory usage remains constant regardless of input size
