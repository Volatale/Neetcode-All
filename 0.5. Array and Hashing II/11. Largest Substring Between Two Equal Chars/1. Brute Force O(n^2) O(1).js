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
function maxLengthBetweenEqualCharacters(s) {
  //* There cannot be two equal characters
  if (s.length <= 1) return -1;

  let longest = -1;

  //* Try every possible substring and get the distance between equal chars
  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] === s[j]) {
        longest = Math.max(longest, j - i - 1);
      }
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

//* Time: O(n^2) - We are trying every possible substring, thus giving us n * (n + 1) / 2 iterations
//* A nested for loop is needed, both of which scale based on the input size (n)

//* Space: O(1) - The memory used does not scale with the input size
