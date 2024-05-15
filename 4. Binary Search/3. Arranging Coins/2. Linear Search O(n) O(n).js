//* Count the number of complete rows
//* "n" is how many coins we have left
//* coinsNeeded increases by 1 each following row
//* If n >= coinsNeeded, we know we can complete this row
//* Otherwise, just break out of the loop, because no more rows can be completed
function arrangingCoins(n) {
  let rows = 0;
  let coinsNeeded = 1; //* Minimum coins we need is 1

  while (n > 0) {
    if (n >= coinsNeeded) {
      rows++;
      n -= coinsNeeded; //* You now have less coins to work with
      coinsNeeded++; //* Coins needed to fill a row increase by 1 each row
    } else break;
  }

  return rows;
}

console.log(arrangingCoins(1)); //* 1
console.log(arrangingCoins(2)); //* 1
console.log(arrangingCoins(3)); //* 2
console.log(arrangingCoins(5)); //* 2
console.log(arrangingCoins(8)); //* 3
console.log(arrangingCoins(10)); //* 4

//* Time: O(n) - The time taken scales with "n"
//* We do proportionally more iterations as "n" increases

//* Space: O(1) - The space usage remains constant regardless of input size
