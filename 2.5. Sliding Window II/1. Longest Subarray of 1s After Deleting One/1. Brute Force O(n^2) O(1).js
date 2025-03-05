//* Try every possible subarray
//* There is no need to actually delete something from the array
//* All we have to do is track the current number of 0s
//* If we encounter a 0:
//*     - Then as long as we don't already have a 0, we can include it
//* If zeroes > 1, then we can't include this subarray
//*     - Hence we end it immediately
//* If we found a valid subarray, we can subtract 1 from the result
//*     - We don't have a choice in deleting, we MUST delete something
//* Otherwise, just return 0
function longestSubarray(nums, k) {
  let maxOnes = 0;

  //* Try every possible subarray
  for (let i = 0; i < nums.length; i++) {
    let currZeroes = 0; //* Track no. of zeroes in curr subarray

    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) {
        currZeroes++;
      }

      //* Invalid subarray, break out of the loop
      if (nums[j] === 0 && currZeroes > 1) {
        break;
      }

      //* Found a valid subarray
      maxOnes = Math.max(maxOnes, j - i + 1);
    }
  }

  //* Subtract one from the max consecutive ones
  return maxOnes > 0 ? maxOnes - 1 : 0;
}

console.log(longestSubarray([1, 1, 0, 1])); //* 3
console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])); //* 5
console.log(longestSubarray([1, 1, 1])); //* 2

//* Time: O(n^2) - Generating every possible subarray takes O(n * (n + 1) / 2) time -> O(n^2)

//* Space: O(1) - The memory usage remains constant regardless of input size
