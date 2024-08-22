//* At each step, we have two choices: include or exclude the current value
//* Including the element may have consequences later on
//* And excluding the element may not work out in the end
//* So we need to try BOTH paths to ensure the optimal choice

//* Apply Tabulation to avoid recursion overhead
//* "w" is the capacity of the knapsack
//* "i" is the index of the current element
//! Recurrence Relation: F(w, i) = max(F(w - weights[i], i + 1) + values[i], F(w, i + 1))
function zeroOneKnapsack(n, capacity, values, weights) {
  //* dp[i][w] = Max value we can get with the first "i" items and capacity "w"
  const dp = new Array(n + 1)
    .fill(0)
    .map(() => new Array(capacity + 1).fill(0));

  //* Max value we can get from a capacity 0 knapsack is 0
  dp[0][0] = 0;

  //* i = index to consider up to
  //* w = current capacity we are considering
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      //* Case 1: Exclude the current element
      dp[i][w] = dp[i - 1][w];

      //* Case 2: Include the current element
      if (w - weights[i - 1] >= 0) {
        dp[i][w] = Math.max(
          dp[i][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }

  return dp[n][capacity];
}

console.log(zeroOneKnapsack(3, 4, [2, 3, 4], [3, 4, 2])); //* 4
console.log(zeroOneKnapsack(3, 5, [1, 2, 5], [2, 4, 3])); //* 6
console.log(zeroOneKnapsack(1, 10, [10], [10])); //* 10
console.log(zeroOneKnapsack(5, 4, [1, 2, 3, 4, 5], [5, 6, 7, 8, 9])); //* 0
console.log(zeroOneKnapsack(3, 10, [1, 2, 3], [4, 5, 6])); //* 4
console.log(zeroOneKnapsack(3, 5, [1, 2, 5], [2, 4, 3])); //* 6
console.log(zeroOneKnapsack(1, 10, [10], [10])); //* 10
console.log(zeroOneKnapsack(5, 4, [1, 2, 3, 4, 5], [5, 6, 7, 8, 9])); //* 0
console.log(zeroOneKnapsack(3, 10, [1, 2, 3], [4, 5, 6])); //* 4

//* Time: O(w * n) - There are w * n unique subproblems to cache
//* We are doing 2D Dynamic Programming because we have two non-constant parameters

//* Space: O(w * n) - Since there are w * n unique subproblems
//* That means there are w * n keys (at most)
//* The depth of the recursion tree scales with "n"
//* We could have a capacity of 10 but every weight is 1
//* So we hit the index limit before the capacity limit
