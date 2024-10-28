//* We want to MINIMIZE the number of substrings in a partition
//*     - We can't have more than one of each character in a single substring
//*     - Realistically, the idea is to MAXIMIZE the length of each substring
//* We should split the moment we detect that a character already exists in the current substring
//*     - Don't split unless absolutely necessary
//*     - This maximizes the length of each substring, which in turn minimizes the number of substrings
//* A set will let us track the characters that already exist in the current substring
//*     - So we have O(1) lookup
function partitionString(s) {
  //* The entire string counts as a substring
  if (s.length === 1) return 1;

  let splits = 0;
  const usedChars = new Set();

  //* Get each char and check if it has already been added; if so, split
  for (let char of s) {
    //* If we already have the char, this substring ends here
    if (usedChars.has(char)) {
      usedChars.clear();
      splits++;
    }

    usedChars.add(char);
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
//* Membership tests, clearing and adding to the set all take Θ(1) on average

//* Space: O(1) - In the worst case, the set can hold 26 elements
//* We clear the set the moment we find a duplicate character (which WILL happen for each string of 27 length)
