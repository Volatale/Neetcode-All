//* The sum needs to be EVEN because otherwise we can't possibly solve the problem
//*     - We cannot break elements up, so 11 / 2, for example, = 5.5
//*     - But we aren't given decimals, so there is no way to make up the sum
//* Either include the current element or exclude it at each step
//! We only have to make ONE subset
//*     - Being able to make ONE subset guarantees we can make the OTHER
function canPartition(nums) {
  function partition(i, target) {
    if (target === 0) return true;
    if (i === nums.length || target < 0) return false;

    //* Case 1: Include the element
    const include = partition(i + 1, target - nums[i]);

    //* Case 2: Exclude the element
    const exclude = partition(i + 1, target);

    return include || exclude;
  }

  //* Can't split a single element into two subsets
  if (nums.length === 1) return false;

  //* Get the total
  const sum = nums.reduce((acc, curr) => acc + curr, 0);

  //* We can't split elements, so we need a WHOLE number
  if (sum % 2 !== 0) return false;

  const target = sum / 2;

  return partition(0, target);
}

debugger;
console.log(canPartition([1, 5, 11, 5])); //* True
console.log(canPartition([1, 2, 3, 5])); //* False
console.log(canPartition([4, 3])); //* False
console.log(canPartition([1, 2, 3])); //* True
console.log(canPartition([7])); //* False
console.log(canPartition([6, 6])); //* True

//* Time: O(2^n) - At each stage of recursion, there are two additional calls made
//* We progress the index we are checking by 1 each call
//* So the branching factor is 2, the depth of the call stack is "n"

//* Space: O(n) - The depth of the call stack scales with the array length
