//* Try every possible subarray
//* Track the frequency of its elements
//* If the frequency of an element is ever > k
//*     - End the subarray here; the frequency will never decrease
//* (j - i + 1) gives us the length of the current subarray
//*     - We want the LONGEST valid subarray, so take the maximum
function maxSubarrayLength(nums, k) {
  const freq = new Map(); //* Tracks freq of subarray elements
  let maxLength = 0;

  for (let i = 0; i < nums.length; i++) {
    freq.clear();

    for (let j = i; j < nums.length; j++) {
      //* Add the current element to the subarray
      freq.set(nums[j], (freq.get(nums[j]) || 0) + 1);

      //* The subarray is now invalid; end the subarray here
      if (freq.get(nums[j]) > k) break;

      maxLength = Math.max(maxLength, j - i + 1);
    }
  }

  return maxLength;
}

console.log(maxSubarrayLength([1, 2, 3, 1, 2, 3, 1, 2], 2)); //* 6
console.log(maxSubarrayLength([1, 2, 1, 2, 1, 2, 1, 2], 1)); //* 2
console.log(maxSubarrayLength([5, 5, 5, 5, 5, 5, 5], 4)); //* 4
console.log(maxSubarrayLength([1, 2, 3], 1)); //* 3
