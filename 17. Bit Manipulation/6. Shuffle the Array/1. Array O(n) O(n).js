//* The array is given in the form:
//*     - [x1, x2, x3, y1, y2, y3]
//* And we want to transform the array into:
//*     - [x1, y2, x2, y2, x3, y3]
//* We know that the array has a length of n * 2
//*     - Thus we also know that the output array has the same size
//* The "y" series of numbers starts at "n" itself
//* So all we have to do is handle the numbers in pairs of [xn, yn]
//* If we start at the first element (index 0)
//* Then all we have to do to reach the "y" equivalent is add "n" to i, thus, we have:
//*     - x = nums[i]
//*     - y = nums[i + n]
//* This way, we can cut down the work done by half (n)
function shuffle(nums, n) {
  const result = [];

  //* If the array is [x1, x2, x3, y1, y2, y3] then the "y" series starts at i + n
  for (let i = 0; i < n; i++) {
    result.push(nums[i]);
    result.push(nums[i + n]);
  }

  return result;
}

console.log(shuffle([2, 5, 1, 3, 4, 7], 3)); //* [2, 3, 5, 4, 1, 7]
console.log(shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4)); //* [1, 4, 2, 3, 3, 2, 4, 1]
console.log(shuffle([1, 1, 2, 2], 2)); //* [1, 2, 1, 2]
console.log(shuffle([4, 2], 1)); //* [4, 2]

//* Time: O(n) - There are "n" iterations that need to happen
//* Within each iteration, we perform O(2) work, which is constant time: O(2) * O(n) = O(n)

//* Space: O(n) - Ultimately, the size of the result array scales with the input "n" (and nums itself)
