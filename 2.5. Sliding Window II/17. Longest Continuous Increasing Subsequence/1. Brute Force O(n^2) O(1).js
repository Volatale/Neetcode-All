//* In a brute force manner, we can generate every possible subarray
//* If the current element is <= the PREVIOUS element (it is a subarray)
//*     - Then we immediately end the subarray here
//* To get the length of the current subarray, we can use this formula:
//*     - (j - i + 1)
//*         - The subarray STARTS at i and ends at j (inclusive)
//*     - [0...3] implies nums[0] < nums[1] < nums[2] < nums[3]
//*         - The length of this subarray is 4 (3 - 0 + 1)
function findLengthOfLCIS(nums) {
  //* There is either zero or one element, so just return the length
  if (nums.length <= 1) return nums.length;

  let longest = 1;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] <= nums[j - 1]) break;

      //* j - i + 1 gives us the length of the subarray
      longest = Math.max(longest, j - i + 1);
    }
  }

  return longest;
}

console.log(findLengthOfLCIS([1, 3, 5, 4, 7])); //* 3
console.log(findLengthOfLCIS([2, 2, 2, 2, 2])); //* 1
console.log(findLengthOfLCIS([1, 2, 3])); //* 3
console.log(findLengthOfLCIS([-10])); //* 1

//* Time: O(n^2) - We are generating every possible subarray in the worst case

//* Space: O(1) - The memory usage remains constant regardless of input size
