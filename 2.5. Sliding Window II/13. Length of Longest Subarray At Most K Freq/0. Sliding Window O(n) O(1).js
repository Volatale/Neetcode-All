//* We can apply a sliding window approach
//* Track the frequency of elements that exist within the window
//* Maintain a sliding window invariant of "Ensure the frequency of every element in the window < k"
//*     - If we EXTEND the window, the frequency of an element always INCREASES
//*     - If we SHRINK the window, the frequency of an element always DECREASES
//* Based on the above, when we extend the window, it is immediately obvious whether the window is invalid
//*     - If the frequency of the current element is > k, then we know the window is INVALID
//*     - Thus, we should shrink on the left until this element has < k occurrences within the window
function maxSubarrayLength(nums, k) {
  const freq = {}; //* Tracks frequency of elements in window
  let maxLength = 0;

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* Add the current element to the window
    freq[nums[end]] = (freq[nums[end]] || 0) + 1;

    //* Maintain the sliding window invariant (frequency of nums[end] should be < k)
    while (freq[nums[end]] > k) {
      freq[nums[start]]--; //* Remove the leftmost element from the window
      start++;
    }

    //* Get the length of the current (valid) subarray
    maxLength = Math.max(maxLength, end - start + 1);
    end++;
  }

  return maxLength;
}

console.log(maxSubarrayLength([1, 2, 3, 1, 2, 3, 1, 2], 2)); //* 6
console.log(maxSubarrayLength([1, 2, 1, 2, 1, 2, 1, 2], 1)); //* 2
console.log(maxSubarrayLength([5, 5, 5, 5, 5, 5, 5], 4)); //* 4
console.log(maxSubarrayLength([1, 2, 3], 1)); //* 3

//* Time: O(n) - At most, we process each element in nums twice
//* So the time complexity scales with the input size (nums.length)

//* Space: O(1) - The memory usage remains constant regardless of input size

//* [1, 2, 3], n = 3
//* n * (n + 1) / 2
