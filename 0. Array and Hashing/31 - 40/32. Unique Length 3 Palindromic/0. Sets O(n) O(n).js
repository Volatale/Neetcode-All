//* We need to track unique palindromes, so use a set
//* This requires 3 loops, one for the leftmost character, one for the middle character (for the subsequence)
//* And one more loop for everything else
//* A string builder is used because we need to test candidates (similar to backtracking)
//* After testing completely, we need to pop to get ready for the next character
function uniquePalindromes(s) {
  const result = new Set(); //* {middleChar, outerChar}. There are, at most, 26^2 palindromes
  const left = new Set();
  const right = new Map();

  //* Count occurrences of characters in "s"
  //* We want to be able to ask "does right have this character"
  for (let i = 0; i < s.length; i++) {
    right.set(s[i], (right.get(s[i]) || 0) + 1);
  }

  //* Middle Character
  for (let i = 0; i < s.length; i++) {
    right.set(s[i], right.get(s[i]) - 1); //* Because "mid" has reached a character, right no longer has it

    if (right.get(s[i]) === 0) {
      right.delete(s[i]); //* Right has no more occurrences of this char
    }

    //* Check if right has any character in left
    for (let char of left) {
      if (right.has(char)) {
        result.add(char + s[i] + char); //* If it does, we can make a palindrome out of it
      }
    }

    left.add(s[i]); //* Left gained the character that right lost
  }

  return result.size;
}

console.log(uniquePalindromes("aabca")); //* 3
console.log(uniquePalindromes("adc")); //* 0
console.log(uniquePalindromes("bbcbaba")); //* 4

//* Time: O(n) - It takes O(n) time to iterate through the string the first time to count occurrences
//* It takes O(n) time again to iterate a second time to find the "middle" character in the palindrome
//* We are limited to only 26 characters (English Alphabet), so the inner loop will activate 26 times at most
//* O(26 * n) -> O(n)

//* Space: O(n) - We use sets left and res to store the characters and unique palindromes
//* Their sizes are bounded by the number of distinct characters; at worst this would be every character in the string
//* We also use a map, but there are at max 26 keys (English Alphabet)
