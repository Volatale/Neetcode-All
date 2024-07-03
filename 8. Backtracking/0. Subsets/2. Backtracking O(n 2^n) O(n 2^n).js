function subsets(nums) {
  const results = [];
  backtrack(0, nums, [], results);
  return results;
}

//* We have two options at each step
//* Include the element or Exclude the element
//* There are "n" elements and each of them create 2 branches
//* So 2 * 2 * 2 ... * 2 = 2^n
function backtrack(start, nums, curr, results) {
  //* Base Case
  if (start === nums.length) {
    results.push([...curr]);
    return;
  }

  //* Explore candidate
  curr.push(nums[start]);
  backtrack(start + 1, nums, curr, results);

  //* Explore WITHOUT candidate
  curr.pop();
  backtrack(start + 1, nums, curr, results);
}

console.log(subsets([1, 2, 3]));
console.log(subsets([1]));
console.log(subsets([1, 2, 3, 4, 5]));

//* Time: O(2 * 2^n) - At each step, there are two choices we can make
//* Either include the element or exclude the element

//* Space: O(n * 2^n) - Each subset created has an average length of n / 2
//* The number of subsets created scales at a rate of 2^n
//* The depth of the call stack (for the recursion) is O(n)
