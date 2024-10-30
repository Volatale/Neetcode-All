//* Imagine if we needed to get every digit in base 10
//*     - n % 10 gives us the LAST digit in base 10
//*     - Then, n /= 10 removes the last digit from the number (no need to consider it anymore)
//*     - Keep repeating this process until n === 0, because that means there are no digits left
//* Instead of base 10, we are working in base 26
//* There are 26 characters in base 26 (A through Z
//* But we have a problem; "A" maps to 1, not 0
//*     - So there is an offset we need to handle
//* Start from the right and build digits like that
//*     - (col - 1) % 26 gives us the character that should go in the current index
//*         - (54 - 1) % 26 = 1
//*         - So now all we have to do is add 1 to 65 (ASCII code for A)
//*         - That gives us "B", so we know the FINAL character should be "B"
//*     - (col - 1) / 26 gives us the LEFTOVER, so we keep going until we reach 0
function convertToTitle(columnNumber) {
  const string = [];

  //* We build the string in reverse (right to left)
  //* "A" starts at 1, not 0, so remove offset by subtracting 1
  while (columnNumber > 0) {
    const offset = (columnNumber - 1) % 26;
    string.push(String.fromCharCode("A".charCodeAt(0) + offset));
    columnNumber = Math.floor((columnNumber - 1) / 26);
  }

  //* The numbers were added in reverse
  return string.reverse().join("");
}

console.log(convertToTitle(1)); //* A
console.log(convertToTitle(27)); //* AA
console.log(convertToTitle(28)); //* AB
console.log(convertToTitle(54)); //* BB
console.log(convertToTitle(701)); //* ZY

//* Time: O(log26(n)) -> O(log n) - Each iteration, we divide columnNumber by 26
//* When we hit 0, we stop iterating since there are no more characters to add
//* Reversing/joining the string array also take the same amount of time

//* Space: O(log26(n)) -> O(log n) - The number of characters in the string is logarithmic in nature
