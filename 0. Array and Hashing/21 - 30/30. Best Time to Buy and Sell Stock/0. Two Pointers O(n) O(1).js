//* Use a two pointer approach to mark the buy/sell days
//* If prices[left] < prices[right], that means we have a valid date to test
//* Sell Price should be higher than buy price
//* If prices[left] > prices[right], you need to find a new buy day
function maxProfit(prices) {
  if (prices.length <= 1) return 0;

  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    let profit = prices[i] - prices[i - 1];

    if (profit > 0) {
      maxProfit += profit;
    }
  }

  return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); //* 5
console.log(maxProfit([1, 2, 3, 4, 5])); //* 4
console.log(maxProfit([7, 6, 4, 3, 1])); //* 0

//* Time: O(n) - The time taken by the function scales proportionally with the input size
//* There may not be exactly "n" iterations, but the minimum amount scales with "n" itself

//* Space: O(1) - We only use constant space variables
