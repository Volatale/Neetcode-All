//* The task is to reduce "x" to 0 by subtracting the edge elements in the array
//* After removing an element from the array, we can't use it again
//* We can apply a dynamic programming approach to solve this problem
//* The state transitions are as follows:
//*     - Remove left element:
//*         left + 1, right, x - nums[left]
//*     - Remove right element:
//*         left, right - 1, x - nums[right]
//* The base cases we need to identify are:
//*     - Case 1: Left pointer is out of bounds (left >= nums.length)
//*     - Case 2: Right pointer is out of bounds (right < 0)
//*     - Case 3: "x" is < 0
//*         - We can only DECREASE "x", not increase
function minOperations(nums, x) {
  function dp(left, right, x) {
    //* Base Case: Out of Bounds, or "x" has reduced too much
    if (left >= nums.length || right < 0 || x < 0) return Infinity;

    //* Base Case: successfully reduced "x" to 0
    if (x === 0) return 0;

    //* Utilize memoized value
    const key = `${left}-${right}-${x}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let operations = Infinity;

    //* Try removing left
    operations = Math.min(operations, dp(left + 1, right, x - nums[left]) + 1);

    //* Try removing right
    operations = Math.min(operations, dp(left, right - 1, x - nums[right]) + 1);

    return (memo[key] = operations);
  }

  const memo = {};
  const minimum = dp(0, nums.length - 1, x);

  //* Return -1 if we didn't find a way to reduce x
  return minimum === Infinity ? -1 : minimum;
}

debugger;
console.log(minOperations([1, 1, 4, 2, 3], 5)); //* 2
console.log(minOperations([5, 6, 7, 8, 9], 4)); //* -1
console.log(minOperations([3, 2, 20, 1, 1, 3], 10)); //* 5
console.log(minOperations([1, 1, 3, 6, 3, 3], 6)); //* 2
console.log(minOperations([100], 200)); //* -1

//* Time: O(n^2 * x) - Left and right can have values in the range [0...n-1] respectively
//* And "x" is valued in the range [0...x] -> O(n) * O(n) * O(x) = O(n^2 * x)

//* Space: O(n^2 * x) - There are O(n^2 * x) key/values to store
