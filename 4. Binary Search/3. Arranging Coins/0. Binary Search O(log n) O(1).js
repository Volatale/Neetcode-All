//* We have "n" coins
//* So 1 would be the minimum coins we can have on 1 row
//* Use Gauss' formula to find whether or not there are too many coins for this row
//* For example, fitting to complete 4 rows, you need 10 coins
//* 1 + 2 + 3 + 4 = 10, so we can use the gauss formula
//* "mid" represents the number of rows we can try
//* If mid > count, you don't have enough coins to fit that many rows
//* So reduce the search space on the right
//* Else, you see if you found a new "best"
//* Then try a larger number of rows (increase mid)
function arrangingCoins(n) {
  //* We know there is 1 coin minimum, and "n" is the amount we start with
  let left = 1;
  let right = n;

  let rows = 0;

  while (left <= right) {
    //* Represents the number of rows we want to fit the coins into
    let mid = left + ((right - left) >> 1);

    //* How many coins it would take to create "mid" complete rows
    let coins = (mid * (mid + 1)) / 2;

    //* You can't have more coins than "n"
    if (coins > n) {
      right = mid - 1; //* Try a smaller number of rows
    } else {
      rows = Math.max(rows, mid); //* See if we found a new "max" for number of rows
      left = mid + 1; //* Try a larger number of rows (see if you can beat rows)
    }
  }

  return rows;
}

console.log(arrangingCoins(1)); //* 1
console.log(arrangingCoins(2)); //* 1
console.log(arrangingCoins(3)); //* 2
console.log(arrangingCoins(5)); //* 2
console.log(arrangingCoins(8)); //* 3
console.log(arrangingCoins(10)); //* 4

//* Time: O(log n) - Each iteration, we halve the total search space
//* This allows us to avoid doing an O(n) loop through the whole search space

//* Space: O(1) - We don't use any space that scales with input size
