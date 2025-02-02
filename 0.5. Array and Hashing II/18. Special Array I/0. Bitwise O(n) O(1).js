//* Simply check the parity of each adjacent element
//* Start at index 1 and lookback
//* Instead of using the modulo operator, we use bitwise AND
//* This saves CPU cycles per iteration
//*     - Especially since we would be doing 2 modulos per
//* If the parity of two adjacent elements is never equal, "nums" is special
function isArraySpecial(nums) {
  //* An array with 1 or less element is always special
  if (nums.length <= 1) return true;

  //* Check the parity of every other element
  for (let i = 1; i < nums.length; i++) {
    if ((nums[i - 1] & 1) === (nums[i] & 1)) return false;
  }

  //* nums is special
  return true;
}

console.log(isArraySpecial([1])); //* True
console.log(isArraySpecial([2, 1, 4])); //* True
console.log(isArraySpecial([5, 5, 2, 1])); //* False (5 -> 5 are both odd)
console.log(isArraySpecial([10, 11, 12, 13])); //* True
console.log(isArraySpecial([10, 9, 13, 14, 15])); //* False (9 > 13 are both odd)

//* Time: O(n) - We have to iterate over every element in the array
