//* Instead of checking every possible number
//* We know that in a range, half of the numbers will be even, and the other odd
//* The equation high - low + 1 gives us the number of values within this range
//*     - For example, 7 - 3 = 4, but there are actually 5 numbers in the range, so add 1
//* 5 / 2 = 2 (floored)
//*     - But [3, 4, 5, 6, 7] has THREE odd numbers, not two
//*     - If the range of values is odd AND either "boundary" is odd
//*         - We know for sure the OTHER one will be odd (3, 6) would mean a range of 4 value (even)
//*         - Thus, there are 2 evens and 2 odds
//*     - (5, 9) gives us a range of 5 values [5, 6, 7, 8, 9], so 3 odd numbers
//*         - 5 / 2 = 2, so we need to add one to get the other extra
//* If the range of values is EVEN, we don't need to add anything and can just return range / 2
function countOdds(low, high) {
  const range = high - low + 1; //* Count of numbers in range
  let count = Math.floor(range / 2); //* Amount of odd numbers in range

  //* L = 3, H = 7 -> [3, 4, 5, 6, 7] actually has 3 odd numbers, not 2
  if (range % 2 && low % 2) {
    count++;
  }

  return count;
}

console.log(countOdds(3, 7)); //* 3
console.log(countOdds(8, 10)); //* 1
console.log(countOdds(1, 100)); //* 50
console.log(countOdds(5, 7)); //* 2
console.log(countOdds(7, 10)); //* 2

//* Time: O(1) - All of the computations take constant time

//* Space: O(1) - The space usage remains constant; it does not scale with the input size
