//* This is a prime factorization problem
//* We visualize a factor tree and break its number down to its primes
//*     - 20 can be broken down into 2 * 2 * 5
//*     - 19 can be broken down into 2 * 3 * 3 * 5
//*     - 17 can be broken down into ... 17 (17 is already a prime, but not limited to [2, 3, 5])
//*     - 14 can be broken down into 2 * 7 (7 is a prime, but is not limited to [2, 3, 5])
//! Keep dividing "n" by the smallest prime we can (in the range of [2, 3, 5])
//*     - If at the end, n !== 1, then we know using this set of primes, we can't break n down further
function isUgly(n) {
  //* These are not ugly numbers
  if (n <= 0) return false;

  //* Iterate through the primes
  for (let p of [2, 3, 5]) {
    while (n % p === 0) {
      n = Math.floor(n / p);
    }
  }

  //* If "n" is 1, the number is ugly
  return n === 1;
}

console.log(isUgly(6)); //* True
console.log(isUgly(10)); //* True
console.log(isUgly(17)); //* False
console.log(isUgly(19)); //* True
console.log(isUgly(100)); //* True
console.log(isUgly(14)); //* False

//* Time: O(log2(n)) - The time taken scales with how many times we have to divide n
//* Dividing n by 2 reduces the number at a slower rate than dividing by 3 or 5

//* Space: O(1) - We are not using any additional space that will scale with the input size
