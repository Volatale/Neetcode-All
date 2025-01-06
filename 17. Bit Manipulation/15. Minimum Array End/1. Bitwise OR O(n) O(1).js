//* For every "i" in the supposed array
//*     - nums[i] & x should === x (individually)
//! Thus, we simply need to ensure every nums[i] shares the bits that "x" has
//* For example, if n = 3 and x = 4
//*     - 4 & 4 = 4
//*     - 5 & 4 = 4
//*     - 6 & 4 = 4
//* Thus, the MINIMUM value that can be stored at the supposed n - 1 index is 6
//! The array is monotonically increasing, and we transition from 4 -> 5 -> 6
//* Since we want the MINIMUM possible value at n - 1
//!     - The value stored at each successive index should only increase by 1
//*     - This gives us the highest chance to find the MINIMUM value

//* We already know "mask" should be incremented by 1 per iteration
//* But we can ENSURE that the next number will & with mask to equal x
//*     - All we have to do is bitwise OR the result of mask + 1 by x
//*     - This sets the bits in the correct columns, so we cut down on the number of iterations

//! Don't run this on Leetcode, JS numbers are imprecise beyond a certain point
function minEnd(n, x) {
  let mask = x; //* Initialize to x; anything less won't be valid

  //* The value should increase by 1 each iteration
  //* Then we can AND by x to ensure these specific bits stay set permanently
  while (--n > 0) {
    mask = (mask + 1) | x;
  }

  return mask;
}

console.log(minEnd(3, 4)); //* 6
console.log(minEnd(2, 7)); //* 15
console.log(minEnd(1, 1)); //* 1

//* Time: O(n) - There are "n" iterations, regardless of the value of "x"

//* Space: O(1) - We are not using additional space that will scale with the input size
