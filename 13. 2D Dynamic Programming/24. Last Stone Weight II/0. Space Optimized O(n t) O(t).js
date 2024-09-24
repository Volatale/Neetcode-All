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
//*     - Optimize for space by only using a 1D array
function lastStoneWeightII(stones) {
  if (stones.length === 0) return 0;

  //* Sum the weights and find the mid-way point
  const sum = stones.reduce((acc, curr) => acc + curr, 0);
  const target = Math.floor(sum / 2);
  const n = stones.length;

  //* dp[t] = Largest "pile" we can create for target "t"
  const dp = new Array(target + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let t = target; t >= stones[i]; t--) {
      dp[t] = Math.max(dp[t], dp[t - stones[i]] + stones[i]);
    }
  }

  //* dp[target] represents the largest "pile" we can create
  return sum - 2 * dp[target];
}

console.log(lastStoneWeightII([2, 7, 4, 1, 8, 1])); //* 1
console.log(lastStoneWeightII([31, 26, 33, 21, 40])); //* 5
console.log(lastStoneWeightII([2, 3])); //* 1
console.log(lastStoneWeightII([5, 5])); //* 0

//* Time: O(n * t) - We are caching the results of each subproblem
//* There are "n" possible values for "i" and "t" possible values for t -> O(n * t)

//* Space: O(n ) - We are only using 1D state, so the space usage scales with "target"
