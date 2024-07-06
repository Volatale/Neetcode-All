function partitionToKEqualSumSubsets(nums, k) {
  //* There aren't enough numbers to make "k" groups
  if (nums.length < k) return false;

  const numsSum = nums.reduce((acc, curr) => acc + curr, 0);
  const groupMax = numsSum / k; //* Maximum value that each group can have

  //* Can't evenly divide sum into "k" groups
  if (numsSum % k !== 0) return false;

  //* Each index represents ONE of the "k" groups
  const groups = new Array(k).fill(0);

  //* Sort in DESCENDING order; makes it easier to add to groups
  nums.sort((a, b) => b - a);

  return backtrack(0, groupMax, groups, k, nums);
}

function backtrack(index, groupMax, groups, k, nums) {
  //* Successfully used every element
  if (index === nums.length) {
    return true;
  }

  //* Try placing nums[index] in the "ith" group
  for (let i = 0; i < k; i++) {
    if (
      //* Ensures each group's sum is equal to "groupMax"
      groups[i] + nums[index] > groupMax ||
      //* If the prev group's value is the same and THAT failed, THIS one will too
      (i > 0 && groups[i - 1] === groups[i])
    )
      continue;

    groups[i] += nums[index]; //* Explore WITH this element in this group
    if (backtrack(index + 1, groupMax, groups, k, nums)) return true;
    groups[i] -= nums[index]; //* Reverse decision
  }

  //* Failed to partition into "k" groups
  return false;
}

console.log(partitionToKEqualSumSubsets([5, 5, 5], 3)); //* True
console.log(partitionToKEqualSumSubsets([4, 3, 2, 3, 5, 2, 1], 4)); //* True
console.log(partitionToKEqualSumSubsets([1, 2, 3, 4], 3)); //* False
console.log(partitionToKEqualSumSubsets([5], 2)); //* False
console.log(partitionToKEqualSumSubsets([5, 6, 4], 3)); //* False
console.log(
  partitionToKEqualSumSubsets(
    [10, 1, 10, 9, 6, 1, 9, 5, 9, 10, 7, 8, 5, 2, 10, 8],
    11
  )
); //* False

//* Time: O(k^n) - We have to create "k" groups
//* Summing the array takes O(n)
//* It takes O(n log n) to sort the array
//* Creating the groups array takes O(k) time
//* Each call to backtrack creates "k" more calls to backtrack
//* The branching factor is therefore "k"
//* The depth of the recursion scales with nums.length (n)
//* branchingFactor ^ depthOfRecursion = k^n

//* Space: O(k + n) - It takes O(k) space to create the "groups" array
//* The depth of the recursion is O(n) since we return when index === nums.length
