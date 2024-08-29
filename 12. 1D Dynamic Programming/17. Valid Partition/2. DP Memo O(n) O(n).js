//* Start from 0 and try to get to index "n"
//* There are three cases to handle
//*     - Double Duplicates
//*     - Triple Duplicates
//*     - Increasing subarray

//* Apply memoization to avoid redundant work
function validPartition(nums) {
  function partition(i, memo) {
    //* Successfully partitioned array
    if (i === nums.length) return true;

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Case 1: Handle double duplicates
    if (i + 1 < n && nums[i] === nums[i + 1]) {
      if (partition(i + 2, memo)) {
        memo[i] = true;
        return true;
      }
    }

    //* Case 2: Handle triple duplicates
    if (i + 2 < n && nums[i] === nums[i + 1] && nums[i] === nums[i + 2]) {
      if (partition(i + 3, memo)) {
        memo[i] = true;
        return true;
      }
    }

    //* Case 3: Handle monotonically increasing subarrays
    if (
      i + 2 < n &&
      nums[i] + 1 === nums[i + 1] &&
      nums[i] + 2 === nums[i + 2]
    ) {
      if (partition(i + 3, memo)) {
        memo[i] = true;
        return true;
      }
    }

    memo[i] = false;
    return false;
  }

  const n = nums.length;
  return partition(0, {});
}

console.log(validPartition([1, 2, 3])); //* True
console.log(validPartition([4, 4, 4, 5, 6])); //* True
console.log(validPartition([1, 1, 1, 2])); //* False
console.log(validPartition([2, 2])); //* True
console.log(validPartition([5])); //* False

//* Time: O(n) - There are 3 * n unique subproblems in the worst case
//* There are 3 branches and the height of the tree is scales with the number of elements
//* We memoize the index at each step

//* Space: O(n) - The depth of the recursion tree scales with the number of elements
//* The memo object stores 3 * n keys/values in the worst casse
