//* We can use the property of bitwise XOR
//* "t" contains every character that is in "s", plus one more character
//* Lets say we have "aa" and "aba"
//*     - We know there are going to be 4 "a" in total, since "s" had 2
//* Using Bit Manipulation (bitwise XOR)
//!     - It is possible to "cancel" out the DUPLICATE characters
//* Bitwise XOR means the following statements hold true:
//!     - (a ^ b ^ a) = b
//*         - This therefore leaves the EXTRA charactewr
//*     - The XOR operation is ASSOCIATIVE
//*         - We are told that "t" is randomly shuffled
//*             - XOR allows us to avoid that entirely (because XOR is ASSOCIATIVE)
//*         - (a ^ b ^ a) = (b ^ a ^ a) (which equals b)
//* The only characters we have to deal with are lowercase English characters (ASCII)
//* All we have to do is take the XOR of every character in both strings
//* Then convert the remaining character number back into a character
function findTheDifference(s, t) {
  let XOR = 0;

  const maxLength = Math.max(s.length, t.length);

  //* We can "cancel" duplicate characters, which leaves us with the EXTRA character
  //* a ^ b ^ a = b, and XOR is distributive (so the order is irrelevant)
  for (let i = 0; i < maxLength; i++) {
    if (i < s.length) {
      XOR ^= s[i].charCodeAt(0);
    }

    if (i < t.length) {
      XOR ^= t[i].charCodeAt(0);
    }
  }

  //* Convert the remaining number back into a string
  return String.fromCharCode(XOR);
}

console.log(findTheDifference("abcd", "abcde")); //* "e"
console.log(findTheDifference("", "y")); //* "y"
console.log(findTheDifference("a", "ab")); //* "b"
console.log(findTheDifference("x", "")); //* "x"
console.log(findTheDifference("qwerty", "ytrgewq")); //* "g"

//* Time: O(t.length) - "t" contains every character that "s" has + 1
//* Therefore, we can say t.length > s.length

//* Space: O(1) - We are not using any additional space that scales with input size
