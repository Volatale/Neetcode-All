//* We want to MINIMIZE the number of substrings in a partition
//*     - We can't have more than one of each character in a single substring
//*     - Realistically, the idea is to MAXIMIZE the length of each substring
//* We should split the moment we detect that a character already exists in the current substring
//*     - Don't split unless absolutely necessary
//*     - This maximizes the length of each substring, which in turn minimizes the number of substrings
//* Instead of using a set, we can use a single 32-bit integer
//*     - There are only 26 possible characters in the alphabet
//*     - If we find a character that already exists in the string, just clear the bitmask
function partitionString(s) {
  //* The entire string counts as a substring
  if (s.length === 1) return 1;

  let splits = 0;
  let usedChars = 0; //* Used as a bitmask

  for (let char of s) {
    const ascii = char.charCodeAt(0) - 97;

    //* Current substring already contains this character; split here
    if (usedChars & (1 << ascii)) {
      usedChars = 0;
      splits++;
    }

    //* Mark character as found
    usedChars |= 1 << ascii;
  }

  //* The number of substrings is the number of splits + 1
  return splits + 1;
}

console.log(partitionString("abacaba")); //* 4
console.log(partitionString("sssss")); //* 5
console.log(partitionString("abc")); //* 1
console.log(partitionString("x")); //* 1
console.log(partitionString("tjuwqoujawoscjknmdlkawnflawnfalf")); //* 6
console.log(partitionString("widhdaskldl")); //* 3

//* Time: O(n) - It takes O(n) time to iterate through the entire string

//* Space: O(1) - We are using a constant amount of space
