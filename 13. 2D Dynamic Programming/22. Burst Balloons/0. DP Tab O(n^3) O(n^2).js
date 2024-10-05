//* Explore all subarrays of all sizes (starting at size 2)
//* Look at the left and right values from (relative to i itself)

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (left, right)
//*     - There "n" possible values for both left and right respectively
function maxCoins(nums) {
  if (nums.length === 0) return 0;

  //* Add a 1 to each side of the input (handles out of bounds)
  nums = [1, ...nums, 1];
  const n = nums.length;

  //* dp[left][right] = Max coins we can get from range STARTING at left, ENDING at right
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));

  //* Consider subarrays of every range (k = subarray size) starting from 3
  for (let k = 2; k < n; k++) {
    for (let left = 0; left < n - k; left++) {
      let right = left + k; //* Left is our offset

      //* Pop balloons in range [left, right]
      for (let i = left + 1; i < right; i++) {
        dp[left][right] = Math.max(
          dp[left][right],
          nums[left] * nums[i] * nums[right] +
            dp[left][i] + //* Left subarray
            dp[i][right] //* Right subarray
        );
      }
    }
  }

  //* The maximum amount of coins we can collect from the entire range
  //* Starting at element 0, ending at the last
  return dp[0][n - 1];
}

console.log(maxCoins([4, 5, 6])); //* 150
console.log(maxCoins([3, 1, 5, 8])); //* 167
console.log(maxCoins([1, 5])); //* 10
console.log(maxCoins([3, 6])); //* 24
console.log(maxCoins([6])); //* 6

//* Time: O(n^3) - There are n possible values for both left and right respectively
//* In other words, there are n^2 pairs of (left, right) values
//* Within each call, we have an O(n) loop (in the worst case)

//* Space: O(n^2) - There are n^2 unique subproblems, thus the DP array scales at a rate of n x n
