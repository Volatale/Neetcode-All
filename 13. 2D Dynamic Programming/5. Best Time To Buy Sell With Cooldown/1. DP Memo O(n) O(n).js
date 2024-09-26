//* The choices we have at each step depend on our current state
//*     - If we DO NOT currently have a stock
//*         - We can choose to buy, or not buy
//*     - Else, we already have a stock
//!         - We are not allowed to engage in multiple transactions, so buying another is impossible
//*         - We can choose to sell, or not sell (and wait for a more optimal day)
//* If we choose to sell, we need to skip the next day (so pass i + 2 instead of i + 1)
//* Buying:
//*     - We bought, so "buying" is false
//*     - Subtract from the profit, the current stock price
//!         - We aren't keeping track of what we bought, so we have to do it inline here
//* Selling:
//*     - We are selling, so we no longer hold a stock; buying is true
//*     - Add to the profit, the price of this stock (because)
//*     - Skip the next day since we are on cooldown

//* Apply memoization to avoid redundant work
//*     - We have 2D state (i, buying)
function bestTimeToBuyAndSellStockWithCooldown(prices) {
  function buySell(i, buying, memo) {
    //* Base Case: No more days to consider
    if (i >= prices.length) return 0;

    //* Utilize memoized value
    const key = `${i}-${buying}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let maxProfit = 0;

    //* Case 1: We don't have a stock, so buy the current
    if (buying) {
      maxProfit = Math.max(maxProfit, buySell(i + 1, false, memo) - prices[i]);
    } else {
      //* Case 2: We have a stock to sell, so we sell it, but we skip the next day
      maxProfit = Math.max(maxProfit, buySell(i + 2, true, memo) + prices[i]);
    }

    //* Case 3: Don't do anything, wait for a more optimal day
    maxProfit = Math.max(maxProfit, buySell(i + 1, buying, memo));

    return (memo[key] = maxProfit);
  }

  return buySell(0, true, {});
}

console.log(bestTimeToBuyAndSellStockWithCooldown([1, 4, 3])); //* 3
console.log(bestTimeToBuyAndSellStockWithCooldown([1, 2, 3, 0, 2])); //* 3
console.log(bestTimeToBuyAndSellStockWithCooldown([1])); //* 0
console.log(bestTimeToBuyAndSellStockWithCooldown([5, 6, 7, 8, 9, 10])); //* 5
console.log(bestTimeToBuyAndSellStockWithCooldown([20, 11, 4])); //* 0 (don't buy any)

//* Time: O(n) - We are memoizing the results of each subproblem
//* There are "n" possible values for "i" (0, 1, .. n - 1) and 2 possible values for buying (true/false)
//* So the total number of unique states is n * 2

//* Space: O(n) - Since there are n * 2 unique states, there are n * 2 possible keys/values in the worst case
//* The space usage scales with the recursion depth
