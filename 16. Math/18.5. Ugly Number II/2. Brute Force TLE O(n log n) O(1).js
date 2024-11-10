//! TLE, don't run on Leetcode

//* Apply prime factorization and count the number of ugly numbers found
//* Every time we find a new ugly number, set "nthUgly" to whatever "num" was
//! Not every number is going to be ugly
//*     - Hence we use a while loop - if "num" was NOT ugly, no progress is made
//*     - So we simply move onto the next number and check that one too
//* When you find an ugly number, increment the count variable
//*     - We only care about the FIRST n ugly numbers
function nthUglyNumber(n) {
  //* 1 is the 1st ugly number
  if (n === 1) return 1;

  let count = 0; //* Counts the number of ugly numbers found thus far
  let nthUgly = 0; //* Tracks what the last ugly number was
  let num = 1; //* 1 is the 1st

  //* Keep iterating until we find "n" ugly numbers
  while (count < n) {
    let currNum = num;

    //* Divide currNum by 2, 3 and 5 as many times as possible
    for (let p of [2, 3, 5]) {
      while (currNum % p === 0) {
        currNum = Math.floor(currNum / p);
      }
    }

    //* Found an ugly number (prime factors are limited to [2, 3, 5])
    if (currNum === 1) {
      count++;
      nthUgly = num;
    }

    //* Move onto the next number
    num++;
  }

  return nthUgly;
}

console.log(nthUglyNumber(3)); //* 3
console.log(nthUglyNumber(10)); //* 12
console.log(nthUglyNumber(1)); //* 1
console.log(nthUglyNumber(100)); //* 1536
console.log(nthUglyNumber(8)); //* 9
console.log(nthUglyNumber(15)); //* 24
console.log(nthUglyNumber(32)); //* 90
console.log(nthUglyNumber(13)); //* 18

//* Time: O(n log n) - The outer loop will perform roughly n to 2n iterations on average
//* The inner loop's time taken scales with the number itself and whether it is divisible by 2, 3 or 5

//* Space: O(1) - We are not using any additional space at all
