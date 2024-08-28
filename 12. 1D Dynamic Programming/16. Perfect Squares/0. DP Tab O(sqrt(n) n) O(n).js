//* Try every square number up to and including "n"
//* Then take the minimum out of all of these paths
//* It takes 0 square numbers to make up "0"

//! Recurrence Relation: F(n) = min(F(n - i * i) for all squares <= n)
//* Apply tabulation to avoid redundant work
function numSquares(n) {
  if (n === 0) return 0;

  //* dp[i] = Minimum number of square numbers needed to make target of "i"
  const dp = new Array(n + 1).fill(Infinity);

  //* Seed Value: It takes 0 squares to make 0
  dp[0] = 0;

  //* i = target
  for (let i = 1; i <= n; i++) {
    for (let square = 1; square * square <= i; square++) {
      if (i >= square * square) {
        dp[i] = Math.min(dp[i], dp[i - square * square] + 1);
      }
    }
  }

  return dp[n];
}

console.log(numSquares(5)); //* 2 //* (1 + 4)
console.log(numSquares(1)); //* 1 (1)
console.log(numSquares(12)); //* 3 (4 + 4 + 4)
console.log(numSquares(13)); //* 2 (4 + 9)

//* Time: O(sqrt(n) * n) - There are sqrt(n) possible branches at each level
//* The depth of the recursion tree scales with "n"
//* There are sqrt(n) * n unique subproblems since we are memoizing them

//* Space: O(n) - The dp array scales with "n"
//* The squares array always has <= "n" elements, so that also scales with "n"
