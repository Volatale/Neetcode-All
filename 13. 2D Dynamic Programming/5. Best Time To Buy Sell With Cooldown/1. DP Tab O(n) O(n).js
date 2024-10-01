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

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (i, buying)
//* It is hard to exactly replicate the recursive logic
//!     - There is no easy way to handle whether or not we buy or sell
//*     - Instead, since "buying" only has two states
//*         - We just keep 2 DP arrays (buy[i] and sell[i])
function bestTimeToBuyAndSellStockWithCooldown(prices) {
  //* We need two days minimum to sell a single stock
  if (prices.length <= 1) return 0;

  const n = prices.length;

  //* buy[i] = Maximum profit we can get buying on day i (or not buying)
  //* sell[i] = Maximum profit we can get selling on day i (or not selling)
  const buy = new Array(n).fill(0);
  const sell = new Array(n).fill(0);

  //* Buying on day 1 means we currently have -prices[0] profit
  //* We can't sell anything on day 0, so 0 profit
  buy[0] = -prices[0];
  sell[0] = 0;

  for (let i = 1; i < n; i++) {
    //* Either continue holding or buy on day i (cooldown = sell[i- 2])
    buy[i] = Math.max(buy[i - 1], (i > 1 ? sell[i - 2] : 0) - prices[i]);

    //* Either continue holding or sell on day i
    sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);
  }

  //* Best profit occurs when we aren't holding a stock; selling yields profit
  return sell[n - 1];
}

console.log(bestTimeToBuyAndSellStockWithCooldown([1, 4, 3])); //* 3
console.log(bestTimeToBuyAndSellStockWithCooldown([1, 2, 3, 0, 2])); //* 3
console.log(bestTimeToBuyAndSellStockWithCooldown([1])); //* 0
console.log(bestTimeToBuyAndSellStockWithCooldown([5, 6, 7, 8, 9, 10])); //* 5
console.log(bestTimeToBuyAndSellStockWithCooldown([20, 11, 4])); //* 0 (don't buy any)

//* Time: O(n) - We iterate through the array once in total
//* It takes O(n) to create an array of length n, and we do this twice

//* Space: O(n) - We create two arrays, both of which have "n" length
