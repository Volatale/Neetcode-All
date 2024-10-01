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
//* We can optimize to O(1) space by avoiding DP arrays
//*     - We only rely on the previous "buy" state
//*     - And we rely on the previous 2 "sell" states
//*         - So just use three variables to hold their states
//* prevBuy represents buy[i-1]
//* prevSell represents sell[i-1]
//* prevPrevSell represents sell[i-2]
function bestTimeToBuyAndSellStockWithCooldown(prices) {
  //* We need two days minimum to sell a single stock
  if (prices.length <= 1) return 0;

  let prevBuy = -prices[0]; //* buy[i - 1]
  let prevSell = 0; //* sell[i - 1] (we can't sell since we own no stock)
  let prevPrevSell = 0; //* sell[i - 2] (there is no sell before day 0)

  for (let i = 1; i < prices.length; i++) {
    const newBuy = Math.max(prevBuy, prevPrevSell - prices[i]);
    const newSell = Math.max(prevSell, prevBuy + prices[i]);

    //* Update variables for next day
    prevPrevSell = prevSell; //* sell[i-2] becomes sell[i-1]
    prevSell = newSell; //* sell[i-1] becomes sell[i]
    prevBuy = newBuy; //* buy[i-1] becomes buy[i]
  }

  return prevSell;
}

console.log(bestTimeToBuyAndSellStockWithCooldown([1, 4, 3])); //* 3
console.log(bestTimeToBuyAndSellStockWithCooldown([1, 2, 3, 0, 2])); //* 3
console.log(bestTimeToBuyAndSellStockWithCooldown([1])); //* 0
console.log(bestTimeToBuyAndSellStockWithCooldown([5, 6, 7, 8, 9, 10])); //* 5
console.log(bestTimeToBuyAndSellStockWithCooldown([20, 11, 4])); //* 0 (don't buy any)

//* Time: O(n) - We iterate through the array once in total

//* Space: O(1) - We are using three constant space variables
