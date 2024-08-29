//* Start from 0 and try to get to index "n"
//* There are three cases to handle
//*     - Double Duplicates
//*     - Triple Duplicates
//*     - Increasing subarray
function validPartition(nums) {
  function partition(i) {
    //* Successfully partitioned array
    if (i === nums.length) return true;

    //* Case 1: Handle double duplicates
    if (i + 1 < n && nums[i] === nums[i + 1]) {
      if (partition(i + 2)) return true;
    }

    //* Case 2: Handle triple duplicates
    if (i + 2 < n && nums[i] === nums[i + 1] && nums[i] === nums[i + 2]) {
      if (partition(i + 3)) return true;
    }

    //* Case 3: Handle monotonically -increasing subarray
    if (
      i + 2 < n &&
      nums[i] + 1 === nums[i + 1] &&
      nums[i] + 2 === nums[i + 2]
    ) {
      if (partition(i + 3)) return true;
    }

    return false;
  }

  const n = nums.length;
  return partition(0);
}

console.log(validPartition([1, 2, 3])); //* True
console.log(validPartition([4, 4, 4, 5, 6])); //* True
console.log(validPartition([1, 1, 1, 2])); //* False
console.log(validPartition([2, 2])); //* True
console.log(validPartition([5])); //* False

//* Time: O(3^n/3) - There are 3 calls that can potentially be made at each level (in the worst case)
//* The depth of the recursion tree is essentially n/3 in the worst case
//* Most of the time we'll make progress in blocks of 3

//* Space: O(n) - The depth of the recursion tree scales with the number of elements
