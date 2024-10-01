//* Subsequences are just subsets while retaining the relative order
//*     - So at each step, we either include or exclude the current element
//* Since we need to alternate between adding and subtracting
//!     - Use a boolean to track the two different states
//*     - Take the maximum of both paths

//* Apply memoization to avoid redundant work
//*     - We have 2D state (i, plus)
//*     - There are only two possible values for plus
function maxAlternatingSum(nums) {
  function findSum(i, plus, memo) {
    //* Base Case: No more elements to consider
    if (i === nums.length) return 0;

    //* Utilize memoized value
    const key = `${i}-${plus}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let maxSum = 0;

    //* Case 1: Include current element
    if (plus) {
      //* Add the element (even index)
      maxSum = Math.max(maxSum, nums[i] + findSum(i + 1, false, memo));
    } else {
      //* Subtract the element (odd index)
      maxSum = Math.max(maxSum, -nums[i] + findSum(i + 1, true, memo));
    }

    //* Case 2: Exclude current element
    maxSum = Math.max(maxSum, findSum(i + 1, plus, memo));

    return (memo[key] = maxSum);
  }

  //* We start with the "plus" position (even)
  return findSum(0, true, {});
}

console.log(maxAlternatingSum([4, 2, 5, 3])); //* 7
console.log(maxAlternatingSum([5, 6, 7, 8])); //* 8
console.log(maxAlternatingSum([6, 2, 1, 2, 4, 5])); //* 10
console.log(maxAlternatingSum([5])); //* 5
console.log(maxAlternatingSum([5, 10])); //* 10
console.log(maxAlternatingSum([10, 5, 4])); //* 10

//* Time: O(n) - We are memoizing the result of each subproblem
//* There are "n" possible indices and 2 possible values for plus (true, false)
//* Thus, using the rule of product: n * 2 = O(n)

//* Space: O(n) - Since there are n * 2 unique subproblems, there is an equivalent number of keys
//* The height of the recursion tree scales with "n"
