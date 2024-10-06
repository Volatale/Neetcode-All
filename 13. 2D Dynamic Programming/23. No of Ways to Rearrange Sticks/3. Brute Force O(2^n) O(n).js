//* "n" = Number of sticks left
//* "k" = Number of visible sticks we STILL need
//* Instead of trying each permutation in a brute force manner
//* Apply reverse thinking
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
function rearrangeSticks(n, k) {
  function sticks(n, k) {
    //* Base Case: Found "k" valid sticks
    if (n === k) return 1;

    //* Base Case: There are no more sticks to consider (or not enough)
    if (n === 0 || k === 0) return 0;

    let ways = 0;

    //* We have 1 branch where we put this stick at the end and guarantee a visible stick
    //* There are n - 1 branches where putting the current stick does NOT guarantee a visible stick
    ways = (sticks(n - 1, k - 1) + (n - 1) * sticks(n - 1, k)) % MOD;

    return ways;
  }

  const MOD = 10 ** 9 + 7;

  return sticks(n, k);
}

console.log(rearrangeSticks(3, 2)); //* 3
console.log(rearrangeSticks(5, 5)); //* 1
console.log(rearrangeSticks(20, 11)); //* 647427950

//* Time: O(2^n) - Each call leads to two more calls
//* The height of the recursion tree scales with "n"
//* "k" is not guaranteed to be decremented, but "n" is

//* Space: O(n) - The height of the recursion tree is "n"
//* Since "n" is guaranteed to be decremented, there will be "n" levels of recursion
//* Even if "k" was 1000, if "n" was 2, then we'd only go 2 levels deep
//* Every call results in one less stick to consider, but the same cannot be said about the number of VISIBLE sticks
