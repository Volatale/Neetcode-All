//* Use a two pointer approach to mark the buy/sell days
//* If prices[left] < prices[right], that means we have a valid date to test
//* Sell Price should be higher than buy price
//* If prices[left] > prices[right], you need to find a new buy day
function maxProfit(prices) {
  let maxProfit = 0;

  let left = 0; //* Left = Buy Day
  let right = 1; //* Right = Sell Day

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      let newPrice = prices[right] - prices[left];
      maxProfit = Math.max(maxProfit, newPrice);
    } else {
      left = right; //* Left price was > right price, which means no profit
    }

    right++; //* Right always progresses
  }

  return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); //* 5
console.log(maxProfit([1, 2, 3, 4, 5])); //* 4
console.log(maxProfit([7, 6, 4, 3, 1])); //* 0

//* Time: O(n) - The time taken by the function scales proportionally with the input size
//* There may not be exactly "n" iterations, but the minimum amount scales with "n" itself

//* Space: O(1) - We only use constant space variables
