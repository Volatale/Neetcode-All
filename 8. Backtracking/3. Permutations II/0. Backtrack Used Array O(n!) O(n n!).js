//* Sort the array to make the duplicates adjacent
function permutations(nums) {
  const results = [];
  const used = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b);
  backtrack([], used, nums, results);
  return results;
}

function backtrack(curr, used, nums, results) {
  //* Base Case
  if (curr.length === nums.length) {
    results.push([...curr]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    //* Skip this element if it was used, or, if prev === curr && THAT element was used
    if (used[i] || (i > 0 && nums[i - 1] === nums[i] && used[i - 1])) continue;

    //* Explore candidate
    used[i] = true;
    curr.push(nums[i]);
    backtrack(curr, used, nums, results);

    //* Unexplore candidate
    curr.pop();
    used[i] = false;
  }
}

console.log(permutations([1, 2]));
console.log(permutations([1, 1, 2]));
console.log(permutations([1, 2, 3]));
console.log(permutations([1]));
console.log(permutations([5, 5, 5]));

//* Time: O(n n!)
//* There are n * (n - 1) * (n - 2) ... * 1 potential permutations

//* Space: O(n * n!)
//* There are n! arrays created, and they all have "n" length
//* The space used by the call stack is O(n), but this is negligible
