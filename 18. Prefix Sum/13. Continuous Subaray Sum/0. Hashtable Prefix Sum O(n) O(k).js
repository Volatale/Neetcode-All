//* We need to use some modulo logic to understand this
//*     - (A + KB) % B = A % B
//*     - (A - KB) % B = A % B
//! Adding (or subtracting) any multiple of B to A does not change the result of the modulo operation
//*     - A = 3, B = 5, K = 4
//*         - (3 % 5) = (3 + 4 x 5) % 5
//*         - (3 % 5) = (3 - 4 x 5) % 2
//*         - The remainder of both is 3
//* Take this example:
//*     - Array      =  [23, 2, 6, 4, 7]
//*     - Running Sum = [23, 25, 31, 35, 42]
//*     - Remainders =  [5, 1, 1, 5, 0]
//! We found a remainder 5 at index 0 AND at index 3
//*     - Which means between those two indices, we added a number that is a multiple of K
//*     - In other words, the subarray [j:i] contains our sum

//* Prefix Sums are represented by:
//*     - sum(subarray([j:i])) = pref_i - pref_j-1
//*         - pref_i = the cumulative sum of the CURRENT subarray
//*         - pref_j-1 = the cumulative sum of some PREVIOUS subarray
//! To check if a sum is a multiple of K, we use:
//*     - (pref_i - pref_j-1) % K = 0
//*     - A is congruent to B mod K
//* If we REARRANGE this, we get:
//*     - pref_i % K = pref_j-1 % K
//* If two prefix sums have the same remainder when divided by K
//*     - The subarray BETWEEN these two indices has a sum that is a multiple of K
//* So the hashtable stores all PREVIOUS pref_i % K
//*     - Then if we find another subarray with the same remainder
//*     - Just check if i - seen[remainder] > 1
//*         - If it is, we found our good subarray
function checkSubarraySum(nums, k) {
  //* Stores all (previous subarray) pref_j. key/value = prefixSum % k : end index
  const seenRemainders = { 0: -1 };

  let prefixSum = 0;

  //* Find a (previous) subarray pref_j whose remainder = pref_i %
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    //* pref_j = pref_i % k
    const remainder = prefixSum % k;

    //* Don't overwrite previously seen remainders
    if (seenRemainders[remainder] === undefined) {
      seenRemainders[remainder] = i;
    } else if (i - seenRemainders[remainder] >= 2) {
      //* Found a "good" subarray (length >= 2 and is a multiple of / divisible by k)
      return true;
    }
  }

  return false;
}

console.log(checkSubarraySum([2, 6, 4], 6)); //* True
console.log(checkSubarraySum([23, 2, 4, 6, 7], 6)); //* True
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6)); //* True
console.log(checkSubarraySum([23, 2, 6, 4, 7], 13)); //* False
console.log(checkSubarraySum([5, 0, 0, 0], 3)); //* True

//* Time: O(n) - We explore the entire array once, so the time taken scales linearly

//* Space: O(k) - The size of the hashtable scales with the number of possible remainders we can have
//* A (positive) remainder will always be in the range [0, K - 1], or [0, K) (which means excluding K (but include K - 1))
//* We don't have to worry about negative nums[i], so negative remainders can't happen
