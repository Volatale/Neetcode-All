//* Try to find a duplicate for very possible element
//* Each element only appears twice at most
//* And any value that we already found a duplicate for won't be considered again
//*     - Why? Because we already found ONE copy of the number, the other is somewhere ->
//*     - Thus we'll never have a duplicate in the result
function findDuplicates(nums) {
  //* There are no duplicates
  if (nums.length <= 1) return [];

  const duplicates = [];

  //* Try to find a duplicate for every number
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        duplicates.push(nums[i]);
      }
    }
  }

  return duplicates;
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); //* [2, 3]
console.log(findDuplicates([1, 1, 2])); //* [1]
console.log(findDuplicates([1])); //* []

//* Time: O(n^2) - We are using a nested for loop, so there are (n * (n + 1) / 2) iterations

//* Space: O(1) - The auxillary space is excluded, so we are using constant space
