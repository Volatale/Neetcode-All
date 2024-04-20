//* Track the min value found so far
//* The min value will be the cost we incur on day we buy
//* Then, we do prices[i] - minProfit
//* Essentially this calculation is taking the supposed "profit" and subtracting from it the buy cost
//* We want to minimize the minProfit
//* A lower value means a cheaper purchase which means more chance for profit
//* This is a variation of Kadane's Algorithm
function bestTimeToBuyAndSellStock(prices) {
  let minProfit = prices[0]; //* Represents the cost of the buy day
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    minProfit = Math.min(minProfit, prices[i]);
    maxProfit = Math.max(maxProfit, prices[i] - minProfit);
  }

  return maxProfit;
}

console.log(bestTimeToBuyAndSellStock([7, 1, 5, 3, 6, 4])); //* 5
console.log(bestTimeToBuyAndSellStock([1, 2, 3, 4, 5, 6, 7, 8])); //* 7
console.log(bestTimeToBuyAndSellStock([2, 5])); //* 3
console.log(bestTimeToBuyAndSellStock([5])); //* 0
console.log(bestTimeToBuyAndSellStock([9, 2])); //* 0

//* Time: O(n) - It takes O(n) time to process every element in the array

//* Space: O(1) - We use no extra space at all
