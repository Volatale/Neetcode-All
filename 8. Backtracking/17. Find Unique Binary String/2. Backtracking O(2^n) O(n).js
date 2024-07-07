//* The number of binary strings scales with the number of subsets
//* So if the length of "000" is 3
//* 2^3 = 8, so there are 8 binary strings of 3 length
//* At each step, either append a "0" or a "1"
//* We are guaranteed to find at least one that does not exist
//* Return whichever one is NOT an empty string
function findUniqueBinaryString(nums) {
  const binaryNums = new Set(nums);

  //* The length of each binary string will be the same
  return backtrack(0, "", binaryNums, nums[0].length);
}

function backtrack(index, curr, binaryNums, length) {
  //* Base Case; sucessfully created a binary string
  if (index === length) {
    return !binaryNums.has(curr) ? curr : "";
  }

  //* Try both possibilities at each step
  const withZero = backtrack(index + 1, curr + "0", binaryNums, length);
  const withOne = backtrack(index + 1, curr + "1", binaryNums, length);

  //* Return the one that IS NOT an empty string
  return withZero || withOne;
}

console.log(findUniqueBinaryString(["00"]));
console.log(findUniqueBinaryString(["01", "10"]));
console.log(findUniqueBinaryString(["111", "001", "010"]));

//* O(2^n) - At each step, we either append a "0" or a "1"
//* So the branching factor is 2
//* The depth of the recursion is proportional to the length of each string in the input
//* branchingFactor ^ depthOfRecursion = 2^n

//* Space: O(n) - The depth of the recursion is "n"
//* String concatenation creates a new string, which can have a maximum length of "n"
