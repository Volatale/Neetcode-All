//* Given a positive integer num, we need to return whether or not it is a perfect square
//* A perfect square is an integer that is the SQUARE of an integer
//*     - In other words, if the integer is `n`, the perfect square of `n` is (n * n)
//* Square numbers (our search space) are monotonically increasing
//* Since we have a search space, and the monotonic property, binary search is possible
//* In our case, the minimum possible square root is 1, and the max is `n` itself
//*     - We could initialize the right pointer to sqrt(n), but then the time complexity remains the same (O(sqrt(n)))
//* if `mid * mid` === num, then we found the square root (return true)
//* else if `mid * mid` > num, we need to try a SMALLER square root
//* else, `mid * mid` < num, so we need to try a LARGER square root
function isPerfectSquare(num) {
  //* The search space of the square roots is in the range [1, n]
  let left = 1;
  let right = num;

  while (left <= right) {
    //* Mid represents the square root we are testing
    const mid = left + ((right - left) >> 1);

    const square = mid * mid;

    if (square === num) {
      return true;
    } else if (square > num) {
      right = mid - 1; //* Try a smaller square root (to optimize)
    } else {
      left = mid + 1; //* Try a larger square root
    }
  }

  //* Exceptional circumstances
  return false;
}

console.log(isPerfectSquare(4)); //* True
console.log(isPerfectSquare(16)); //* True (4 * 4)
console.log(isPerfectSquare(14)); //* False
console.log(isPerfectSquare(9)); //* True (3 * 3)
console.log(isPerfectSquare(121)); //* True (11 * 11)
console.log(isPerfectSquare(8)); //* False
console.log(isPerfectSquare(1)); //* True (1 * 1)

//* Time: O(log n) - We are eliminating half of the search space every iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
