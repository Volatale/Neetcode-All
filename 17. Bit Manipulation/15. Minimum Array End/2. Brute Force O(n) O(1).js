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

//! May give TLE, don't run
function minEnd(n, x) {
  let mask = x; //* The bits in "mask" should cover the bits in "x"
  let count = 0; //* Count of elements in the array

  //* Keep trying values until we find "n" values whose & with x === x
  //* For example, (5, 7, 15, 21) & 5 = 5, which is what we want
  while (count < n) {
    if ((mask & x) === x) {
      count++;
    }

    //* The "array" should be monotonically increasing (nums[i + 1] > nums[i])
    mask++;
  }

  //* Mask (-1) is the minimum value at index n - 1 that matches x's bits
  return mask - 1;
}

console.log(minEnd(3, 4)); //* 6
console.log(minEnd(2, 7)); //* 15
console.log(minEnd(1, 1)); //* 1

//* Time: O(n) - The time taken scales with the value of "n"
//* Regardless of the value of "x", we don't stop looping until count === n

//* Space: O(1) - We are not using additional space that will scale with the input size
