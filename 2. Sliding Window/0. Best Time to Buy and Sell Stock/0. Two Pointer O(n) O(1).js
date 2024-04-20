//* Use Two Pointers
//* Start left at 0, and right at 1 because we can't buy & sell on the same day
//* We can only make a profit if prices[left] < prices[right]
//* Buy Low & Sell High
function bestTimeToBuyAndSellStock(prices) {
  let maxProfit = 0;

  //* Two Pointers
  let left = 0; //* Left = Buy day
  let right = 1; //* Right = Sell Day

  while (right < prices.length) {
    //* Buy Low Sell High
    if (prices[left] < prices[right]) {
      maxProfit = Math.max(maxProfit, prices[right] - prices[left]);
    } else {
      left = right;
    }

    right++;
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
