function subsetsII(nums) {
  const results = [];
  nums.sort((a, b) => a - b); //* Makes duplicates adjacent
  backtrack(0, [], nums, results);
  return results;
}

function backtrack(start, curr, nums, results) {
  results.push([...curr]);

  for (let i = start; i < nums.length; i++) {
    //* Ignore duplicates relative to THIS stack frame
    //* which is why we do i > start and not i > 0
    if (i > start && nums[i - 1] === nums[i]) continue;
    curr.push(nums[i]);
    backtrack(i + 1, curr, nums, results);
    curr.pop();
  }
}

console.log(subsetsII([1, 2, 2]));
console.log(subsetsII([0]));
console.log(subsetsII([1, 2, 3]));
console.log(subsetsII([5, 2, 3]));

//* Time: O(n * 2^n) - At each step, there are two choices we can make
//* Either include the element or exclude the element
//* The spread operator takes O(n) within each call (in the worst case we spread n elements)

//* Space: O(n * 2^n) - Each subset created has an average length of n / 2
//* The number of subsets created scales at a rate of 2^n
//* The depth of the call stack (for the recursion) is O(n)
