//* We "could" solve this in a naive fashion
//*     - Create an array of length 32
//*     - Iterate through all the positions
//*         - Start from the 0th index and get the LSB at each step
//*     - Then simply return at the end (parseInt(arr, 2))
//! But the above would be slow
//* Instead, we can just utilize the fact that we know we are returning a 32-bit integer
//* n & 1 gives us the LSB
//* Then, we can drop the LSB from the right (so we don't process it again)
//* Lastly, we can set the ith bit
//!     - Start at the 31st bit position
//*     - Subtract i from that to get the current offset
//*     - Why are we left shifting? Because we are "starting" from the LSB side
//*         - Thus, we are moving "bit" to the left by (31 - i) bit positions
//! We need to return an UNSIGNED 32-bit integer
//*     - Simply returning "result" here will result in a fail
//* JS numbers are represented using two's complement
//*     - Thus, if result < 0, just return the negated form of it
//*     - This ensures the result will always be positive
function reverseBits(n) {
  let result = 0;

  //* Extract the bit at the ith position and set it in the reversed position
  for (let i = 0; i < 32; i++) {
    const bit = (n >> i) & 1; //* Get the ith bit (offset from the right)
    result |= bit << (31 - i); //* Set the bit (offset from the left)
  }

  //* The result should be an UNSIGNED integer; Unsigned Right Shift makes the sign bit a 0 (positive)
  return result >>> 0;
}

console.log(reverseBits(0b00000010100101000001111010011100));
console.log(reverseBits(0b11111111111111111111111111111101));

//* Time: O(1) - We always do 32 iterations regardless of the input

//* Space: O(1) - The space usage remains constant since the output always has 32 bits
