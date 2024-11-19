//* In gray code, each subsequent number differs by EXACTLY ONE bit
//*     - 0b001 -> 0b010, there is a difference of one bit
//*     - 0b110 -> 0b101, there is also a difference of one bit
//* We need to START at 0, and generate the sequence of gray code numbers
//* Generally speaking, the binary to gray code conversion formula is like so:
//*     - gray[i] = binary[i] ^ binary[i-1]
//* Each number in the sequence should only appear ONCE
//* And there needs to be a one-bit difference among each subsequent number
//* Start at 0 since that is what the first number in the sequence has to be
//* Then, perform "i" XOR (i >> 1)
//*     - This ensures that the MSB remains as is (it does not change in the conversion)
//*     - It ALSO allows us to only need to change the bit to the right of the MSB
//* Binary to Graycode
//*     - G[i] = B[i] ^ B[i-1] (as a single number)
//*     - G[i] = i ^ (i >> 1) (gray code sequence)
function grayCode(n) {
  const nums = [];

  //* For each "i" (0 to 2^n-1), XOR by "i" right shifted by 1
  //* This allows us to leave the MSB as is, and ONLY change 1 bit (the bit 1 to the right of MSB)
  for (let i = 0; i < 1 << n; i++) {
    nums.push(i ^ (i >> 1));
  }

  return nums;
}

console.log(grayCode(2)); //* [0, 1, 3, 2]
console.log(grayCode(1)); //* [0, 1]
console.log(grayCode(3)); //* [0, 1, 3, 2, 6, 7, 5, 4]

//* Time: O(2^n) - The for loop does 2^n - 1 iterations, so the time taken is exponential

//* Space: O(2^n) - The space usage also scales at a rate of 2^n since there will be 2^n gray code numbers
