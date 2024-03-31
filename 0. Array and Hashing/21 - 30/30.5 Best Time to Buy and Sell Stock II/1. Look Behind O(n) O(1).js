//* Two Pointer Technique
//* Left represents the buy day
//* Right represents the sell day
//* If prices[left] < prices[right], we can buy/sell (buy day should be < sell day)
//*     - Buy Low, Sell High
//* We can't buy or sell twice on the same day, so the pointers have to move
function maxProfit(prices) {
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      maxProfit += prices[i] - prices[i - 1];
    }
  }

  return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); //* 7. [5 - 1 = 4], [6 - 3 = 3] 4 + 3 = 7
console.log(maxProfit([1, 2, 3, 4, 5])); //* 4. Add 1 4 times
console.log(maxProfit([7, 6, 4, 3, 1])); //* 0. We never subtract
console.log(maxProfit([7])); //* 0, because we never bought. buy = -7, sell = +7. -7 + 7 = 0
console.log(maxProfit([1, 4])); //* 3

//* Time: O(n) - The time taken scales with the size of the input
//* We keep looping while right < prices.length, and right increments by 1 each iteration

//* Space: O(1) - The space used remains constant; we only ever use constant space variables
