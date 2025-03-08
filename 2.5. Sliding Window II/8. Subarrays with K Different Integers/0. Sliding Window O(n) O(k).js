//* The logic is the same as "Count Complete Subarrays in an Array"
function subarraysWithKDistinct(nums, k) {
  //* Exactly(k) = atMost(k) - atMost(k - 1)
  return atMost(nums, k) - atMost(nums, k - 1);
}

function atMost(nums, k) {
  //* We can't have empty subarrays, so we can't have 0 distinct elements
  if (k <= 0) return 0;

  const freq = new Map(); //* Tracks frequency of elements in the window
  let subarrays = 0;

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* Add the current element to the window
    freq.set(nums[end], (freq.get(nums[end]) || 0) + 1);

    //* Shrink the window to maintain the invariant
    while (freq.size > k) {
      //* Element on the left of the window leaves
      freq.set(nums[start], freq.get(nums[start]) - 1);

      //* Remove elements with 0 frequency
      if (freq.get(nums[start]) === 0) {
        freq.delete(nums[start]);
      }

      start++;
    }

    //* There are (j - i + 1) valid subarrays ENDING at index "j"
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); //* 7
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3)); //* 3
console.log(subarraysWithKDistinct([1, 2, 3, 4], 4)); //* 1
console.log(subarraysWithKDistinct([1, 1, 1, 1], 1)); //* 10

//* Time: O(n) - atMost() has a time complexity of O(2n) -> O(n) and we do this twice
//* In the worst case, each element in nums is processed twice (per call)

//* Space: O(k) - Where "k" is the number of distinct integers in nums
//* In the best case, all of them are the same (so only 1 key/value), in the worst, all are unique (n keys/values)
