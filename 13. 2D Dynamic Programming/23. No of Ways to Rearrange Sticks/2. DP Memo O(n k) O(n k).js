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

//* Apply memoization to avoid redundant work
//*     - We have 2D state (n, k)
//*         - "n" = Number of sticks to consider
//*         - "k" = Number of visible sticks left to find
function rearrangeSticks(n, k) {
  function sticks(n, k, memo) {
    //* Base Case: Found "k" valid sticks
    if (n === k) return 1;

    //* Base Case: There are no more sticks to consider (or not enough)
    if (k === 0 || k > n) return 0;

    //* Utilize memoized value
    const key = `${n}-${k}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let ways = 0;

    //* We have 1 branch where we put this stick at the end and guarantee a visible stick
    //* There are n - 1 branches where putting the current stick does NOT guarantee a visible stick
    ways =
      (sticks(n - 1, k - 1, memo) + (n - 1) * sticks(n - 1, k, memo)) % MOD;

    return (memo[key] = ways);
  }

  const MOD = 10 ** 9 + 7;

  return sticks(n, k, {});
}

console.log(rearrangeSticks(3, 2)); //* 3
console.log(rearrangeSticks(5, 5)); //* 1
console.log(rearrangeSticks(20, 11)); //* 647427950

//* Time: O(n * k) - We are memoizing the results of each subproblem
//* There are "n" possible values for "n" and "k" possible values for "k"
//* Rule of product gives us n * k unique subproblems

//* Space: O(n * k) - There are n * k unique subproblems, thus n * k possible keys/values to store
//* The height of the recursion tree is "n"
