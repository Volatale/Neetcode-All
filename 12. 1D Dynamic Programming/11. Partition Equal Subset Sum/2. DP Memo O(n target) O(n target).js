//* The sum needs to be EVEN because otherwise we can't possibly solve the problem
//*     - We cannot break elements up, so 11 / 2, for example, = 5.5
//*     - But we aren't given decimals, so there is no way to make up the sum
//* Either include the current element or exclude it at each step
//! We only have to make ONE subset
//*     - Being able to make ONE subset guarantees we can make the OTHER

//* Apply memoization to avoid redundant work
function canPartition(nums) {
  function partition(i, target, memo) {
    if (target === 0) return true;
    if (i === nums.length || target < 0) return false;

    const key = `${i}-${target}`;
    //* Utilize memoized value
    if (memo.hasOwnProperty(key)) return memo[key];

    if (
      partition(i + 1, target - nums[i], memo) || //* Include
      partition(i + 1, target, memo) //* Exclude
    ) {
      memo[key] = true;
      return true;
    }

    memo[key] = false;
    return false;
  }

  //* Can't split a single element into two subsets
  if (nums.length === 1) return false;

  //* Get the total
  const sum = nums.reduce((acc, curr) => acc + curr, 0);

  //* We can't split elements, so we need a WHOLE number
  if (sum % 2 !== 0) return false;

  const target = sum / 2;

  return partition(0, target, {});
}

console.log(canPartition([1, 5, 11, 5])); //* True
console.log(canPartition([1, 2, 3, 5])); //* False
console.log(canPartition([4, 3])); //* False
console.log(canPartition([1, 2, 3])); //* True
console.log(canPartition([7])); //* False
console.log(canPartition([6, 6])); //* True

//* Time: O(n * target) - Where "n" is nums.length and "target" is sum(nums) / 2
//* (n + 1) * (t + 1) = n * t + 2
//* We have two non-constant parameters (i and target)

//* Space: O(n * target) - There are n * t unique subproblems
//* We can reach a target of 5, but from a different index
//* So we need to avoid false positives
