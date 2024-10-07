//* "n" = Number of sticks left
//* "k" = Number of visible sticks we STILL need
//! Apply reverse thinking
//*     - Instead of trying each permutation in a brute force manner
//*     - Try placing the current stick LAST
//!     - Placing the LARGEST stick LAST guarantees that "k" will decrement
//*     - Regardless of what we choose, n will ALWAYS be decremented by 1
//* ONE branch at each level will always decrement k AND n
//*     - The branch where the LARGEST stick is placed at the end
//*     - dp[n-1][k-1]
//* There will be n - 1 OTHER branches (excluding the last) that DON'T guarantee k - 1
//*     - Putting THESE sticks at the end may not guarantee a visible stick
//*         - Therefore k should not be decremented
//*     - We DO, however, know that we have one less stick to consider (so n - 1 still happens)
//*     - (n-1) * dp[n-1][k]
//*         - We multiply by (n - 1) because there are (n-1) branches where the stick is NOT placed at the end
//* Base Case is n === k
//*     - If n === k, there is only ONE valid permutation
//*     - n = 3, k = 3
//*         - [1, 2, 3] is the only valid permutation
//*         - The same holds true for EVERY n === k
//* If n > 0 && k === 0, it is impossible for us to have 0 visible sticks
//*     - We HAVE to place sticks, there is no situation where we can avoid placing sticks
//*     - Regardless of the permutation, there will always be at least 1 stick visible (sorted in descending order)

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (n, k)
//*         - "n" = Number of sticks to consider
//*         - "k" = Number of visible sticks left to find
//*     - We only rely on the PREVIOUS row and the CURRENT row
//*         - So we can eliminate the "n" space altogether
function rearrangeSticks(n, k) {
  //* Base Case: There are no more sticks to consider (or not enough)
  if (n === 0 || k > n) return 0;

  //* dp[n][k] = Number of visible sticks we can get with "n" sticks and "k" visibles
  let dp = new Array(k + 1).fill(0);
  const MOD = 10 ** 9 + 7;

  //* Base Case: Only 1 way to rearrange 0 sticks with 0 visible sticks
  dp[0] = 1;

  for (let sticks = 1; sticks <= n; sticks++) {
    const newRow = new Array(k + 1).fill(0);

    for (let visibles = 1; visibles <= k; visibles++) {
      //* Case 1: 1 Branch where we put largest at end (guaranteed visible)
      //* Case 2: (n-1) branches where we place largest stick somewhere else
      newRow[visibles] = (dp[visibles - 1] + (sticks - 1) * dp[visibles]) % MOD;
    }

    dp = newRow;
  }

  return dp[k];
}

console.log(rearrangeSticks(3, 2)); //* 3
console.log(rearrangeSticks(5, 5)); //* 1
console.log(rearrangeSticks(20, 11)); //* 647427950

//* Time: O(n * k) - We are caching the results of each subproblem
//* There are "n" possible values for "n" and "k" possible values for "k"
//* Rule of product gives us n * k unique subproblems

//* Space: O(k) - We are keeping two rows in memory at the same time (both arrays scale with "k")
