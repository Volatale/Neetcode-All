//* We are looking for a subarray to remove such that:
//*     - (sum(subarray[0:n-1]) - sum(subarray([j:i])) % p === 0
//* In the brute force version, we tried every possible subarray
//*     - In THIS version, we can apply a prefix sum approach
//! Like in the brute force version, we need to get the sum of the entire array
//*     - Otherwise we cannot derive the sum of the remaining array
//* pref_i represents the current cumulative prefi sum modulo p
//*     - pref_i = sum(nums[0] to nums[i]) % p
//* pref_j represents a previous prefix sum modulo p, recorded at some earlier index j
//*     - j < i
//*     - pref_j = sum(nums[0] to nums[j]) % p
//* To REMOVE a subaray such that the sum of the remaining elements is divisible by p
//*     - The sum of the subaray we remove must satisfy:
//*     - subarraySum_j+1 -> i % p = mod
//!         - Where mod is the remainder of the total sum mod p
//*     - subarraySum_j+1 -> i = pref_i - pref_j
//*     - We get the difference of the prefix sums (as we normally would with prefix problems)

//! Using modular arithmetic, the equation "pref_i - pref_j" becomes:
//*     - (pref_i - pref_j) % p = mod
//*     - Except since we are using a hashtable we can't check every possible subarray
//*         - So it is difficult to find a pref_j to remove
//! Rearrange the equation and we get:
//*     - pref_i % p = (pref_j + mod) % p
//!         - We need a previously seen prefix sum pref_j
//*           such that adding mod to pref_j matches pref_i.
//*         - By finding such a j, we can determine a valid subarray to remove
//* pref_i = currMod in our code
//* pref_j = mod in our code
//*     - hence (pref_i - pref_j) % p = mod
function minSubarray(nums, p) {
  const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
  const mod = totalSum % p;

  //* We can't remove a subarray such that the remainder is divisible by k
  if (totalSum < p) return -1;

  //* The entire array is already divisible by k; remove nothing
  if (totalSum % p === 0) return 0;

  let minLength = Infinity;

  //* prefix sum % p : Index. 0 means we remove a subarray of sum 0 (nothing)
  const seen = { 0: -1 };
  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    //* How much the cumulative sum (pref_i) % p is "off" from being divisible by p
    const currMod = prefixSum % p;

    //* If we remove a subarray whose sum has a remainder = mod, the remaining sum % p === 0
    //* (+ p) % p is used to handle negative remainders (so in reality, we are just looking for currMod - mod)
    const targetMod = (currMod - mod + p) % p;

    //* Check if there is a subarray (pref_j) whose sum has a remainder mod p === 0
    if (seen[targetMod] !== undefined) {
      minLength = Math.min(minLength, i - seen[targetMod]);
    }

    //* Mark the current prefix modulo and its (ending) index
    seen[currMod] = i;
  }

  //* If we didn't find a subarray to remove, or we removed the entire array, return -1
  return minLength === Infinity || minLength === nums.length ? -1 : minLength;
}

console.log(minSubarray([3, 1, 4, 2], 6)); //* 1
console.log(minSubarray([6, 3, 5, 2], 9)); //* 2
console.log(minSubarray([1, 2, 3], 3)); //* 0
console.log(minSubarray([4, 5, 6, 7], 1)); //* 0

//* Time: O(n^2) - We have a nested for loop, both of which scale with the input length

//* Space: O(1) - No extra space is being used, so the space usage remains constant regardless of input size
