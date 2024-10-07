//* Just sort the input in ascending order
//*     - Then we can choose the two leftmost elements
//* If the two leftmost elements summed and subtracted from money < 0
//*     - Then just return money; we have no leftover
//* Else, return whatever leftover is
function buyChoco(prices, money) {
  //* Sort in ascending order
  prices.sort((a, b) => a - b);

  const leftOver = money - (prices[0] + prices[1]);

  //* Buy the cheapest chocolates
  return leftOver < 0 ? money : leftOver;
}

console.log(buyChoco([1, 2, 2], 3)); //* 0
console.log(buyChoco([11, 12], 4)); //* 4
console.log(buyChoco([3, 2, 3], 3)); //* 3
console.log(buyChoco([5, 5], 50)); //* 40

//* Time: O(n log n) - On average, sorting takes O(n log n)
//* Then, it takes O(1) to compute "leftover"

//* Space: O(n) - Merge sort generally uses O(n) space
