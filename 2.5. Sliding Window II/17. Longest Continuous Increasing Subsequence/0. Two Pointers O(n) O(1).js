//* We can use a sliding window / two pointer approach to mark the start and end of the subarray
//! Anything WITHIN the window is monotonically INCREASING
//* Thus, if by EXTENDING the window, that is NOT the case, the window is invalid
//* A valid subarray looks like this: [start...end]
//*     - If [start...end + 1] is INVALID (not monotonically increasing)
//*     - Then we know the subarray invariant has been broken
//! Then we know any subarray in the range [start...end + 1] is ALSO invalid
//*     - So at that point, we might as well just set "start" = "end"
//*     - All of the subarrays within this range are automatically invalid
//* For example, if we have an array like [1, 3, 1, 4]
//*     - [0..1] (1, 3) is a valid window (of size 2)
//*     - [0..2] (1, 3, 1) is INVALID so the sliding window invariant has been broken
//!         - Thus, [1..2] [3, 1] is ALSO invalid
//*         - So why bother trying these subarrays? Just skip them
//* if nums[right] <= nums[right - 1], then the window is invalid
//*     - start = end
function findLengthOfLCIS(nums) {
  //* There is either zero or one element, so just return the length
  if (nums.length <= 1) return nums.length;

  let longest = 0;

  //* Marks the start and end of the increasing subarray
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* The subarray is invalid (non-monotonically increasing)
    if (end > 0 && nums[end] <= nums[end - 1]) {
      start = end; //* Skip all of the subarrays in the range [start...end + 1]
    }

    longest = Math.max(longest, end - start + 1);
    end++;
  }

  return longest;
}

console.log(findLengthOfLCIS([1, 3, 5, 4, 7])); //* 3
console.log(findLengthOfLCIS([2, 2, 2, 2, 2])); //* 1
console.log(findLengthOfLCIS([1, 2, 3])); //* 3
console.log(findLengthOfLCIS([-10])); //* 1
console.log(findLengthOfLCIS([5, 10, 15, 20, 5, 10, 15, 20, 25])); //* 5

//* Time: O(n^2) - We are generating every possible subarray in the worst case

//* Space: O(1) - The memory usage remains constant regardless of input size
