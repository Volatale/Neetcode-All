//* The goal is to create an array that is essentially just its self concatenated twice
//* So if we have an array like [1, 2, 3]
//*     - Then the returned array should be [1, 2, 3, 1, 2, 3]
//* Trivially, we can just spread the returned array twice
function getConcatenation(nums) {
  return [...nums, ...nums];
}

console.log(getConcatenation([1, 2, 3])); //* [1, 2, 3, 1, 2, 3]
console.log(getConcatenation([1, 1])); //* [1, 1, 1, 1]
console.log(getConcatenation([5])); //* [5, 5]
console.log(getConcatenation([4, 3, 2, 1])); //* [4, 3, 2, 1, 4, 3, 2, 1]

//* Time: O(n) - Each spread takes O(n), and we spread the array twice

//* Space: O(n) - The returned array's size ultimately scales with the length of the input
