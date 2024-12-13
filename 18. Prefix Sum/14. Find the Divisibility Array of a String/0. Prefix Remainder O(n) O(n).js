//* Take advantage of a property of modulo:
//!     - (A + KN) % K = A % K
//*         - (3 + 4 * 5) = 23
//*             - 23 % 4 = 3
//*             - 3 % 4
//*     - Adding (or subtracting) a multiple of K to and from A will not change the remainder
//*         - KN is divisible by K, which will give us 0
//*      - Thus we end up with:
//*         - (A + 0) % K = A % K
//*         - A % K = A % K
//! The constraints tell us that "n" can be up to 10^5, so that means 10^5 digits (guaranteed overflow)
//*     - We cannot simply just take the place value like so:
//*         - num = (num * 10 + parseInt(word[i]))
//!         - Doing this will eventually guarantee an overflow
//*     - Using our formula: (A + KN) % K = A % K
//*         - We know that a multiple of K will not change the remainder
//*         - So we can track the cumulative remainder as we go (prefix remainder)

//! A remainder will always be in the range [0, m - 1]
//*     - We don't have to deal with negative remainders since our digits are [0, 9]
//*     - This allows us to avoid overflows altogether
//!         - m can be up to 10^9, and an int 32 is 2^31 - 1
//!         - 10^9 < 2^31 - 1, so we'll never get an overflow
function divisibilityArray(word, m) {
  //* Assume nothing is divisible by m
  const div = new Array(word.length).fill(0);

  //* Prefix Sum, but with a remainder: Remainder will always be in range [0, m - 1]
  let remainder = 0;

  //* (A + KN) % K = A % K, so adding/subtracting multiples of K to/from A does not change remainder
  //* Thus we can say 9 is congruent to 99 (mod 3), because the remainder is still 0 regardless
  for (let i = 0; i < word.length; i++) {
    //* Remainder is always in range [0, m-1]. n can be up to 10^5 (so 10^5 digits, which means overflow)
    remainder = (remainder * 10 + parseInt(word[i])) % m;

    //* word[0,...,i] is divisible by K
    if (remainder === 0) {
      div[i] = 1;
    }
  }

  return div;
}

console.log(divisibilityArray("998244353", 3)); //* [1, 1, 0, 0, 0, 1, 1, 0, 0]
console.log(divisibilityArray("1010", 10)); //* [0, 1, 0, 1]
console.log(divisibilityArray("525920321", 2)); //* [0, 1, 0, 0, 1, 1, 0, 1, 0]

//* Time: O(n) - We iterate through the string once, which takes O(n)
//* But we also have to create the div array, which also takes O(n) (O(n) + O(n) = O(n))

//* Space: O(n) - The div array scales with word.length (n)
