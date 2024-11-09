//* This is a cycle detection problem
//*     - So we can solve it the say way we'd solve it using a linked list
//* Use a set to track numbers we have already visited
//*     - If we reach an "n" we have already found, we found a cycle
//*     - A cycle implies the input was an unhappy number, thus we return false
//! If we have a number like 243 (81 = 9^2), so 243 = 81*3
//*     - Once a number is greater than 243, it will eventually converge down to 3 digits at most
//*     - So we can say that the time taken for the calculate squares function is logarithmic
function isHappy(n) {
  if (n === 1) return true;

  const visited = new Set();

  //* Keep iterating until we reach 1
  while (n !== 1) {
    n = calculateSquares(n);

    //* The number is not happy, revisited "n"
    if (visited.has(n)) return false;
    visited.add(n);
  }

  //* The is a happy number
  return true;
}

function calculateSquares(val) {
  let sum = 0;

  while (val !== 0) {
    const digit = val % 10;
    sum += digit * digit;
    val = Math.floor(val / 10);
  }

  return sum;
}

console.log(isHappy(19)); //* True
console.log(isHappy(2)); //* False
console.log(isHappy(15)); //* False
console.log(isHappy(10)); //* True
console.log(isHappy(31)); //* True
console.log(isHappy(90)); //* False

//* Time: O(log n) - If we have a number > 243 (81*3), the number will converge to a bound of [1, 243]/
//* There is a limited set of numbers for which cycles form
//* For a number with "d" digits, the calculateSquares function takes O(d) time
//* But "d" is about O(log n) where "n" is the input number

//* Space: O(log n) - Since the time complexity is O(log n), the space will be too
//* There are roughly log n elements being stored in the set per call
