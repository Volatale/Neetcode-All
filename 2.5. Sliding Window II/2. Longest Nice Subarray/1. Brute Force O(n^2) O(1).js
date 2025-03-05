//* The absolute brute force would be to generate EVERY subarray
//* And then individually validate each of them using nested for loops
//* But that takes O(n^2 * m) where m is the number of subarrays
//* Instead, we use ONE nested for loop to try all the subarrays
//* If we already have a subarray, adding a NEW element means validating it
//*     - We need to AND it with every other element in the subarray
//* But this would be an O(n) operation in the worst case
//* To prevent this, we can simply AND nums[j] with ALL of the bits of numbers in this subarray
//* For example, for the array [1, 2, 3]
//*     - [1, 2] has a bitmask of (0001 & 0010 = 0011), so this is invalid
//*     - That means we never make it to [1, 2, 3] since the subarray already ended
//* When we successfully add an element to the current subarray
//*     - We need to add nums[j]'s bits to the current bitmask
//* Lets say we have [4, 8, 8]:
//*     - (4 & 8) = 0, so [4, 8] is a valid subarray
//*         - bitmask |= 4 (0 | 4 = 4)
//*         - Then, we'll try to add the SECOND 8
//*     - (bitmask & 8) = 0
//*         - (4 & 8 & 8) = 0
//*         - So this is valid
//* Essentially, we track all of the bits of elements that are in the current subarray
//* Then, we can AND nums[j] with that bitmask, because that has the same effect as trying ALL AND pairs
function longestNiceSubarray(nums) {
  let longest = 1; //* One element is always nice

  for (let i = 0; i < nums.length; i++) {
    let mask = 0; //* Start with the bits in nums[i]

    for (let j = i; j < nums.length; j++) {
      //* Conflict detected
      if ((mask & nums[j]) !== 0) {
        break;
      }

      mask |= nums[j]; //* Add nums[j]'s bits to the mask
      longest = Math.max(longest, j - i + 1);
    }
  }

  return longest;
}

console.log(longestNiceSubarray([1, 3, 8, 48, 10])); //* 3
console.log(longestNiceSubarray([3, 1, 5, 11, 13])); //* 1
console.log(longestNiceSubarray([4, 8])); //* 2

//* Time: O(n^2) - We have to try every possible subarray, so we use nested loops

//* Space: O(1) - The memory usage remains constant regardless of input size
