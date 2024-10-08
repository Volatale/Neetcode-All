//* Generate every possible pair of chocolates
//* Track the MINIMUM sum between all pairs
//* Then subtract that sum from prices
function buyChoco(prices, money) {
  let minSum = Infinity;

  //* Find the sum of the two minimum values
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      minSum = Math.min(minSum, prices[i] + prices[j]);
    }
  }

  const leftovers = money - minSum;
  return leftovers < 0 ? money : leftovers;
}

console.log(buyChoco([1, 2, 2], 3)); //* 0
console.log(buyChoco([11, 12], 4)); //* 4
console.log(buyChoco([3, 2, 3], 3)); //* 3
console.log(buyChoco([5, 5], 50)); //* 40
console.log(buyChoco([4, 6, 3, 2], 7)); //* 2

//* Time: O(n^2) - Generating every pair of elements takes O(n^2)
//* Then it takes O(1) to compute the leftovers

//* Space: O(1) - We only use two variables that do not scale in size with "n"
//* So our space usage is constant
