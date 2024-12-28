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

//! Bit Manipulation
//* It is possible to solve this question without using additional space
//* But we need to make some observations
//*     - 1 <= nums[i] <= 10^3 (1000)
//*         - Each number can be represented using AT MOST 10 bits
//*         - There are no negative numbers
//! We have 32 bits (generally speaking)
//*     - Store the first number within bits [0, 9]
//*     - Then store the second within bits [10, 19]
//* It is possible to "dodge" bits by left / right shifting by 10
//* To extract the second number's bits, we can use bitwise AND
//*     - nums[i] & 1111111111
//*         - If we AND by 10 "1" bits, we extract all of the possible bits that exist
//*         - If they were "0", then we wouldn't be able to extract the bits
//*     - Then, we right shift by 10 to knock off the other bits
function shuffle(nums, n) {
  //* This is used to extract each number we need
  const tenOnes = 2 ** 10 - 1;
  let j = 2 * n - 1;

  //* Store the bits for each pair (X, Y) of numbers within a single number
  for (let i = 0; i < n; i++) {
    nums[i] = nums[i] << 10; //* Make room for the next number
    nums[i] |= nums[i + n]; //* Set the corresponding (first) 10 bits
  }

  //* Iterate backwards so we don't interfere the next (X, Y) pair
  for (let i = n - 1; i >= 0; i--) {
    const Y = nums[i] & tenOnes; //* Extract the bits that represent the SECOND number ([0, 9])
    const X = nums[i] >> 10; //* Extract the bits that represent the FIRST number ([10, 19])
    nums[j] = Y;
    nums[j - 1] = X;
    j -= 2;
  }

  return nums;
}

console.log(shuffle([2, 5, 1, 3, 4, 7], 3)); //* [2, 3, 5, 4, 1, 7]
console.log(shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4)); //* [1, 4, 2, 3, 3, 2, 4, 1]
console.log(shuffle([1, 1, 2, 2], 2)); //* [1, 2, 1, 2]
console.log(shuffle([4, 2], 1)); //* [4, 2]

//* Time: O(n) - There are "n" iterations that need to happen
//* Within each iteration, we perform O(2) work, which is constant time: O(2) * O(n) = O(n)

//* Space: O(1) - We are not using any additional space, so the space usage remains constant
