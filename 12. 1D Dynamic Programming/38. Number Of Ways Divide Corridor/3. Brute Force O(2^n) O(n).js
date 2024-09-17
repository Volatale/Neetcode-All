//* Track the current index and number of seats
//* There are a few cases to handle that change depending on the current character
//*     - If we have 2 seats
//*         - And we are at "S", we'd have 3 seats, so we say the next call has 1 seat (3 % 2)
//!             - Essentially, we don't have a choice, seats are split up into groups of 2, not 3
//*         - If we are at a "P", we can CHOOSE to split, or not (sum the results)
//*             - If you DO split, the number of seats becomes 0
//*             - If we DON'T split, the number of seats stays 2
//*     - If we have LESS than 2 seats
//*         - If we are at "S", then seats has to decrease (and we know seats + 1 <= 2 at this point)
//*         - Otherwise, don't split
function numberOfWays(corridor) {
  function countDividers(i, seats) {
    //* Base Case: Validate decision at the end
    if (i === corridor.length) {
      return seats === 2 ? 1 : 0;
    }

    let dividers = 0;

    if (seats === 2) {
      if (corridor[i] === "S") {
        //* We are at a SEAT, so we say we start with 1 seat for the next
        dividers = countDividers(i + 1, 1);
      } else {
        //* We are at a PLANT, but we have 2 seats, so either split, or don't
        dividers = (countDividers(i + 1, 0) + countDividers(i + 1, 2)) % MOD;
      }
    } else {
      dividers =
        countDividers(i + 1, seats + (corridor[i] === "S" ? 1 : 0)) % MOD;
    }

    return dividers;
  }

  const MOD = 10 ** 9 + 7;

  //* index 0, 0 seats
  return countDividers(0, 0);
}

console.log(numberOfWays("SSSS")); //* 1
console.log(numberOfWays("P")); //* 0
console.log(numberOfWays("SSPPSPS")); //* 3
console.log(numberOfWays("PPSPSP")); //* 1
console.log(numberOfWays("SSSSS")); //* 0
console.log(numberOfWays("SSPPSSPSPSSS")); //* 6

//* Time: O(2^n) - In the worst case, there 2 possible branches from a single call
//* The depth of the recursion tree scales with s.length (n)

//* Space: O(n) - The depth of the recursion tree scales with n
//* We increment i by 1 each successive call
