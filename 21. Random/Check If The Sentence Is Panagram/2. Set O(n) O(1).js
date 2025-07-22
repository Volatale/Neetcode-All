//* A "pangram" is a sentence where every letter of the English alphabet appears AT LEAST once
//* "Appearing once" implies we need to check the frequency of all of the characters
//* Since there are always 26 characters to check, we can use a set
//* Sets do not allow duplicate elements, so we can simply check if the set's size is 26 at the very end
function checkIfPangram(sentence) {
  //* There aren't even 26 characters to check
  if (sentence.length < 26) return false;

  const chars = new Set();

  //* Add all of the characters to the
  for (let i = 0; i < sentence.length; i++) {
    chars.add(sentence[i]);
  }

  //* If the set has < 26 characters, not every character appeared
  return chars.size === 26;
}

console.log(checkIfPangram("abcdefghijklmnopqrstuvwxyz"));
console.log(checkIfPangram("qwerty"));
console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog"));

//* Time: O(n) - The time taken scales with the length of the input

//* Space: (1) - The set's size is limited to at most 26 (the number of lowercase English letters)
