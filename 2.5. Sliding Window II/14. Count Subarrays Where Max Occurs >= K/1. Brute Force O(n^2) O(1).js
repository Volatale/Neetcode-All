//* First, we need to determine what the maximum element in nums is
//* In a brute force manner, try every possible subarray
//* For each subarray, track the frequency of the max element
//* If the frequency is >= k, we have a valid subarray
//! One optimziation we can make is that if [i...j] is valid
//* Then there are nums.length - j more valid subarrays
//*     - So we "could" immediately break out of the inner loop
//*     - But the readability of the function is dampened
function countSubarrays(nums, k) {
  let subarrays = 0;

  //* Get theyo.js maximum element in nums
  const maxElement = Math.max(...nums);

  for (let i = 0; i < nums.length; i++) {
    let freqOfMax = 0;

    for (let j = i; j < nums.length; j++) {
      //* Found an occurrence of the maximum element
      if (nums[j] === maxElement) {
        freqOfMax++;
      }

      //* We found a valid subarray
      if (freqOfMax >= k) {
        subarrays++;
      }
    }
  }

  return subarrays;
}

console.log(countSubarrays([1, 3, 2, 3, 3], 2)); //* 6
console.log(countSubarrays([1, 3, 2, 1], 3)); //* 0
console.log(countSubarrays([1, 2, 3, 4, 5], 1)); //* 5
console.log(countSubarrays([5, 5, 5, 5], 4)); //* 1

//* Time: O(n^2) - We have a nested for loop, both of which scale with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
