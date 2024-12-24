function reverseBits(n) {
  let result = 0;

  //* Extract the bit at the ith position and set it in the reversed position
  for (let i = 0; i < 32; i++) {
    const bit = (n >> i) & 1;
    result |= bit << (31 - i);
  }

  //* Convert the number to an unsigned integer
  return result >>> 0;
}

console.log(reverseBits(0b00000010100101000001111010011100));
console.log(reverseBits(0b11111111111111111111111111111101));

//* Time: O(1) - We always do 32 iterations regardless of the input

//* Space: O(1) - The space usage remains constant since the output always has 32 bits
