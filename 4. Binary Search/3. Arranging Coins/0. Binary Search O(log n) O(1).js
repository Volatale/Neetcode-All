//* We have `n` coins, and the goal is to build a staircase with the coins
//* The staircase consists of `k` rows
//*     - The ith row has exactly i coins
//* The final row may be incomplete
//* Given `n` coins, return the number of COMPLETE rows
//* Immediately, we can observe that the "cost" to build a row increases by 1 each "construction"
//*     - 1 + 2 + 3 + 4 + 5 + ... + n
//*     - Thus, we can simply increment a variable every iteration
//* Additionally, we can observe that the "costs" are monotonically increasing
//* And the "correct" cost lies somewhere in the range [1, completeRows + 1]
//! Thus, it is possible to binary search to optimize the search process
//* The Sum of N Natural Numbers can tell us how many complete rows we can build with our current "mid" choice
//*     - In this case, "mid" represents the number of rows we are trying to build
//* If `n` < the result of the above, then we "can" build that many rows
//* Otherwise, we need to try building a fewer amount of rows
function arrangeCoins(n) {
  //* The search space is the range [1, n]
  let left = 1;
  let right = n;

  while (left < right) {
    //* Mid represents the number of rows we are trying to build
    const mid = left + ((right - left + 1) >> 1);
    const coinsNeeded = (mid * (mid + 1)) / 2;

    if (n >= coinsNeeded) {
      left = mid; //* We're successful, so potentially try more rows
    } else {
      right = mid - 1; //* We don't have enough coins; try a fewer amount
    }
  }

  //* No. of Complete Rows that can be built using `n` coins
  return left;
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
