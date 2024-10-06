//* Try popping each RANGE of balloons (left, right)
//! Consider popping each balloon LAST (for example, [3] last would be [1, 3, 1])
//* Hence we look LEFT and RIGHT from i (left - 1) (right + 1)
//* Then handle the subarrays WITHIN these ranges
//* Why brute force?
//*     - Because we want the OPTIMAL (maximum) amount of coins considering ALL possible moves
//*     - There is no heuristic we can apply to know which balloon is best for each decision
//*         - Thus, we need to try ALL possible moves and take the maximum from each
//* Since we pop the ith balloon LAST
//*     - That means we can't eliminate "i" from the range
//*     - Because we still need the ith balloon for FUTURE calls
function maxCoins(nums) {
  function burstBalloons(left, right) {
    //* Base Case: There are no more balloons to pop
    if (left > right) return 0;

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

    return maxCoins;
  }

  //* Add a 1 to each side of the input (handles out of bounds)
  nums = [1, ...nums, 1];

  //* Range starts at [1:-2] because [0] and [n-1] are base cases
  return burstBalloons(1, nums.length - 2);
}

console.log(maxCoins([4, 5, 6])); //* 150
console.log(maxCoins([3, 1, 5, 8])); //* 167
console.log(maxCoins([1, 5])); //* 10
console.log(maxCoins([3, 6])); //* 24
console.log(maxCoins([6])); //* 6

//* Time: O(n!) - There are n^2 unique pairings of (left, right)
//* Within each call, we do an O(n) loop, and we try each possible range
//* Essentially, we are doing n! work

//* Space: O(n) - There are n^2 unique subproblems, thus the DP array scales at a rate of n x n
