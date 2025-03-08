//* The input array has "k" unique values
//* For each subarray ENDING at index "j"
//* We count the frequency of values in the subarray:
//*     - nums[i...j]
//* Then, move the left pointer ahead until the window is no longer valid
//*     - We want to find the MINIMUM index "i" such that the subarray does NOT have "k" unique values
//* This indicates that the subarray starting at 0, 1, ..., i - 1 has "k" unique values
//* So we can then simply add "i" subarrays to the result
//* After the inner while loop exits, the subarray [i..j] has EXACTLY K - 1 unique values
//*     - If we include any of the PREVIOUS elements, we'll have exactly "k" unique values in the subarray
//* All of the previous subarrays that END with [i..j] will form a VALID subarray:
//*     - [i - 1, j]
//*     - [i - 2, j]
//*     - ...
//*     - [0, j]
//* Before "i", there are "i" numbers, so "i" subarrays in total
//! Example: [1, 3, 1, 2, 2]
//*     - i: 0, j: 0
//*     - i: 0, j: 1
//*     - i: 0, j: 2 -> Subarray = [3, 1, 2]
//*         - There are exactly 3 distinct numbers
//*         - Then, the inner while loop exits
//*     - i: 2, j: 3 -> Subarray = [1, 2], so only 2 distinct numbers
//*         - There are TWO elements before this subarray starts
//*         - So we have two VALID subarrays that end at "j"
//*             - [3, 1, 2] and [1, 3, 1, 2]
//*     - i: 2, j: 4
//*             - The logic still works here
//*             - [3, 1, 2, 2] and [1, 3, 1, 2, 2]
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
      //* Remove the element from the window
      freq.set(nums[start], freq.get(nums[start]) - 1);

      //* A needed element left the window, we need a replacement
      if (freq.get(nums[start]) === 0) {
        freq.delete(nums[start]);
      }

      start++;
    }

    //* There are "start" (i) valid subarrays ENDING at "end" (j)
    subarrays += start;
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
