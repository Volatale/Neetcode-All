//* There are 3 non-constant parameters to handle
//* The current element (i), current capacity (w) and no of items chosen so far (k)
//* At each step, consider including AND excluding the element

//! Recurrence Relation: f(i,w,k) = max(f(i + 1, w - weight[i], k - 1) + value[i]), f(i + 1, w, k))
//* "k" decreases every time we include an element
//* Apply Tabulation to avoid recursion overhead
function boundedKnapsack(n, capacity, maxItems, value, weight) {
  if (n === 0 || capacity === 0 || maxItems === 0) return 0;

  //* dp[k][i][w] = Max value we can get considering the first "i" elements
  //* A knapsack of "w" weight and limited to "k" items
  const dp = Array.from({ length: maxItems + 1 }, () =>
    Array.from({ length: n + 1 }, () =>
      Array.from({ length: capacity + 1 }, () => 0)
    )
  );

  //* Start from 1 for all loops
  //* Choosing 0 items, 0 capacity knapsack or considering UP to 0 items = max value of 0
  for (let k = 1; k <= maxItems; k++) {
    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        //* Case 1: Exclude the current element
        dp[k][i][w] = dp[k][i - 1][w];

        //* Case 2: Include the current element
        if (w >= weight[i - 1]) {
          dp[k][i][w] = Math.max(
            dp[k][i][w], //* Excluding item
            dp[k - 1][i - 1][w - weight[i - 1]] + value[i - 1] //* Including item
          );
        }
      }
    }
  }

  return dp[maxItems][n][capacity];
}

console.log(boundedKnapsack(4, 4, 2, [4, 8, 2, 1], [3, 1, 2, 4])); //* 12
console.log(boundedKnapsack(1, 5, 1, [10], [5])); //* 10
console.log(boundedKnapsack(1, 5, 0, [10], [5])); //* 0
console.log(boundedKnapsack(5, 8, 2, [2, 7, 1, 5, 3], [2, 5, 2, 3, 4])); //* 12
console.log(boundedKnapsack(5, 1, 2, [2, 7, 1, 5, 3], [2, 5, 2, 3, 4])); //* 0

//* Time: O(n * w * k) - There are 3 non-constant parameters our state depends on
//* Consider items from 0 to n - 1
//* Capacities range from o to w
//* We can choose 0 to k items
//* (n + 1) * (w + 1) + (k + 1) = O(n * w * k)

//* Space: O(n * w * k) - There are n * w * k unique subproblems
//* So we have a 3D Array
