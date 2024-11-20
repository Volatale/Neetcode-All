//* Gray Code
//*     - We leave the MSB as is
//*     - Then we add the (current) MSB to the NEXT bit position (and ignore the carry)
//*     - Repaet until completion
//* The formula for gray code is: G[i] = B[i] ^ B[i-1]
//*     - i ^ (i >> 1)
//*     - This leaves the MSB as is, and only results in a 0 if ONE bit is 0 and the other is 1
//*         - Effectively ignoring the carry, which is what we want
//! Here, we'll generate the sequence of gray code numbers
//* And then we can XOR all of them individually by START to have the sequence start from "start"
//* For example, if n = 2 and start = 3:
//*     - 00 ^ 00 = 00 (0)
//*     - 01 ^ 00 = 01 (1)
//*     - 10 ^ 01 = 11 (3)
//*     - 11 ^ 01 = 10 (2)
//! These is a valid gray code sequence from 0 to 2^n-1, but it doesn't begin from "start"
//* So we XOR all of these values by "start"
//*     - 00 ^ 11 = 11 (3)
//*     - 01 ^ 11 = 10 (2)
//*     - 11 ^ 11 = 00 (0)
//*     - 10 ^ 11 = 01 (1)
//* Since XOR is commutative (and associative), we can perform the necessary XORs all in one go (per gray code number)
function circularPermutation(n, start) {
  const results = [];

  //* Generate the gray code for each number
  //* Then, we can XOR them all (individually) by start
  //* For example, 000 ^ 011 (start) = 011 (3), 001 ^ 011 = 010 (2)
  for (let i = 0; i < 1 << n; i++) {
    results.push(start ^ i ^ (i >> 1));
  }

  return results;
}

console.log(circularPermutation(3, 2)); //* [2, 6, 7, 5, 4, 0, 1, 3]
console.log(circularPermutation(2, 3)); //* [3, 2, 0, 1]

//* Time: O(2^n) - Generating gray code sequences takes O(2^n)

//* Space: O(2^n) - The result array scales with the number of gray code numbers we need to find
