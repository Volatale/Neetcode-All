//! This is a Geeksforgeeks problem, not Leetcode
//* We are allowed to BREAK items up
//*     - This is not a 0 / 1 Knapsack
//* Each item can only be used once (without replacement)
//* We should group up each item's stats into one tuple
//* Each item technically has a value to weight ratio
//!     - We always want to include as much as we can of the highest weight ratio item
//*         - Only break the item up if we can't fit the entire item
//*     - So sort the items based on their value to weight ratio (in DESCENDING order)
//*         - Lower ratio items can potentially take up more space but provide less profit
//* capacity / weight tells us how much of something we can fit
//*     - Then multiply that by the value of the item
//*     - This is essentially a modifier (or limit) for the value we can get from it
function fractionalKnapsack(capacity, profit, weight) {
  //* Presumably, every item should have at least a weight of 1
  if (capacity === 0) return 0;

  let totalProfit = 0;

  const items = profit
    .map((_, i) => [profit[i], weight[i]]) //* Group up related data
    .sort((a, b) => b[0] / b[1] - a[0] / a[1]); //* Sort by value to weight ratio

  //* Keep adding items until we have 0 capacity
  for (const [value, weight] of items) {
    //* Include the entire item if we can
    if (capacity >= weight) {
      totalProfit += value;
      capacity -= weight;
    } else {
      //* Otherwise, break the item up
      totalProfit += (capacity / weight) * value;
    }
  }

  return totalProfit;
}

console.log(fractionalKnapsack(50, [60, 100, 120], [10, 20, 30])); //* 240
console.log(fractionalKnapsack(10, [500], [30], 10)); //* 166.667
console.log(fractionalKnapsack(50, [10], [50])); //* 10
console.log(fractionalKnapsack(15, [100], [30])); //* 50
console.log(
  fractionalKnapsack(37, [25, 75, 100, 50, 45, 90, 30], [5, 10, 12, 4, 7, 9, 3])
); //* 392.5

//* Time: O(n log n) - We have to group the data into a tuple / pair, which takes O(n)
//* Then, we sort the pairs based on their value to weight ratio - O(n log n)
//* Finally, we iterate through all of the pairs, adding each item to the knapsack

//* Space: O(n) - Both the sorting and grouping use O(n) space
