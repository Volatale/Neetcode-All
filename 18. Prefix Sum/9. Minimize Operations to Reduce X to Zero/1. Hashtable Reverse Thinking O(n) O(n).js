//* Use reverse thinking
//* Find the maximum length subarray whose sum = sum - x
//*     - Remove that subarray from the original (input) array
//* This leaves us with the elements that should be removed
//*     - To get the length of this array, we can use a formula:
//*     - operations = length of original array - maximum length subarray
//* Essentially, we are deriing the answer instead of computing it directly
//* We use prefix sums as a way to track the index of each subarray and its sum
//*     - Then, we can subtract "i" from whatever the index of that subarray was to get a (potential) max length

//! In order to MINIMIZE something, we need to maximize something else
//*     - In our case, we want to minimize the number of operations needed to reduce "x" to 0
//*     - This implies we need to MAXIMIZE the length of the subarray we DON'T remove
//* So if we get the (maximum) length of the subarray that sums to "sum - x"
//*     - We can subtract this from nums.length to get the number of elements we need to remove
//!     - The number of elements we need to remove is whatever is left over after this removal
function minOperations(nums, x) {
  //* Why -x? target = sum - x, so subtract x immediately
  let target = -x;

  //* Get the sum of all elements
  for (let i = 0; i < nums.length; i++) {
    target += nums[i];
  }

  //* We need to remove ALL of the elements to reduce x to 0
  if (target === 0) return nums.length;

  const map = { 0: -1 }; //* Key = Subarray Sum, Value = Index we found it at
  let prefixSum = 0;
  let result = -Infinity;

  //* pref_i - pref_j = k. So pref_j = pref_i - k
  //* Look for a subarray (pref_j) that we can remove from the current subarray (pref_i) to get "target" (k)
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    //* Found a subarray we can remove such that the sum of the remaining array = x
    if (map[prefixSum - target] !== undefined) {
      result = Math.max(result, i - map[prefixSum - target]);
    }

    //* Add this subarray (sum) to the hashtable (value is the index)
    map[prefixSum] = i;
  }

  //* No. of Operations (removals) = length of original array - length of max length subarray that sums to "sum - x"
  //* If there were 5 elements originally, and we remove 3 (the max length subarray elements), that leaves 2
  return result === -Infinity ? -1 : nums.length - result;
}

console.log(minOperations([1, 1, 4, 2, 3], 5)); //* 2
console.log(minOperations([5, 6, 7, 8, 9], 4)); //* -1
console.log(minOperations([3, 2, 20, 1, 1, 3], 10)); //* 5
console.log(minOperations([5, 2, 3, 1, 1], 5)); //* 1

//* Time: O(n) - It takes O(n) to calculate target, and it also takes O(n) to find the subarray to remove

//* Space: O(n) - All of the elements are positive, so there will be a unique key for each element in the array
