//* If [i...j] is a valid subarray, there are (n - j) additional elements AFTER this subarray
//* So we can use the formula (nums.length - j) to immediately get all of the extra subarrays
//* Then, since we already considered them, we can begin SHRINKING the window
//*     - All of the subarrays in the range starting at "i" and ending at "j" have been considered
//* So now we can shrink on the left, and check if the window is still valid
//*     - If it is, the subarray will be something like [i + k...j]
//*     - Where "k" is the number of times we moved "i" to the right
//* In other words, "j" (the end index) has not changed, we are merely considering a SMALLER subset of this subarray
//*     - Once again, we already considered everything BEYOND [i...j], so now we need to check subarrays WITHIN that range
function countCompleteSubarrays(nums) {
  const uniques = new Set();

  //* Get the number of distinct elements that exist in nums
  for (let i = 0; i < nums.length; i++) {
    uniques.add(nums[i]);
  }

  const freq = new Map(); //* Frequency of elements in window
  let subarrays = 0;

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* Add the element to the window
    freq.set(nums[end], (freq.get(nums[end]) || 0) + 1);

    //* Shrink on the left until there are k - 1 unique elements in [i...j]
    while (freq.size === uniques.size) {
      //* There are (n - end) elements (including end) AFTER this window, get their subarrays immediately
      subarrays += nums.length - end;

      //* Remove the element from the window
      freq.set(nums[start], freq.get(nums[start]) - 1);

      //* A needed element left the window, we need a replacement
      if (freq.get(nums[start]) === 0) {
        freq.delete(nums[start]);
      }

      start++;
    }

    end++;
  }

  return subarrays;
}

console.log(countCompleteSubarrays([1, 3, 1, 2, 2])); //* 4
console.log(countCompleteSubarrays([5, 5, 5, 5])); //* 10
console.log(countCompleteSubarrays([1, 2, 3, 4])); //* 1
console.log(countCompleteSubarrays([8])); //* 1

//* Time: O(n) - At most, we process each element twice, so the time taken scales with the input size

//* Space: O(k) - The memory usage scales with the number of distinct elements in the input
//* If every element is unique, both the set and the frequency map contain "n" keys/values
