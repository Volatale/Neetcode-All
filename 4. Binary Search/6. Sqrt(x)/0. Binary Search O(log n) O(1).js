//* Given a non-negative integer x, we need to return the square root of x
//*     - The return value should be rounded down to the nearest integer (floor it)
//* Ultimately, we can iterate upward from 0 up to the input value
//* However... This is slow, and we can make observations to avoid this process
//* We know that the square roots fall into a monotonically increasing sequence
//* And we ALSO know that we are trying to find the square root (so this is our search space)
//* Thus, we can apply binary search to optimize our search process
//* Calculate the square of each possible "mid" value we get
//*     - If square > x, then we try a smaller square root
//*     - Else, square < x, so we try a larger square root
//! We take the else path EVEN in cases where we have the correct square root
//* Why? Because we need to handle the case like sqrt(8), which is something like 2.82
//* Since our "mid" will always be an integer (whole number), we go ONE beyond what the correct result is
//* And then we subtract 1. So, we exit the loop when (left === right === 3)
//*     - Then, 3 - 1 = 2, which is the result of Math.floor(sqrt(8))
function mySqrt(x) {
  //* The search space is the range of all possible square roots
  let left = 1;
  let right = x;

  while (left < right) {
    //* Mid is the square root that we are testing
    const mid = left + ((right - left) >> 1);

    const square = mid * mid;

    if (square > x) {
      right = mid; //* Try a smaller square root
    } else {
      left = mid + 1; //* We need a larger square root
    }
  }

  //* "left" is ALWAYS one greater than what we need, so subtract 1
  return left - 1;
}

console.log(mySqrt(0)); //* 0
console.log(mySqrt(1)); //* 1
console.log(mySqrt(2)); //* 1
console.log(mySqrt(4)); //* 2
console.log(mySqrt(7)); //* 2
console.log(mySqrt(8)); //* 2
console.log(mySqrt(9)); //* 3
console.log(mySqrt(121)); //* 11
console.log(mySqrt(100)); //* 10
console.log(mySqrt(16)); //* 4

//* Time: O(log n) - We halve the search space every iteration, so the time complexity is logarithmic (base 2)

//* Space: O(1) - The memory usage remains constant regardless of input size
