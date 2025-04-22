//* If we have an array of [1, 2, 3], then end result is an array like:
//*     - [1, 2, 3, 1, 2, 3]
//* So if we wanted to implement this purely algorithmically, we can use a single for loop
//* We are told the following:
//*     - ans[i] = nums[i]
//*     - ans[i + n] = nums[i]
//* So we can handle both of these values within a single iteration through the array
function getConcatenation(nums) {
  const n = nums.length;

  //* The returned array should have 2n size
  const result = new Array(2 * n).fill(0);

  for (let i = 0; i < n; i++) {
    result[i] = nums[i];
    result[i + n] = nums[i];
  }

  return result;
}

console.log(getConcatenation([1, 2, 3])); //* [1, 2, 3, 1, 2, 3]
console.log(getConcatenation([1, 1])); //* [1, 1, 1, 1]
console.log(getConcatenation([5])); //* [5, 5]
console.log(getConcatenation([4, 3, 2, 1])); //* [4, 3, 2, 1, 4, 3, 2, 1]

//* Time: O(n) - Array.prototype.concat() has a time complexity of O(n), thus, our function does too

//* Space: O(n) - The returned array's size ultimately scales with the length of the input
