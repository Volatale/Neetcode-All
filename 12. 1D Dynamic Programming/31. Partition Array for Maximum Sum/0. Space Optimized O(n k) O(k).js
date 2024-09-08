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
//*     - Use a circular array using the modulo operator
function maxSumAfterPartitioning(arr, k) {
  if (arr.length === 0 || k === 0) return 0;

  const n = arr.length;

  //* dp[i] = Maximum sum of subarrays ending at index i (starting at n - 1)
  //* Circular array using modulo
  const dp = new Array(k + 1).fill(0);

  //* Iterate BACKWARDS because otherwise dp[j + 1] relies on FUTURE values
  for (let i = n - 1; i >= 0; i--) {
    let currMax = 0;
    let sum = 0;

    //* Calculate sums of subararys of length 1 to k
    for (let j = i; j < Math.min(n, i + k); j++) {
      currMax = Math.max(currMax, arr[j]);
      const windowSize = j - i + 1;
      sum = Math.max(sum, dp[(j + 1) % k] + currMax * windowSize);
    }

    dp[i % k] = sum;
  }

  return dp[0];
}

console.log(maxSumAfterPartitioning([7, 15, 8], 2)); //* 38
console.log(maxSumAfterPartitioning([4, 7, 8, 9, 5], 3)); //* 42
console.log(maxSumAfterPartitioning([7, 15, 2, 4], 2)); //* 41
console.log(maxSumAfterPartitioning([1, 15, 7, 9, 2, 5, 10], 3)); //* 84
console.log(maxSumAfterPartitioning([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); //* 83
console.log(maxSumAfterPartitioning([1], 1)); //* 1

//* Time: O(n * k) - There are "n" possible indices
//* And each call can generate "k" more calls in the worst case
//* But we are caching the results of subproblems
//* (k + 1) * (n + 1) = kn + 2

//* Space: O(k) - The DP array scales with "k"
//* We essentially have a circular array by using the modulo operator
