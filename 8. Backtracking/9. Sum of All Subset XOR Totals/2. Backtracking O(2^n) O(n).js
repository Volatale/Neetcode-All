//* Find every subset
//* Add the XOR result of each subset to the total
function subsetXORSum(nums) {
  return backtrack(0, 0, nums);
}

function backtrack(index, xorSum, nums) {
  if (index === nums.length) return xorSum;

  //* At each level of recursion, include the element or don't
  const include = backtrack(index + 1, xorSum ^ nums[index], nums);
  const exclude = backtrack(index + 1, xorSum, nums);

  return include + exclude;
}

console.log(subsetXORSum([1, 3]));
console.log(subsetXORSum([1, 2, 3]));
console.log(subsetXORSum([5, 1, 6]));
console.log(subsetXORSum([3, 4, 5, 6, 7, 8]));

//* Time: O(2^n) - The number of subsets is O(2^n)

//* Space: O(n) - The depth of the recursion scales with "n"
