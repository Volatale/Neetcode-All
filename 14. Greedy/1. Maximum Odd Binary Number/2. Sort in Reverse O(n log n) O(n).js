//* Bits on the left are worth more than bits on the right
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

  const n = s.length;

  //* Sort the elements in reverse
  const string = s.split("").sort((a, b) => Number(b) - Number(a));

  //* The last element is a "1", so it is already odd
  if (string[n - 1] === "1") return string.join("");

  //* Find position of the first "1" from the left
  let i = n - 1;
  while (string[i] !== "1") {
    i--;
  }

  //* Put the first "1" we find on the right
  [string[i], string[n - 1]] = [string[n - 1], string[i]];

  return string.join("");
}

console.log(maximumOddBinaryNumber("010")); //* "001"
console.log(maximumOddBinaryNumber("0101")); //* "1001"
console.log(maximumOddBinaryNumber("00111")); //* "11001"
console.log(maximumOddBinaryNumber("1")); //* "1"
console.log(maximumOddBinaryNumber("00111011")); //* "11110001"
console.log(maximumOddBinaryNumber("111010")); //* "111001"

//* Time: O(n log n) - It takes O(n) to create an array out of the input
//* It takes O(n log n) on average to sort the array we created
//* Then it takes O(n) in the worst case to find the first "1" from the left
//* Finally, it takes O(n) to convert the array into a string

//* Space: O(n) - We create an ephemeral array out of the input
//* Then we sort, which typically takes O(n) space (if merge sort is used)
//* Finally, it takes O(n) to convert the array back into a string
