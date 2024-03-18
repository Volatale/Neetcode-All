//* Use binary search
//* The lower bound is 1 because "n"'s minimum value is 1
//* The upper bound is n because we know we have "n" coins
//* "mid" represents the number of rows we can complete
//* "coins" represents the number of coins we can try to fit into "mid"
//* If "coins" > n, that means we have too many coins to fit into "mid" rows
//* Else, increase the lower bound to try to find a better "mid" value
function arrangingCoins(n) {
  let left = 1;
  let right = n;

  let count = 0; //* Number of completed rows

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2); //* The row we are considering; how many coins do we need to complete "mid" rows
    let coins = (mid * (mid + 1)) / 2; //* Gauss' Formula; the actual number of coins we have to fit into mid rows

    if (coins > n) {
      right = mid - 1; //* If coins > n, we have too many coins to fit into "mid" rows
    } else {
      left = mid + 1; //* Try to find a larger "mid"
      count = Math.max(mid, count);
    }
  }

  return count;
}

console.log(arrangingCoins(1)); // 1
console.log(arrangingCoins(3)); // 2
console.log(arrangingCoins(5)); // 2
console.log(arrangingCoins(8)); // 3
console.log(arrangingCoins(10)); // 4

//* Time: O(log n) - The algorithm skips a lot of steps; we use a search space of 1 to n
//* Then we use binary search to narrow the search space until completion

//* Space: O(1) - The space complexity remains constant regardless of input size
//* We only ever use constant space variables
