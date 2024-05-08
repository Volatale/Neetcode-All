//* "i" cannot exceed the square root of "num"
//* i * i is the opposite way to check for a square root
//* So if i * i eceeds num, you know "num" is not a perfect square
function isPerfectSquare(num) {
  for (let i = 1; i <= num; i++) {
    const square = i * i;

    if (square === num) {
      return true;
    } else if (square > num) {
      return false;
    }
  }
}

console.log(isPerfectSquare(16)); //* True (4 * 4)
console.log(isPerfectSquare(14)); //* False
console.log(isPerfectSquare(9)); //* True (3 * 3)
console.log(isPerfectSquare(121)); //* True (11 * 11)
console.log(isPerfectSquare(8)); //* False
console.log(isPerfectSquare(1)); //* True (1 * 1)

//* Time: O(sqrt(n)) - i * i is the opposite way to check for a square root
//* If the square is larger than the square root of "n", it is invalid

//* Math.sqrt(1_000_000) = 1000
//* log2(1_000_000) = 20, so log2(n) scales SLOWER than sqrt(n)
//* So O(log n) is more efficient than O(sqrt(n))

//* Space: O(1) - The space usage does not scale with the input
