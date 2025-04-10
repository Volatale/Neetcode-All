//* int[] nums
//* int lower, upper

//* Return no. of FAIR pairs
//* Pair (i, j) is fair if:
//*     - 0 <= i < j < n
//*     - lower <= nums[i] + nums[j] <= upper
//! "i" and "j" must be different
//* Sum must be within a certain range

//* -10^9 <= nums[i] <= 10^9
//* 1 <= nums.length <= 10^9
//* nums is not sorted
//* nums can contain duplicates
//* -10^9 <= lower <= upper <= 10^9

//* [0, 1, 7, 4, 4, 5], lower = 3, upper = 6

//* In a brute force manner, we could just generate every possible pair
//* Use nested for loops and sum the two values (nums[i], nums[j])
//* If their sum is within the valid range, increment fairPairs
//* Since we iterate left to right, we won't ever count the same pair multiple times
function countFairPairs(nums, lower, upper) {
  let fairPairs = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = nums[i] + nums[j];

      //* The pair (i, j) is fair if the sum is within the valid range
      if (lower <= sum && sum <= upper) {
        fairPairs++;
      }
    }
  }

  return fairPairs;
}

console.log(countFairPairs([0, 1, 7, 4, 4, 5], 3, 6)); //* 6
console.log(countFairPairs([1, 7, 9, 2, 5], 11, 11)); //* 1
console.log(countFairPairs([1, 2, 3, 4], 0, 10)); //* 6

//* Time: O(n^2) - We have a pair of nested for loops, both of which scale with "n"

//* Space: O(1) - The memory usage remains constant regardless of input size
