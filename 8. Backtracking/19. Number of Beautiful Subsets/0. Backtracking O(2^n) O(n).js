//* If curr.length === 0, we can always add the element
//* If curr.length > 0, we need to ensure we are able to add it
//*     - Subtract nums[i] from each element in the subset
//*     - If none of the result in "k", we can add it to the subset
//* There is no point extending a path that does not meet the above criteria
//* Track the total number of beautiful subsets
//* The base case is if index === nums.length
//*     - At that point, we can ONLY include subsets of length > 0
//*     - So if curr.length === 0, return 0, else return 1
function numberOfBeautifulSubsets(nums, k) {
  return backtrack(0, [], nums, k);
}

function backtrack(index, curr, nums, k) {
  //* Indicates potential beautiful subset (cannot be empty, or return 0)
  if (index === nums.length) {
    return curr.length > 0 ? 1 : 0;
  }

  let beautifulSubsets = 0;

  //* Explore WITH element
  if (curr.length === 0 || (curr.length > 0 && canAdd(nums[index], curr, k))) {
    curr.push(nums[index]);
    beautifulSubsets += backtrack(index + 1, curr, nums, k);
    curr.pop();
  }

  //* Explore WITHOUT element
  beautifulSubsets += backtrack(index + 1, curr, nums, k);

  return beautifulSubsets;
}

//* For all "val" in subset, check if abs diff of num - val === k
function canAdd(val, subset, k) {
  for (let num of subset) {
    if (Math.abs(num - val) === k) return false;
  }

  return true;
}

console.log(numberOfBeautifulSubsets([1, 3], 2)); //* 2
console.log(numberOfBeautifulSubsets([2, 4, 6], 2)); //*  4
console.log(numberOfBeautifulSubsets([1], 2)); //*  1
console.log(numberOfBeautifulSubsets([5, 5], 2)); //*  3
console.log(numberOfBeautifulSubsets([1, 2, 3, 4, 5], 3)); //*  17

//* Time: O(n * 2^n) - There are 2^n possible subsets
//* At each step, we either include the element or exclude it
//* So the branching factor is 2
//* The depth of the recursion is O(n) where "n" is the length of the input
//* branchingFactor ^ depthOfRecursion = O(2^n)
//* But within each backtrack call, we call canAdd()
//*     - This takes O(n) in the worst case
//* So O(n * 2^n)

//* Space: O(n) - The depth of the recursion is "n"
//* The curr array stores up to "n" elements at once
