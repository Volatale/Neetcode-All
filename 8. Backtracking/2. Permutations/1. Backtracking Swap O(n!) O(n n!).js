//* Permutations care about the ORDERING of elements
//* So why not just swap the indices?
function permutations(nums) {
  const results = [];
  backtrack(0, nums, results);
  return results;
}

function backtrack(start, nums, results) {
  //* Base Case (permuations have "n" length, same as input)
  if (start === nums.length) {
    results.push([...nums]);
    return;
  }

  //* "i" will always swap with start for each stack frame
  for (let i = start; i < nums.length; i++) {
    swap(nums, i, start); //* Explore candidate
    backtrack(start + 1, nums, results);
    swap(nums, i, start); //* Unexplore candidate
  }
}

function swap(nums, x, y) {
  [nums[x], nums[y]] = [nums[y], nums[x]];
}

console.log(permutations([1, 2, 3]));
console.log(permutations([0, 1]));
console.log(permutations([1]));

//* Time: O(n!)
//* Each level of recursion iterates over the remaining elements
//* n * (n - 1) * (n - 2) x ... x 1 = n! operations
//* Each level has O(n) swaps and calls
//* The depth of the recursion is "n"
//* Total number of permutations is n!

//* Space: O(n * n!)
//* There are n! arrays created, and they all have "n" length
//* The space used by the call stack is O(n), but this is negligible
