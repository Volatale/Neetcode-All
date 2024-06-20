//* The minimum square we can have is 1 (1 * 1)
//* The largest possible square is num * num
//* So our correct value lies somewhere within these bounds
//* [1 .. num] is a sorted sequence of numbers
//* Thus, this sequence can act as our search space for a binary search
//* "mid" represents the current integer we are using as the test subject
//* If mid * mid === num, "num" IS a perfect square
//* Otherwise, adjust the search space in the correct direction
function isPerfectSquare(num) {
  //* num's minimum value is 1, so the smallest square is 1 (1 * 1)
  //* The largest possible square would be num * num, so know the bounds
  let left = 1;
  let right = Math.floor(num / 2);

  while (left < right) {
    //* Mid represents the root of the number we want to test
    let mid = left + ((right - left) >> 1);

    if (mid * mid >= num) {
      right = mid; //* Square is either perfect or too large
    } else {
      left = mid + 1; //* Square is too small
    }
  }

  return left * left === num;
}

console.log(isPerfectSquare(16)); //* True (4 * 4)
console.log(isPerfectSquare(14)); //* False
console.log(isPerfectSquare(9)); //* True (3 * 3)
console.log(isPerfectSquare(121)); //* True (11 * 11)
console.log(isPerfectSquare(8)); //* False
console.log(isPerfectSquare(1)); //* True (1 * 1)

//* Time: O(log n) - We halve the search space each iteration
//* It takes O(1) to calculate the square

//* Space: O(1) - The space we use remains constant regardless of the input
