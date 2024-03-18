//* Start n, subtract an offset from n until n <= 0
//* Offset starts at 1
//* Subtract offset from n
//* Increase the offset (so, 1++ = 2, 2++ = 3) etc
//* If n >= 0, increase count
//*     - This is done so we don't add 1 to count if we couldn't complete the row
//* "offset" essentially represents a complete row
function arrangingCoins(n) {
  let count = 0; // Number of complete WE can completerows
  let offset = 1; // Represents the no of coins in a complete row

  //* While we have coins left
  while (n > 0) {
    n -= offset;
    offset++;

    //* If n < 0, we couldn't complete the row so don't increment count
    if (n >= 0) {
      count++;
    }
  }

  return count;
}

console.log(arrangingCoins(1)); // 1
console.log(arrangingCoins(3)); // 2
console.log(arrangingCoins(5)); // 2
console.log(arrangingCoins(8)); // 3
console.log(arrangingCoins(10)); // 4

//* Time: O(n) - The time taken scales with the number of "n"
//* We subtract a larger offset from n each iteration, but the number of iterations scales with n

//* Space: O(1) - We can't using any extra space; the space usage remains constant regardless of n
