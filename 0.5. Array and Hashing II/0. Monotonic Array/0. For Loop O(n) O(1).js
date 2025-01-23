//* We use a single variable to track the (current) monotonicity of the array
//* There is no way to know the current monotonicity without there being a STRICT difference
//* Either one of these must be true:
//*     - nums[i] > nums[i - 1] (as in, [1, 3]), which indicates an increasing trend
//*     - nums[i] < nums[i - 1] (as in, [3, 1]), which indicates a decreasing trend
//* If BOTH are ever true, then the array is not monotonic
//* If we don't return false ever, the array is said to be monotonic
//*     - An empty array, and an array with a single element are also both monotonic
function isMonotonic(nums) {
  //* An array with only a single (or less) element is monotonic
  if (nums.length <= 1) return true;

  let direction = 0; //* 0 = unknown, 1 = increasing, -1 = decreasing

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      if (direction === 0) {
        direction = 1; //* Set to monotonically increasing
      } else if (direction === -1) {
        return false; //* Array is no longer monotonically increasing
      }
    } else if (nums[i] < nums[i - 1]) {
      if (direction === 0) {
        direction = -1; //* Set to monotonically decreasing
      } else if (direction === 1) {
        return false; //* Array is no longer monotonically decreasing
      }
    }
  }

  //* Successfully made it to the end of the array
  return true;
}

console.log(isMonotonic([1, 2, 2, 3])); //* True (increasing)
console.log(isMonotonic([])); //* True (an empty array is monotonic)
console.log(isMonotonic([1])); //* True (an array with a single element is monotonic)
console.log(isMonotonic([])); //* True (decreasing)
console.log(isMonotonic([1, 3, 5, 4, 7])); //* False (was increasing, then switches to decreasing)
console.log(isMonotonic([5, 1, 2])); //* False (was decreasing, then switches to increasing)

//* Time: O(n) - In the worst case, we have to iterate over every element in the array

//* Space: O(1) - The space usage remains constant regardless of the input size
