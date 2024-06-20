//* The minimum square we can have is 1 (1 * 1)
//* The largest possible square is num * num
//* So our correct value lies somewhere within these bounds
//* [1 .. num] is a sorted sequence of numbers
//* Thus, this sequence can act as our search space for a binary search
//* "mid" represents the current integer we are using as the test subject
//* If mid * mid === num, "num" IS a perfect square
//* Otherwise, adjust the search space in the correct direction
function isPerfectSquare(num, left = 1, right = num / 2) {
  //* Base Case
  if (left > right) return false;

  //* "mid" represents the integer we want to square
  let mid = left + ((right - left) >> 1);

  //* So we don't have to calculate it twice
  const square = mid * mid;

  if (square === num) {
    return true;
  } else if (square > num) {
    return isPerfectSquare(num, left, mid - 1); //* Eliminate the right portion
  } else {
    return isPerfectSquare(num, mid + 1, right); //* Eliminate the left portion
  }
}

console.log(isPerfectSquare(16)); //* True (4 * 4)
console.log(isPerfectSquare(14)); //* False
console.log(isPerfectSquare(9)); //* True (3 * 3)
console.log(isPerfectSquare(121)); //* True (11 * 11)
console.log(isPerfectSquare(8)); //* False
console.log(isPerfectSquare(1)); //* True (1 * 1)

//* Time: O(log n) - We halve the search space each iteration
//* It takes O(1) to calculate the square

//* Space: O(log n) - At worst, there will be log2(n) recursive calls
//* So the space usage scales logarithmically with the input size
