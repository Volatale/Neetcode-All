//* Just use the Sieve of Eratostheses algorithm
function countPrimes(n) {
  //* Assume every number is prime (n + 1 because 0 does not count)
  const prime = new Array(n + 1).fill(true);

  let primes = 0;

  //* Neither 0 nor 1 are prime
  prime[0] = false;
  prime[1] = false;

  //* Try every number (starting at 2 (0 and 1 are not prime))
  for (let p = 2; p * p <= n; p++) {
    if (prime[p]) {
      //* Mark all later multiplies of "p" as not prime
      for (let i = p * p; i <= n; i += p) {
        prime[i] = false;
      }
    }
  }

  //* Any index that is still true is a prime
  for (let p = 2; p <= n; p++) {
    if (prime[p] && p < n) {
      primes++;
    }
  }

  return primes;
}

console.log(countPrimes(10)); //* 4 (2, 3, 5, 7)
console.log(countPrimes(0)); //* 0 (0 is not prime)
console.log(countPrimes(1)); //* 0 (1 is not prime)
console.log(countPrimes(2)); //* 0 (1 is not prime)
console.log(countPrimes(100)); //* 25 (1 is not prime)

//* Time: O(n log(log n))

//* Space: O(n)
