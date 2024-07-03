function subsetsII(nums) {
  const results = [];
  nums.sort((a, b) => a - b); //* Puts duplicates adjacent to eachother

  function backtrack(i, curr) {
    if (i === nums.length) {
      results.push([...curr]);
      return;
    }

    //* Include nums[i]
    curr.push(nums[i]); //* Explore candidate
    backtrack(i + 1, curr);
    curr.pop(); //* Unexplore candidate

    //* Ignore Duplicates (moves to the FINAL duplicate)
    while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      i++;
    }

    //* Exclude nums[i]
    backtrack(i + 1, curr);
  }

  backtrack(0, []);
  return results;
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
