//* The number of coins w need is equal to rows + 1
//* So you can continually create rows until this expression is false
function arrangingCoins(n) {
  let rows = 0;

  while (n >= rows + 1) {
    n -= rows + 1;
    rows++;
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
