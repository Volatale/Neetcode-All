//* We are given two integers `lower` and `higher` and an int[]
//* The goal is to count the total number of pairs such that:
//*     - 0 <= i < j < n
//*     - lower <= nums[i] + nums[j] <= upper
//* Essentially, we cannot reuse the same index in a pair, and the sum of the values must be within the valid range
//* In a brute force manner, we can simply compute every possible pair and only count the valid ones
function countFairPairs(nums, lower, higher) {
  let fairPairs = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = nums[i] + nums[j];

      //* Found a valid "fair" pair
      if (lower <= sum && sum <= higher) {
        fairPairs++;
      }
    }
  }

  return fairPairs;
}

//* Time: O(n^2) - Computing every possible pair of elements requires nested loops
//* Both of which scale with the input size (n)

//* Space: O(1) - The memory usage remains constant regardless of input size
