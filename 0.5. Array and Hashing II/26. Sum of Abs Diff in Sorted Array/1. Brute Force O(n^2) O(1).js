//* Try every pair of elements
//* Skip the current iteration if i === j
function getSumAbsoluteDifferences(nums) {
  //* result[i] = abs diff between nums[i] and all other elements
  const result = new Array(nums.length).fill(0);

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = 0; j < nums.length; j++) {
      //* Ignore identical indices
      if (i === j) continue;

      sum += Math.abs(nums[i] - nums[j]);
    }

    result[i] = sum;
  }

  return result;
}

console.log(getSumAbsoluteDifferences([2, 3, 5])); //* [4, 3, 5]
console.log(getSumAbsoluteDifferences([1, 4, 6, 8, 10])); //* [24, 15, 13, 15, 21]

//* Time: O(n^2) - The number of iterations we do scales with n * (n + 1) / 2

//* Space: O(n) - The result array scales proportionally in size with the input size
