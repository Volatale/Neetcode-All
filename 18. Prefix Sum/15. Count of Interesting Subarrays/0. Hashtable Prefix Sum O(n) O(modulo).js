//* A subrray sum is defined as:
//*     - pref_i - pref_j-1 = K
//* We can rearrange that equation to get
//*     - pref_j-1 = pref_i - K
//* So if nums[i] % modulo === k
//*     - We take nums[i] to be 1
//*     - Otherwise, we take it as 0
//* Why does a prefix sum approach work?
//*     - We don't care about nums[i] itself, we ONLY care if nums[i] % modulo === k
//*         - "cnt is the number of indices i in the range [L, R] such that nums[i] % modulo === k"
//!         - Thus, cnt represents the number of elements divisible by modulo === k in the range [0, i]
//*     - We add 1 to prefixRem if nums[i] % modulo === k, so this is cumulative
//* We don't need the entire subarray to be divisible by K
//* But we ARE looking for remainders
//* Remember, pref_j-1 = pref_i - k
//*     - We are checking if pref_j-1 exists in the hashtable
//!         - rem = (prefixSum - k + modulo) % modulo
//*     - If it does, we add all of the subarrays that have a remainder of "rem" to our count
//*         - Why? A remainder is in the range [0, modulo - 1]
//*         - Thus, as per the pigeonhole principle
//*             - We have a limited number of possible keys in the hashtable (pigeonholes)
//*               to store our remainders (pigeons)
function counterInterestingSubarrays(nums, modulo, k) {
  let subarrays = 0;

  //* No. of nums[i] % modulo === k in first i + 1 elements (pref_i)
  let prefixRem = 0;

  //* Number of prefix arrays that have a remainder of prefixRem % modulo === k (pref_j-1)
  const seenRemainders = { 0: 1 };

  for (let i = 0; i < nums.length; i++) {
    //* We don't care about nums[i], rather, we care if nums[i] % modulo === k
    prefixRem = (prefixRem + (nums[i] % modulo === k ? 1 : 0)) % modulo;

    //* pref_i - pref_j-1 = k, which, when rearranged, gives pref_j-1 = pref_i - k
    //* + mod turns negative remainders positive, and if it was already positive, % mod again
    //* (A - B) % K = 0 means A % K = B % K, so search for a remainder we have already seen
    const rem = (prefixRem - k + modulo) % modulo;

    //* There are seen[rem] subarrays with the same remainder that end at i
    subarrays += seenRemainders[rem] || 0;

    //* Increment the frequency; we found another subarray with that remainder
    seenRemainders[prefixRem] = (seenRemainders[prefixRem] || 0) + 1;
  }

  return subarrays;
}

console.log(counterInterestingSubarrays([3, 2, 4], 2, 1)); //* 3
console.log(counterInterestingSubarrays([3, 1, 9, 6], 3, 0)); //* 2
console.log(counterInterestingSubarrays([1, 1, 1], 2, 1)); //* 4
console.log(counterInterestingSubarrays([2, 2, 2], 2, 1)); //* 0
console.log(counterInterestingSubarrays([1], 2, 1)); //* 1

//* Time: O(n) - Iterating over the entire array takes O(n)

//* Space: O(modulo) - The number of possible keys is determined by the number of remainders
//* The number of remainders is in the range [0, modulo - 1]
