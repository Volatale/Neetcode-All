//* We know that performing XOR on every element gives us the SINGLE number
//* But now we have TWO numbers that only occur once
//* IF we XOR every number, we are left with the XOR of both the single occurrence numbers
//!     - We are guaranteed that AT LEAST one bit position won't match
//*     - 3 ^ 5 = 6
//*         - 0b0011
//*         - 0b0101
//!         - Bit position (0-indexed) 1 and 2 do not match
//!         - If they DID match on every position, they'd be the same number
//* Using that logic, we can split the numbers up into TWO groups
//* Find the FIRST set bit in the XOR result
//* Then, if nums[i] & firstSetBit = 1
//*     - XOR this number into group A
//* Otherwise, XOR it into group B
function singleNumber(nums) {
  //* There are only two elements
  if (nums.length === 2) return nums;

  let xor = 0;

  //* Get the XOR result of EVERY number
  for (let i = 0; i < nums.length; i++) {
    xor ^= nums[i];
  }

  //* Find the first set bit
  let firstSetBit = xor & -xor;

  //* XOR into different groups (numbers)
  //* Each duplicate group
  let a = 0;
  let b = 0;

  for (let i = 0; i < nums.length; i++) {
    if (firstSetBit & nums[i]) {
      a ^= nums[i];
    } else {
      b ^= nums[i];
    }
  }

  return [a, b];
}

console.log(singleNumber([1, 2, 1, 3, 2, 5])); //* [3, 5]
console.log(singleNumber([-1, 0])); //* [-1, 0]
console.log(singleNumber([4, 1, 2, 3, 4, 2, 1, 7])); //* [3, 7]

//* Time: O(n) - We need to iterate through the input and get the XOR result of every element
//* We can find the first set bit in O(1) time (instead of left shifting, which would take O(log n))
//* Finally, it takes O(n) to iterate over the array again and form our XOR groups

//* Space: O(1) - We always use the samen amount of space regardless of the input size
