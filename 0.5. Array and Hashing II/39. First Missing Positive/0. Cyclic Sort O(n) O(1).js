//* We are looking for the first missing POSITIVE
//* In other words, a number in the range [1, n]
//* The task also has the restriction of a solution of O(n) time and O(1) space
//* Cyclic Sort works on numbers in the range [0, n-1] and [1, n]
//*     - It takes O(n) to sort an array using cyclic sort
//*     - And it also sorts in-place, so the memory usage remains constant
//* There are only two possible cases that we have to handle:
//*     - 1. If there is no missing element, then the "missing" element is n + 1
//*         - [1, 2, 3], here "n" = 3, and we are "missing" 4
//*     - 2. We really are missing an element so return the first
//*         - [1, 2, 4], here "n" is 3, and we are missing 3
//* Essentially, we put each element into the correct position
//* For every number in the range [1, n]
//*     - index i should store the value (i + 1)
//*         - 1 should be stored at index 0 (1 - 1 = 0)
//*         - 2 should be stored at index 1 (2 - 1 = 1)
//*         - 5 should be stored at index 4 (5 - 1 = 4)
//* This puts any element OUTSIDE of the range [1, n] on the right somewhere
//* We want the FIRST missing positive
//*     - So iterate from the left until we find it
//* If nums[i] !== i + 1, return i + 1
//*     - Why? Because this element is out of place
function firstMissingPositive(nums) {
  const n = nums.length;
  let i = 0;

  //* Cyclic Sort (it works because only numbers [1, n] are relevant)
  while (i < n) {
    //* Range is [1, n], so store nums[i] >= 1 at index (nums[i] - 1)
    const correctIndex = nums[i] - 1;

    //* Put all nums[i] where (1 <= nums[i] <= n) into the correct index
    if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    } else {
      i++; //* Element is already in the correct position
    }
  }

  //* First Missing Positive = first index where nums[i] !== i + 1
  for (let i = 0; i <= n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }
}

console.log(firstMissingPositive([1, 2, 0])); //* 3
console.log(firstMissingPositive([3, 4, -1, 1])); //* 2
console.log(firstMissingPositive([7, 8, 9, 11, 12])); //* 1
console.log(firstMissingPositive([-3, -2, -1, 0, 1, 2, 3])); //* 4
console.log(firstMissingPositive([2])); //* 1
console.log(firstMissingPositive([1, 2, 3, 6, 7, 8])); //* 4

//* Time: O(n) - Cyclic sort itself takes O(n), then we iterate one more time

//* Space: O(1) - We are sorting in-place, so the memory usage remains constant
