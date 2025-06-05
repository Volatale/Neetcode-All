//* We are given an int[] prices, where prices[i] = price of ith stock
//* The goal is to maximize the profit by choosing a day to buy a stock, and then also sell a stock
//* Logically speaking, we want to MINIMIZE the cost to buy, and MAXIMIZE the profit from the sale
//* It is not possible to buy and sell on the same day (so we need two different days)
//* We should perform a simulation and only take the best possible result
//* Naturally, since we need two different days, we can use a two pointer approach
function maxProfit(prices) {
  let maxProfit = 0;

  //* Two pointers to find the optimal days to buy/sell
  let left = 0;
  let right = 1;

  while (right < prices.length) {
    //* If prices[left] < prices[right], then we at least make "some" profit
    if (prices[left] < prices[right]) {
      maxProfit = Math.max(maxProfit, prices[right] - prices[left]);
    } else {
      left = right;
    }

    //* We can't considerthe same day multiple times
    right++;
  }

  return maxProfit;
}

console.log(bestTimeToBuyAndSellStock([7, 1, 5, 3, 6, 4])); //* 5
console.log(bestTimeToBuyAndSellStock([1, 2, 3, 4, 5, 6, 7, 8])); //* 7
console.log(bestTimeToBuyAndSellStock([2, 5])); //* 3
console.log(bestTimeToBuyAndSellStock([5])); //* 0
console.log(bestTimeToBuyAndSellStock([9, 2])); //* 0

//* Time: O(n) - It takes O(n) time to process all of the elements in the array

//* Space: O(1) - The memory usage remains constant regardless of input size
