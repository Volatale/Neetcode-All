//* We can smash ANY two stones, without regard for order
//*     - Based on this logic, we CANNOT use a greedy approach
//*         - Greedy would work if we always smashed the first 2 etc
//*         - Here, we'd need to track the state of what value each stone is
//*         - And also whether not the stone has been destroyed, which is a lot of work
//*     - Instead, we could just sum the weights for every stone
//*         - Then put them into two groups (we know we need to smash two at once)
//*             - Divide by 2 and take the ceil (as the weights are integers)
//*         - Then it becomes a bounded knapsack problem (equal partition subset sum etc)
//* At each step, we can choose to smash or not smash
//*     - Find the minimum possible weight of the leftover coin

//* Apply tabulation to avoid recursion overhead
//*     - There are "n" values for "i"
//*     - And "t" values for target
//*         - So we have 2D state
function lastStoneWeightII(stones) {
  if (stones.length === 0) return 0;

  //* Sum the weights and find the mid-way point
  const sum = stones.reduce((acc, curr) => acc + curr, 0);
  const target = Math.floor(sum / 2);
  const n = stones.length;

  //* dp[i][t] = Whether we can form sum "t" using the first "i" stones
  const dp = new Array(n + 1)
    .fill(0)
    .map(() => new Array(target + 1).fill(false));

  //* It is always possible to achieve a sum of 0
  dp[0][0] = true;

  for (let i = 1; i <= n; i++) {
    for (let t = 0; t <= target; t++) {
      //* Case 1: Exclude current stone
      dp[i][t] = dp[i - 1][t];

      //* Case 2: Include current stone
      if (t >= stones[i - 1]) {
        dp[i][t] = dp[i][t] || dp[i - 1][t - stones[i - 1]];
      }
    }
  }

  //* Find largest "2" that is closest to target
  for (let t = target; t >= 0; t--) {
    if (dp[n][t]) {
      return sum - 2 * t; //* Minimize difference between the two piles
    }
  }

  //! Impossible to reach
  return 0;
}

console.log(lastStoneWeightII([2, 7, 4, 1, 8, 1])); //* 1
console.log(lastStoneWeightII([31, 26, 33, 21, 40])); //* 5
console.log(lastStoneWeightII([2, 3])); //* 1
console.log(lastStoneWeightII([5, 5])); //* 0

//* Time: O(n * t) - We are caching the results of each subproblem
//* There are "n" possible values for "i" and "t" possible values for t -> O(n * t)

//* Space: O(n * t) - There are n * t unique states, and therefore that means there could be n * t keys/values
