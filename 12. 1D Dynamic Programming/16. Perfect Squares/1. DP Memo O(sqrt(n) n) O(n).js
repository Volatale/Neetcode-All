//* Try every square number up to and including "n"
//* Then take the minimum out of all of these paths
//* It takes 0 square numbers to make up "0"

//! Recurrence Relation: F(n) = min(F(n - i * i) for all squares <= n)
//* Apply memoization to avoid redundant work
function numSquares(n) {
  function square(n, memo) {
    //* Successfully summed to make n
    if (n === 0) return 0;

    //* Utilize memozied value
    if (memo.hasOwnProperty(n)) return memo[n];

    let leastNumbers = Infinity;

    //* Try every square number <= n
    for (let i = 1; i * i <= n; i++) {
      leastNumbers = Math.min(leastNumbers, square(n - i * i, memo) + 1);
    }

    memo[n] = leastNumbers;
    return leastNumbers;
  }

  return square(n, {});
}

console.log(numSquares(1)); //* 1 (1)
console.log(numSquares(5)); //* 2 //* (1 + 4)
console.log(numSquares(12)); //* 3 (4 + 4 + 4)
console.log(numSquares(13)); //* 2 (4 + 9)

//* Time: O(sqrt(n) * n) - There are sqrt(n) possible branches at each level
//* The depth of the recursion tree scales with "n"
//* There are n unique subproblems since we are memoizing them

//* Space: O(n) - The depth of the recursion tree is "n"
