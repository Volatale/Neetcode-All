//* Given a positive integer num, we need to return whether or not it is a perfect square
//* A perfect square is an integer that is the SQUARE of an integer
//*     - In other words, if the integer is `n`, the perfect square of `n` is (n * n)
//! In a brute force manner, we can simply iterate from 1 up to (and including n)
//* Just check if `i` (the current integer) multiplied by itself === n
//* Why? We are trying to find the square root of num
//*     - If there IS no integer square root of the input, then the input was not a perfect square
//* We can also observe that since we are looking FOR the square root, we don't need to calculate beyond that
//*     - If we are checking 9, then the only numbers we need to check are (1, 2, 3)
//*     - 4 * 4 = 16 > 9, and the same is true for every number AFTER n
function isPerfectSquare(num) {
  //* Find the square root of num
  for (let i = 1; i * i <= num; i++) {
    if (i * i === num) {
      return true;
    }
  }

  //* There is no square root for num
  return false;
}

console.log(isPerfectSquare(16)); //* True (4 * 4)
console.log(isPerfectSquare(14)); //* False
console.log(isPerfectSquare(9)); //* True (3 * 3)
console.log(isPerfectSquare(121)); //* True (11 * 11)
console.log(isPerfectSquare(8)); //* False
console.log(isPerfectSquare(1)); //* True (1 * 1)

//* Time: O(sqrt) - We don't need to check BEYOND the largest possible square root

//* Space: O(1) - The memory usage remains constant regardless of input size
