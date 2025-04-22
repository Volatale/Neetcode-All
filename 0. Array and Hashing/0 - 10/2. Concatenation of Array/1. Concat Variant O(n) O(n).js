//* Similarly to the spread variant, we can just concatenate the array to itself
function getConcatenation(nums) {
  return nums.concat(nums);
}

console.log(getConcatenation([1, 2, 3])); //* [1, 2, 3, 1, 2, 3]
console.log(getConcatenation([1, 1])); //* [1, 1, 1, 1]
console.log(getConcatenation([5])); //* [5, 5]
console.log(getConcatenation([4, 3, 2, 1])); //* [4, 3, 2, 1, 4, 3, 2, 1]

//* Time: O(n) - Array.prototype.concat() has a time complexity of O(n), thus, our function does too

//* Space: O(n) - The returned array's size ultimately scales with the length of the input
