//* Bits on the left are worth more than bits on the right

//! Partition the "1" bits to the left
//*     - Apply logic similar to how the partition step works in Quick Select / Quick Sort
//* So logically speaking, we should move all of the "1" bits to the left
//*     - This guarantees we end up with the largest number
//* However, in binary, the LSB (rightmost) bit must be a "1" to denote an ODD number
//* So if the bit at string[-1] is a "0"
//*     - Find the position of the nearest set bit and swap it
//*     ["1", "1", "1", "0", "0"] is NOT an odd number
//*     ["1", "1", "0", "0", "1"] IS an odd number (we swapped left - 1 with right)
//*         - Left would be at index 3 (so 3 - 1 = index 2)
//* If the last bit is a "1", we don't need to bother with the above logic
function maximumOddBinaryNumber(s) {
  //* We are guaranteed to have at least one "1"
  if (s.length === 1) return "1";

  const string = s.split("");
  const n = s.length;

  let left = 0; //* Tracks the position of the next "0"

  //* Iterate through and search for ones; swap them with the zeroes we find
  for (let i = 0; i < n; i++) {
    if (string[i] === "1") {
      [string[i], string[left]] = [string[left], string[i]];
      left++;
    }
  }

  //* The FINAL bit must be a 1 to have an odd number
  [string[left - 1], string[n - 1]] = [string[n - 1], string[left - 1]];

  return string.join("");
}

console.log(maximumOddBinaryNumber("010")); //* "001"
console.log(maximumOddBinaryNumber("0101")); //* "1001"
console.log(maximumOddBinaryNumber("00111")); //* "11001"
console.log(maximumOddBinaryNumber("1")); //* "1"
console.log(maximumOddBinaryNumber("00111011")); //* "11110001"
console.log(maximumOddBinaryNumber("111010")); //* "111001"

//* Time: O(n) - We iterate through the entire array once
//* It also takes O(n) to create an array of characters out of the input (s)

//* Space: O(n) - The char array scales in size with the input
