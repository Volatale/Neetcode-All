function subsets(nums) {
  const results = [];
  backtrack(0, nums, [], results);
  return results;
}

//* Add the current selected elements to the results
//* Include the current element and also exclude it in the next iteration
function backtrack(start, nums, curr, results) {
  results.push([...curr]);

  for (let i = start; i < nums.length; i++) {
    curr.push(nums[i]); //* Explore candidate
    backtrack(i + 1, nums, curr, results);
    curr.pop(); //* Remove candidate
  }
}

console.log(subsets([1, 2, 3]));
console.log(subsets([1]));
console.log(subsets([1, 2, 3, 4, 5]));

//* Time: O(n * 2^n) - At each step, there are two choices we can make
//* Either include the element or exclude the element
//* The spread operator takes O(n) within each call (in the worst case we spread n elements)

//* Space: O(n * 2^n) - Each subset created has an average length of n / 2
//* The number of subsets created scales at a rate of 2^n
//* The depth of the call stack (for the recursion) is O(n)
