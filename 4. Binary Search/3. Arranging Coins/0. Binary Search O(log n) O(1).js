//* Arithmetic Series
//! Total coins needed follows this pattern
//*     - 1 + 2 + 3 + 4 + ... + n
//* So we can technically binary search to optimize the choices
//* [0...n]
//* "mid" represents the number of rows we are trying to build
//* If we don't have enough coins to complete the row
//*     - Then try building LESS rows
//* If we DO have enough coins, we have a potential best
//*     - Then try building MORE rows
function arrangeCoins(n) {
  //* The min and max no of rows we can try building
  let left = 1;
  let right = n;

  while (left < right) {
    //* Mid represents the No. of Rows we are trying to build
    const mid = left + ((right - left + 1) >> 1);

    //* Coins needed to build "mid" rows
    const coinsNeeded = (mid * (mid + 1)) / 2;

    if (coinsNeeded <= n) {
      //* We have enough to build "mid" rows, so try more (greedily)
      left = mid;
    } else {
      //* We don't have enough coins; try building LESS rows
      right = mid - 1;
    }
  }

  //* No. of Rows that can be built completely using "n" coins
  return left;
}

console.log(arrangeCoins(5)); //* 2
console.log(arrangeCoins(1)); //* 1
console.log(arrangeCoins(10)); //* 4
console.log(arrangeCoins(8)); //* 3

//* Time: O(log n) - Each iteration, we eliminate half of the search space

//* Space: O(1) - The memory usage remains constant regardless of the input size
