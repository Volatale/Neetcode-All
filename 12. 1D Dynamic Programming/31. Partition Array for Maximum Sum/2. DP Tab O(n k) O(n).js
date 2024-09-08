//* We need to partition the array into subarrays of AT MOST "k" length
//*     - This can either be done in a brute force manner
//*     - Or a variable length sliding window (window can hold up to k elements)
//* At each level of recursion
//*     - Track the MAXIMUM value found at this level
//*     - Track the SUM of the subarray
//! Avoid actually modifying the array
//*     - This would involve explicit backtracking
//*     - Instead, we multiply the window size by the maxValue found on this level
//! We have no idea what the best combination of elements is
//*     - So we should try EVERY combination
//! Sliding Window alone won't work here
//*     - Lets say "k" is 3
//*     - For every element, we COULD take only that element
//*     - But then we need to consider every OTHER subarray range [0, k]
//*         - There is bound to be a lot of repeated work, hence the DP approach

//* Apply tabulation to avoid recursion overhead
function maxSumAfterPartitioning(arr, k) {
  if (arr.length === 0 || k === 0) return 0;

  const n = arr.length;

  //* dp[i] = Maximum sum we can get considering elements up to "i"
  const dp = new Array(n + 1).fill(0);

  //* Consider all subarrays ending at i that have lengths [1..k]
  for (let i = 0; i < n; i++) {
    let currMax = 0;

    //* Consider subarrays of length 1 to "k"
    for (let j = 1; j <= k && i - j + 1 >= 0; j++) {
      currMax = Math.max(currMax, arr[i - j + 1]);
      dp[i + 1] = Math.max(dp[i + 1], dp[i - j + 1] + currMax * j);
    }
  }

  return dp[n];
}

console.log(maxSumAfterPartitioning([7, 15, 8], 2)); //* 38
console.log(maxSumAfterPartitioning([7, 15, 2, 4], 2)); //* 41
console.log(maxSumAfterPartitioning([1, 15, 7, 9, 2, 5, 10], 3)); //* 84
console.log(maxSumAfterPartitioning([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); //* 83
console.log(maxSumAfterPartitioning([1], 1)); //* 1

//* Time: O(n * k) - There are "n" possible indices
//* And each call can generate "k" more calls in the worst case
//* But we are caching the results of subproblems
//* (k + 1) * (n + 1) = kn + 2

//* Space: O(n) - The DP array scales with the size of the input array
