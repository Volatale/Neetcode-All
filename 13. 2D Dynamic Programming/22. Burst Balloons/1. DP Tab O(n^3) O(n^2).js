//* Try popping each RANGE of balloons (left, right)
//! Consider popping each balloon LAST (for example, [3] last would be [1, 3, 1])
//* Hence we look LEFT and RIGHT from i (left - 1) (right + 1)
//* Then handle the subarrays WITHIN these ranges
//* Why brute force?
//*     - Because we want the OPTIMAL (maximum) amount of coins considering ALL possible moves
//*     - There is no heuristic we can apply to know which balloon is best for each decision
//*         - Thus, we need to try ALL possible moves and take the maximum from each

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (left, right)
//*     - There "n" possible values for both left and right respectively
function maxCoins(nums) {
  if (nums.length === 0) return 0;

  //* Add a 1 to each side of the input (handles out of bounds)
  nums = [1, ...nums, 1];
  const n = nums.length;

  //* dp[left][right] = Maximum coins we can get considering range [left, right]
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));

  //* Consider subarrays of every range (size) starting from 1
  for (let size = 1; size <= n - 2; size++) {
    for (let left = 1; left <= n - size - 1; left++) {
      const right = left + size - 1; //* left is our offset (from the lefthand side)

      //* Try popping each balloon within the current range [left, right]
      for (let i = left; i <= right; i++) {
        dp[left][right] = Math.max(
          dp[left][right],
          nums[left - 1] * nums[i] * nums[right + 1] +
            dp[left][i - 1] +
            dp[i + 1][right]
        );
      }
    }
  }

  //* The maximum amount of coins we can collect from the entire range
  return dp[1][n - 2];
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
