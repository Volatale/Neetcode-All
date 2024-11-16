//* Use bit manipulation, specifically, use bitwise XOR
//*     - A bit can either be set (1), or cleared (0)
//* Bitwise XOR can be used to replace a set in some instances
//*     - 0 ^ 2 = 2
//*     - 2 ^ 2 = 0
//!         - Why? Because it TOGGLES the corresponding bits on and off
//* If we have the numbers [1, 1, 4]
//*     - 0 ^ 1 = 1 (0b0001)
//*     - 1 ^ 1 = 0 (0b0000): We have effectively REMOVED the 1 from the number
//*     - 0 ^ 4 = 4 (0b0100): So this leaves just the bits that represent the number 4
function singleNumber(nums) {
  //* There is only one number, so that is the single number
  if (nums.length === 1) return nums[0];

  //* Store all of the bits for all the numbers in here
  let val = 0;

  //* Bitwise ^ toggles the bits for the ith number
  for (let i = 0; i < nums.length; i++) {
    val ^= nums[i];
  }

  //* The only remaining number is the bits that were NOT cleared
  return val;
}

console.log(singleNumber([2, 2, 1])); //* 1
console.log(singleNumber([4, 1, 2, 1, 2])); //* 4
console.log(singleNumber([1])); //* 1
console.log(singleNumber([-1])); //* -1
console.log(singleNumber([5, 3, -2, 3, 5, -2, -4])); //* -4

//* Time: O(n) - We iterate through the entire input array, which takes linear time

//* Space: O(1) - The only auxillary space being used is a single 32-bit integer
//* So the space usage remains constant regardless of input size
