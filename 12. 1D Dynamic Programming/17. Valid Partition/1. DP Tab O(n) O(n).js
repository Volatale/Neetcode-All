//* Start from 0 and try to get to index "n"
//* There are three cases to handle
//*     - Double Duplicates
//*     - Triple Duplicates
//*     - Increasing subarray

//* Apply tabulation to avoid recursion overhead
function validPartition(nums) {
  if (nums.length < 2) return false;

  const n = nums.length;

  //* dp[i] = Whether or not we can find a partition starting at index i
  const dp = new Array(n + 1).fill(false);

  //* Base Case: It is always possible to partition an empty array
  dp[0] = true;

  for (let i = 0; i < n; i++) {
    //* Case 1: Handle double duplicates
    if (i + 1 < n && nums[i] === nums[i + 1]) {
      dp[i + 2] = dp[i] || dp[i + 2];
    }

    //* Case 2: Handle triple duplicates
    if (i + 2 < n && nums[i] === nums[i + 1] && nums[i] === nums[i + 2]) {
      dp[i + 3] = dp[i] || dp[i + 3];
    }

    //* Case 3: Handle monotonically increasing subarrays
    if (
      i + 2 < n &&
      nums[i] + 1 === nums[i + 1] &&
      nums[i] + 2 === nums[i + 2]
    ) {
      dp[i + 3] = dp[i] || dp[i + 3];
    }
  }

  return dp[n];
}

console.log(validPartition([1, 2, 3])); //* True
console.log(validPartition([4, 4, 4, 5, 6])); //* True
console.log(validPartition([1, 1, 1, 2])); //* False
console.log(validPartition([2, 2])); //* True
console.log(validPartition([5])); //* False

//* Time: O(n) - The DP array takes O(n) to create
//* Then it takes O(n) to solve every subproblem

//* Space: O(n) - The DP array scales with the number of elements
