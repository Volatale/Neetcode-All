function bestTimeToBuyAndSellStock(prices) {
  if (prices.length <= 1) return 0;

  let dp = new Array(prices.length).fill(0);

  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    //* 0 is the minimum
    dp[i] = Math.max(dp[i - 1] + prices[i] - prices[i - 1], 0);
    maxProfit = Math.max(maxProfit, dp[i]);
  }

  return maxProfit;
}

console.log(bestTimeToBuyAndSellStock([7, 1, 5, 3, 6, 4])); //* 5
console.log(bestTimeToBuyAndSellStock([1, 2, 3, 4, 5, 6, 7, 8])); //* 7
console.log(bestTimeToBuyAndSellStock([2, 5])); //* 3
console.log(bestTimeToBuyAndSellStock([5])); //* 0
console.log(bestTimeToBuyAndSellStock([9, 2])); //* 0

//* Time: O(n) - It takes O(n) to generate an array of length "n"
//* Then, it also takes O(n) to iterate over prices and process each element

//* Space: O(n) - The DP array scales with
