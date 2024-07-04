//* Find every subset
//* Add the XOR result of each subset to the total
function subsetXORSum(nums) {
  function backtrack(start, xorSum) {
    totalXORSum += xorSum; //* Add the sum of this subset to the total

    for (let i = start; i < nums.length; i++) {
      xorSum ^= nums[i]; //* Explore candidate
      backtrack(i + 1, xorSum);
      xorSum ^= nums[i]; //* Unexplore candidate
    }
  }

  let totalXORSum = 0;
  backtrack(0, 0);
  return totalXORSum;
}

console.log(subsetXORSum([1, 3]));
console.log(subsetXORSum([1, 2, 3]));
console.log(subsetXORSum([5, 1, 6]));
console.log(subsetXORSum([3, 4, 5, 6, 7, 8]));

//* Time: O(2^n) - The number of subsets is O(2^n)

//* Space: O(n) - The depth of the recursion scales with "n"
