//* Sort the array to make the duplicates adjacent
function permutations(nums) {
  const results = [];
  nums.sort((a, b) => a - b); //* Sort = Adjacent Duplicates
  backtrack(0, nums, results);
  return results;
}

function backtrack(start, nums, results) {
  //* Base Case (permuations have "n" length, same as input)
  if (start === nums.length) {
    results.push([...nums]);
    return;
  }

  const seen = new Set();

  //* "i" will always swap with start for each stack frame
  for (let i = start; i < nums.length; i++) {
    if (i > start && nums[i - 1] === nums[i]) continue;
    if (seen.has(nums[i])) continue;
    seen.add(nums[i]);
    swap(nums, i, start); //* Explore candidate
    backtrack(start + 1, nums, results);
    swap(nums, i, start); //* Unexplore candidate
  }
}

function swap(nums, x, y) {
  [nums[x], nums[y]] = [nums[y], nums[x]];
}

console.log(permutations([1, 1, 2]));
console.log(permutations([1, 2, 3]));
console.log(permutations([1]));
console.log(permutations([5, 5, 5]));

//* Time: O(n n!)
//* There are n * (n - 1) * (n - 2) ... * 1 potential permutations

//* Space: O(n * n!)
//* There are n! arrays created, and they all have "n" length
//* The space used by the call stack is O(n), but this is negligible
