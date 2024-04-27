//* Lets say "k" = 3
//* "Give me the number of subarrays with at most 3 elements"
//* "Give me the number of subarrays with at most 2 elements"
//* If we remove the "2" (k - 1) subarrays from the original, we are left with exactly 3 (k)
//* Exactly(k) = atMost(k) - atMost(k - 1)
function subarraysWithKDistinct(nums, k) {
  return atMost(nums, k) - atMost(nums, k - 1);
}

function atMost(nums, k) {
  if (k === 0) return 0;

  //* Sliding Window
  let start = 0;
  let end = 0;

  let subarrays = 0;

  const uniques = new Map(); //* Track occurrences

  while (end < nums.length) {
    //* Add an occurrence
    uniques.set(nums[end], (uniques.get(nums[end]) || 0) + 1);

    while (uniques.size > k) {
      //* Remove an occurrence
      uniques.set(nums[start], uniques.get(nums[start]) - 1);

      //* If occurrences are 0, we need to delete it from th emap
      if (uniques.get(nums[start]) === 0) {
        uniques.delete(nums[start]);
      }

      start++;
    }

    //* Every subarray within this window is valid
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(subarraysWithKDistinct([1, 2, 2, 3], 2)); //* 4
console.log(subarraysWithKDistinct([1, 2, 3, 1, 2], 2)); //* 4
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); //* 7
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3)); //* 3
console.log(subarraysWithKDistinct([1, 2, 3, 4, 5, 6], 6)); //* 1
console.log(subarraysWithKDistinct([5, 2], 4)); //* 0
console.log(subarraysWithKDistinct([10], 1)); //* 1

//* Time: O(n) - We iterate through the entire array twice, but O(2n) simplifies to O(n)
//* The sliding window approach allowed us to reduce the amount of repeated work

//* Space: O(k) - The map's size scales with "k". At most there will be k + 1 elements
//* [1, 2, 3], k = 1: means the map will be {1: 1, 2: 1} and then it will decrease to just {2: 1}
