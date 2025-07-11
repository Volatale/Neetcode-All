//* A number is picked in the range [1..n]
//* Each guess, we are told whether we guessed too high, too low, or if we were correct
//! In other words, we are provided with a heuristic we can use to determine the general search direction
//*     - We are not necessarily aimlessly searching
//* In addition, the range [1..n] is technically sorted
//! Thus, we can say the search space exhibits monotonicity
//*     - It is sorted in ascending roder
//* In a brute force manner, we could simply call guess() on every number
//* However, we can "optimize" our search and the number of iterations using binary search
function guessNumber(n) {
  //* The search space is the numbers in the range [1, n]
  let left = 1;
  let right = n;

  while (left < right) {
    //* "mid" represents the number we are guessing
    const mid = left + ((right - left) >> 1);

    if (guess(mid) <= 0) {
      right = mid; //* Find a smaller number (or, we guessed correctly)
    } else {
      left = mid + 1; //* Find a larger number
    }
  }

  //* "left" represents the correct number
  return left;
}

//* Time: O(log n) - Each iteration, the search space is halved, so the time taken scales logarithmically (base 2)

//* Space: O(1) - The memory usage remains constant regardless of input size
