//* Gray Code to Binary:
//*     - Leave the MSB as is
//*     - Add the (current) MSB to the NEXT bit and ignore the carry
//!         - This is usually done through bitwise XOR
//*     - Repeat the steps until the gray code number is 0
//* The MSB remains the same on each iteration of the loop
//* In the first iteration, n ^ g will just give us "g" back
//*     - Which is fine, since that handles the FIRST (MSB) bit position
//* After which, we'll right shift "g" by 1
//!     - This prevents the current bit position in "n" from being changed again
//* Then, we repeat the steps until we are done
//* Essentially, each iteration TOGGLES the corresponding set bits in the binary number
//*     - By right shifting, we prevent the "already processed" bits from being processed again
//* For example: g = 1001
//*     - n ^= g = (0000 ^ 1001) = 1001
//*         - 1001 >> 1 = 100 (now the LSB has been knocked off, and the leftmost bit position remains as is)
//*     - n ^= g = (1001 ^ 0100) = 1101
//*         - 0100 >> 1 = 10 (Now the two leftmost bit positions are processed)
//*     - n ^= g = (1101 ^ 0010) = 1111
//*         - 0010 >> 1 = 1 (Now the three leftmost bit positions are processed)
//*     - n ^= g = (1111 ^ 0001) = 1110
//*         - 0001 >> 1 = 0 (Now ALL of the bit positions are processed)
function grayToBinary(g) {
  let n = 0;

  //* XOR "n" by the current graycode value each iteration
  //* Then right shift it by 1 to remove the LSB
  while (g > 0) {
    n ^= g;
    g >>= 1;
  }

  return n;
}

console.log(grayToBinary(0b1010)); //* 0b1100 (12)
console.log(grayToBinary(0b1001)); //* 0b1110 (14)
console.log(grayToBinary(0b1101)); //* 0b1001 (9)

//* Time: O(b) - The while loop runs as many times as there are set bits in the input
//* If there are none, it won't run at all, and if there are 5, it'll run 5 times

//* Space: O(1) - We don't use any extra space that will scale with the input size
