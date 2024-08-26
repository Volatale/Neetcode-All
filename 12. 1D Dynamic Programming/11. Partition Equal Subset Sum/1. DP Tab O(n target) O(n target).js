//* The sum needs to be EVEN because otherwise we can't possibly solve the problem
//*     - We cannot break elements up, so 11 / 2, for example, = 5.5
//*     - But we aren't given decimals, so there is no way to make up the sum
//* Either include the current element or exclude it at each step
//! We only have to make ONE subset
//*     - Being able to make ONE subset guarantees we can make the OTHER

//* Apply tabulation to avoid recursion overhead
function canPartition(nums) {
  //* Can't split a single element into 2
  if (nums.length === 1) return false;

  const sum = nums.reduce((acc, curr) => acc + curr, 0);

  //* Sum is ODD, so we'd need decimals to make this target
  if (sum % 2 !== 0) return false;

  const n = nums.length;
  const target = sum / 2;

  //* dp[i][target] = Whether or not we can make up "target" using the first "i" elements
  const dp = new Array(n + 1)
    .fill(false)
    .map(() => new Array(target + 1).fill(false));

  //* We can always partition 0 elements
  dp[0][0] = true;

  //* "i" represents current element
  //* "t" represents current target to make
  for (let i = 1; i <= n; i++) {
    for (let t = 1; t <= target; t++) {
      //* Case 1: Exclude element
      dp[i][t] = dp[i - 1][t];

      //* Only include element if target would remain >= 0
      if (t >= nums[i - 1]) {
        dp[i][t] = dp[i][t] || dp[i - 1][t - nums[i - 1]];
      }
    }
  }

  return dp[n][target];
}

console.log(canPartition([1, 5, 11, 5])); //* True
console.log(canPartition([1, 2, 3, 5])); //* False
console.log(canPartition([4, 3])); //* False
console.log(canPartition([1, 2, 3])); //* True
console.log(canPartition([7])); //* False
console.log(canPartition([6, 6])); //* True

//* Time: O(n * target) - Where "n" is nums.length and "target" is sum(nums) / 2
//* (n + 1) * (t + 1) = n * t + 2
//* We have two non-constant parameters (i and target)

//* Space: O(n * target) - There are n * target unique subproblem results to store
