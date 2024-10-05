//* Try popping each RANGE of balloons (left, right)
//! Consider popping each balloon LAST (for example, [3] last would be [1, 3, 1])
//* Hence we look LEFT and RIGHT from i (left - 1) (right + 1)
//* Then handle the subarrays WITHIN these ranges
//* Why brute force?
//*     - Because we want the OPTIMAL (maximum) amount of coins considering ALL possible moves
//*     - There is no heuristic we can apply to know which balloon is best for each decision
//*         - Thus, we need to try ALL possible moves and take the maximum from each

//* Apply memoization to avoid redundant work
//*     - We have 2D state (left, right)
//*     - There "n" possible values for both left and right respectively
function maxCoins(nums) {
  function burstBalloons(left, right) {
    //* Base Case: There are no more balloons to pop
    if (left > right) return 0;

    //* Utilize memoized value
    if (dp[left][right] !== -1) return dp[left][right];

    let maxCoins = 0;

    //* Pop all balloons within each range
    for (let i = left; i <= right; i++) {
      maxCoins = Math.max(
        maxCoins,
        nums[left - 1] * nums[i] * nums[right + 1] +
          burstBalloons(left, i - 1) + //* Left Subarray
          burstBalloons(i + 1, right) //* Right Subarray
      );
    }

    return (dp[left][right] = maxCoins);
  }

  //* Add a 1 to each side of the input (handles out of bounds)
  nums = [1, ...nums, 1];

  const n = nums.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(-1));

  //* Range starts at [1:-2] because [0] and [n-1] are base cases
  return burstBalloons(1, nums.length - 2);
}

console.log(maxCoins([4, 5, 6])); //* 150
console.log(maxCoins([3, 1, 5, 8])); //* 167
console.log(maxCoins([1, 5])); //* 10
console.log(maxCoins([3, 6])); //* 10

//* Time: O(n^3) - There are n possible values for both left and right respectively
//* In other words, there are n^2 pairs of (left, right) values
//* Within each call, we have an O(n) loop (in the worst case)

//* Space: O(n^2) - There are n^2 unique subproblems, thus the DP array scales at a rate of n x n
