//* We are trying to count the number of "valid" subarrays
//* Specifically, the number of subarrays that have EXACTLY "k" distinct elements
//*     - Where "k" is the number of distinct elements in nums
//*     - So essentially, we just need to count subarrays that have one of each unique element
//* We can use a sliding window variation:
//*     - Exactly(k) = atMost(k) - atMost(k-1)
//* The number of subarrays that have AT MOST "k" distinct elements gives us an overestimation
//* Then, we subtract the overestimation (the number of subarrays with exactly "k - 1" distinct elements)
//* This gives us the number of subarrays with EXACTLY K distinct elements
//! atMost(nums, uniques) gives us EVERY subarray possible
//*     - Why? Because there can only ever be UP TO "n" distinct elements
//*     - In other words, the number of distinct elements that are in the window can NEVER be > k
//*         - So we never end up shrinking the window for that call
//! atMost(nums, uniques - 1) on the other hand WILL shrink
//*     - At most, the window will have "n" distinct elements
//*     - THIS call WILL shrink the window in some cases
//*     - We shrink if there is ever a scenario where there are EXACTLY "k" distinct elements
//*         - Why? We are trying to remove the EXCESS; not shrinking here would remove all of the valid subarrays too
function countCompleteSubarrays(nums) {
  const uniques = new Set(nums).size;

  //* Exactly(k) = atMost(k) - atMost(k-1) -> atMost(k) is an overestimation, atMost(k-1) removes the extra
  return atMost(nums, uniques) - atMost(nums, uniques - 1);
}

function atMost(nums, k) {
  //* We can't have an empty subarray, so immediately return 0
  if (k <= 0) return 0;

  const freq = new Map();
  let subarrays = 0;

  //* Marks the start and end of the current window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* Add the current element to the window
    freq.set(nums[end], (freq.get(nums[end]) || 0) + 1);

    //* Shrink window if we exceed "k" distinct numbers
    while (freq.size > k) {
      freq.set(nums[start], freq.get(nums[start]) - 1);

      if (freq.get(nums[start]) === 0) {
        freq.delete(nums[start]);
      }

      start++;
    }

    //* No. of Valid subarrays ENDING at index "end"
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(countCompleteSubarrays([1, 3, 1, 2, 2])); //* 4
console.log(countCompleteSubarrays([5, 5, 5, 5])); //* 10
console.log(countCompleteSubarrays([1, 2, 3, 4])); //* 1
console.log(countCompleteSubarrays([8])); //* 1

//* Time: O(n) - The function atMost() has a time complexity of O(n) since we process each element at most twice
//* We do this twice, so that ends up being O(2n) + O(2n) -> O(n)

//* Space: O(k) - The memory usage scales with the number of distinct elements in the input
//* If every element is unique, both the set and the frequency map contain "n" keys/values
