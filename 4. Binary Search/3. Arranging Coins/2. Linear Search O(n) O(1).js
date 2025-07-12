//* We have `n` coins, and the goal is to build a staircase with the coins
//* The staircase consists of `k` rows
//*     - The ith row has exactly i coins
//* The final row may be incomplete
//* Given `n` coins, return the number of COMPLETE rows
//* Immediately, we can observe that the "cost" to build a row increases by 1 each "construction"
//*     - Thus, we can simply increment a variable every iteration
//* If we keep iterating, eventually we won't have enough coins to complete the row
//* There is no need to keep iterating until we have 0 coins, however
//*     - Instead, we simply check if the number of coins required for this row > remaining coins
//*     - If that IS the case, we can't complete the row, so exit the loop
function arrangeCoins(n) {
  let completeRows = 0;

  //* Keep iterating while we are able to complete the current row
  while (n >= completeRows + 1) {
    n -= completeRows + 1;
    completeRows++;
  }

  return completeRows;
}

console.log(arrangeCoins(1)); //* 1
console.log(arrangeCoins(2)); //* 1
console.log(arrangeCoins(3)); //* 2
console.log(arrangeCoins(5)); //* 2
console.log(arrangeCoins(8)); //* 3
console.log(arrangeCoins(10)); //* 4

//* Time: O(n) - The time taken scales with the input size
//* Specifically, the Sum of N Natural Numbers

//* Space: O(1) - The memory usage remains constant regardless of input size
