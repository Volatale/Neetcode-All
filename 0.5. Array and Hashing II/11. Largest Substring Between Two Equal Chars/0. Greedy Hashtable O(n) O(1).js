//* If we assume we can't find anything, longest is initialized to -1
//* Lets say we have an input like "awea"
//* There are two "a" characters, so we know at some point we have equal characters
//* We want to get the number of characters in-between both of these characters
//* So we use the formula (j - i - 1)
//* Indices are 0-indexed, so we've technically already subtracted one
//* Hence, we can say there are three elements in the array given this formula:
//*     - [1, 2, 3]
//*     - 2 - 0 + 1 = 3
//* We needed to ADD one to the result to handle the offset (0-indexing)
//* In THIS case however, we ALSO need to exclude the element on the right
//* So we subtract 1 again
//* Thus, "awea" gives us a result of 2
//*     - (3 - 0 - 1) = 2 characters between the two "a"s
//* Instead of using nested for loops, we can simply track the first occurrence of each character
//*     - chars[s[j]] is some previous occurrence of the current character (or undefined if it doesn't exist)
//*     - "i" is the current index
function maxLengthBetweenEqualCharacters(s) {
  //* There cannot be two equal characters
  if (s.length <= 1) return -1;

  //* Chars : First Occurrence of Character
  const chars = {};
  let longest = -1;

  for (let i = 0; i < s.length; i++) {
    if (chars[s[i]] === undefined) {
      //* Record index of first occurrence
      chars[s[i]] = i;
    } else {
      //* Get the distance between this char and the first occurrence
      longest = Math.max(longest, i - chars[s[i]] - 1);
    }
  }

  return longest;
}

console.log(maxLengthBetweenEqualCharacters("aa")); //* 0
console.log(maxLengthBetweenEqualCharacters("abca")); //* 2
console.log(maxLengthBetweenEqualCharacters("cbzxy")); //* -1
console.log(maxLengthBetweenEqualCharacters("weatey")); //* 2
console.log(maxLengthBetweenEqualCharacters("wwwwwwww")); //* 6
console.log(maxLengthBetweenEqualCharacters("io")); //* -1

//* Time: O(n) - We iterate through the entire string once
//* We can perform lookups in Θ(1) time on average

//* Space: O(1) - We are only working with lowercase English characters
//* So at most, there will be 26 keys/values
