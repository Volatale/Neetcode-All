//* Similar to Subarray Sum Equals K, except we aren't removing subarrays here
//* Use a prefix sum to track the cumulative sum of pref_i
//* pref_j is any subarray that exists in the hashtable so far
//* All we have to do is use modulo on the current subarray sum (pref_i)
//!     - It is important to handle negative remainders
//*         - pref % k gives us the remainder -> add k to make the result POSTIIVE
//*         - Then mod by k again to ensure it is within the range [0, remainder) (exclusive)
//!     - This is necessary because in programming, we only have the % operator
//*         - But the % operator is a REMAINDER operator, not the modulus operator that exist in mathematics

//* Let psum_i represent the prefix sum up to index i
//*     - psum_i = arr[0] + arr[1] + ... + arr[i]
//* For any subarray starting at j and ending at i, the SUM of the subarray is:
//*     - sum(subarray[j:i]) = psum_i - psum_j-1
//! We want the subarray sum to be DIVISIBLE by K
//*     - sum(subarray[j:i]) = (psum_i - psum_j-1) % K = 0
//* Rearrange the formula such that we get
//*     - psum_i % K = psum_j-1 % K
//!     - The REMAINDER when psum_i or psum_j-1 are divided by K should be equal
//* As we iterate through the array, compute the prefix sum mod k for each index
//*     - remainder_i = psum_i % K
//* Use a map or dictionary to track how many times each remainder has occurred thus far
//*     - countMap[remainder]++
//* If the current remainder_i has been seen before
//*     - It means there are countMap[remainder] subarrays ENDING at index i that are also divisible by K
function subarraysDivByK(nums, k) {
  const seen = { 0: 1 }; //* Mod : Frequency of subarray
  let subarrays = 0;
  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    //* Ensure remainder is always >= 0 (we can't have negative remainders)
    const mod = ((prefixSum % k) + k) % k;

    //* Add an occurrence for every other value of "mod" found thus far
    subarrays += seen[mod] || 0;

    //* Increment the frequency of this "mod" value
    seen[mod] = (seen[mod] || 0) + 1;
  }

  return subarrays;
}

console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5)); //* 7
console.log(subarraysDivByK([5], 9)); //* 0
console.log(subarraysDivByK([2, 4, 6, 8], 2)); //* 10
console.log(subarraysDivByK([2, 3, -2, 2], 5)); //* 6

//* Time: O(n) - We iterate through the entire array, so the time taken scales with the input size
//* It takes Θ(1) on average to perform lookups in the hashtable

//* Space: O(n) - In the worst case, each sum is unique, thus there will be "n" keys in the hashtable
