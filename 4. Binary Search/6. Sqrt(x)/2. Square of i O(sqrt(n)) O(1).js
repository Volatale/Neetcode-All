//* Given a non-negative integer x, we need to return the square root of x
//*     - The return value should be rounded down to the nearest integer (floor it)
//* Ultimately, we can iterate upward from 0 up to the input value
//* Simply calculate "i * i" where "i" is the current integer
//! An observation we can make is that we know for sure that the square root exists
//* Thus, there is no need to try every possibility below the input itself
//* Keep iterating while (i * i) <= x
//*     - We know for sure this won't cause any issues
function mySqrt(x) {
  let result = 0;

  for (let i = 1; i * i <= x; i++) {
    result = i;
  }

  return result;
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

//* Time: O(sqrt(n)) - We don't need to do more than sqrt(n) iterations

//* Space: O(1) - The memory usage remains constant regardless of input size
