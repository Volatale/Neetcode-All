//* For every "n", there are TWO additional possible orderings (positions)
//* We know we have TWO parameters (pickup, delivery)
//!     - HALF of the possible orderings will be invalid
//!     - In other words, imagine n = 1
//*         - We have two possible permutations (P1, D1) or (D1, P1)
//!             - But D1 cannot be before P1, so it is invalid
//*     - So we probably need to divide something by 2
//! This is a PERMUTATIONS problem, not a combinations problem
//*     - We care about the ORDER of the choices
//*     - Each choice affects the next choice (we lose one possible position)
//* This problem is essentially combinatorial at its core
//*     - We need to COUNT the number of ways to do something
//*         - Except HALF of those ways are invalid
//* Permutations usually involve factorials
//*     - There are 2 positions for each n, so we get (2n)!
//*     - For the FIRST position we have "x" choices
//*         - For the SECOND choice, we have "x - 1" choices
//!     - But like we already said, half of them are invalid
//*         - x (x - 1) / 2

//* Number of permutations is n!, but we have 2 positions for each n, so (2n)!
//* Making a choice means the NEXT choice has 1 less possibility X * (X - 1)
//*     - Divide by 2 because half of the permutations are invalid
//! We are essentially taking up 2 slots at the same time, hence we subtract 2 from slots every iteration
//* The rule of product (combinatorics) applies since this is a permutations problem
//*     - Multiply each of the decisions together to get the total number of ways
function numberOfWays(n) {
  //* There is only 1 valid way
  if (n === 1) return 1;

  const MOD = 10 ** 9 + 7;

  let ways = 1;
  let slots = 2 * n;

  //* No. of Permutations = (2n)!
  //* Half of the permutations are invalid, so divide by 2
  while (slots > 0) {
    ways = (ways * ((slots * (slots - 1)) / 2)) % MOD;
    slots -= 2; //* Used 2 slots, so next permutation has 2 less slots in total
  }

  return ways;
}

console.log(numberOfWays(1)); //* 1
console.log(numberOfWays(2)); //* 6
console.log(numberOfWays(3)); //* 90

//* Time: O(n) - The time taken scales with the input size (n)

//* Space: O(1) - The space usage remains constant; we only use constant space variables
