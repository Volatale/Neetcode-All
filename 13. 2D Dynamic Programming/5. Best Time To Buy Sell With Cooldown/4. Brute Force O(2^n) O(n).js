//* The choices we have at each step depend on our current state
//*     - If we DO NOT currently have a stock
//*         - We can choose to buy, or not buy
//*     - Else, we already have a stock
//!         - We are not allowed to engage in multiple transactions, so buying another is impossible
//*         - We can choose to sell, or not sell (and wait for a more optimal day)
//* If we choose to sell, we need to skip the next day (so pass i + 2 instead of i + 1)
function bestTimeToBuyAndSellStockWithCooldown(prices) {
  function buySell(i, stockIndex) {
    //* Base Case: No more stocks to consider
    if (i >= prices.length) return 0;

    let maxProfit = 0;

    //* Case 1: We don't have a stock, so buy or don't buy
    if (stockIndex === -1) {
      maxProfit = Math.max(
        buySell(i + 1, i), //* Buy
        buySell(i + 1, stockIndex) //* Don't buy
      );
    } else {
      //* Case 2: We have a stock to sell, so sell or don't sell
      const profit = prices[i] - prices[stockIndex];

      maxProfit = Math.max(
        buySell(i + 2, -1) + profit, //* Sell
        buySell(i + 1, stockIndex) //* Don't sell
      );
    }

    return maxProfit;
  }

  //* Start at day 0, with no stock
  return buySell(0, -1);
}

console.log(bestTimeToBuyAndSellStockWithCooldown([1, 4, 3])); //* 3
console.log(bestTimeToBuyAndSellStockWithCooldown([1, 2, 3, 0, 2])); //* 3
console.log(bestTimeToBuyAndSellStockWithCooldown([1])); //* 0
console.log(bestTimeToBuyAndSellStockWithCooldown([5, 6, 7, 8, 9, 10])); //* 5
console.log(bestTimeToBuyAndSellStockWithCooldown([20, 11, 4])); //* 0 (don't buy any)

//* Time: O(2^n) - At each step, we have a few cases to consider
//* Regardless of what we are allowed to do, there are 2 calls made per recursive call
//* The depth of the recursion tree scales with the number of days (prices.length)

//* Space: O(n) - The space usage scales with the recursion depth
