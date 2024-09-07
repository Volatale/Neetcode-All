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
function maxSumAfterPartitioning(arr, k) {
  function partition(i) {
    let currMax = 0;
    let sum = 0;

    //* Subarrays can be of length "k" at most
    //* "j" marks the "end" of the subarray
    for (let j = i; j < Math.min(arr.length, i + k); j++) {
      currMax = Math.max(currMax, arr[j]);
      const windowSize = j - i + 1;

      //* Multiply the maximum value in window by the window size
      sum = Math.max(sum, partition(j + 1) + currMax * windowSize);
    }

    return sum;
  }

  return partition(0);
}

console.log(maxSumAfterPartitioning([7, 15, 8], 2)); //* 38
console.log(maxSumAfterPartitioning([7, 15, 2, 4], 2)); //* 41
console.log(maxSumAfterPartitioning([1, 15, 7, 9, 2, 5, 10], 3)); //* 84
console.log(maxSumAfterPartitioning([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); //* 83
console.log(maxSumAfterPartitioning([1], 1)); //* 1

//* Time: O(k^n) - There are "n" possible indices in the input
//* There are also "k" branches per call in the worst case
//* And the depth of the recursion tree scales with "n"
//* Within each call, we do an O(k) loop

//* Space: O(n) - The depth of the recursion tree scales with "n"
//* In the worst case, we transition the state by 1 each call (taking only single length subarrays)
