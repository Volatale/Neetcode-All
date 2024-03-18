function arrangingCoins(n) {
  return Math.floor(-0.5 + Math.sqrt(1 + 2 * n));
}

console.log(arrangingCoins(1));
console.log(arrangingCoins(3));
console.log(arrangingCoins(5));
console.log(arrangingCoins(8));

//* Time: O(1) - We are performing simple arithmetic, and a square root
//* All of which can easily be done in O(1) on any modern CPU

//* Space: O(1) - We can't using any extra space; the space usage remains constant regardless of n
