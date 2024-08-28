//* Try every square number up to and including "n"
//* Then take the minimum out of all of these paths
//* It takes 0 square numbers to make up "0"

//* This problem is a variation of coin change
//*     - Except we have to use
//! Recurrence Relation: F(n) = min(F(n - i * i) for all squares <= n)
function numSquares(n) {
  function square(n) {
    //* Successfully summed to make n
    if (n === 0) return 0;

    let leastNumbers = Infinity;

    //* Try every square number <= n
    for (let i = 1; i * i <= n; i++) {
      leastNumbers = Math.min(leastNumbers, square(n - i * i) + 1);
    }

    return leastNumbers;
  }

  return square(n);
}

console.log(numSquares(1)); //* 1 (1)
console.log(numSquares(5)); //* 2 //* (1 + 4)
console.log(numSquares(12)); //* 3 (4 + 4 + 4)
console.log(numSquares(13)); //* 2 (4 + 9)

//* Time: O(sqrt(n)^n) - We start at "n" and work our way down to 0
//* There are sqrt(n) branches and the depth of the recursion tree is "n"
//* At worst, we subtract 1 from n each step

//* Space: O(n) - The depth of the recursion tree is "n"
