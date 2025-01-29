//* For each "i", check its previous character
//* Two characters are adjacent if their ASCII char codes differ by <= 1
//* If two characters are almost equal, increment changes
//*     - We need to change one of these characters
//* The chaacter we change the current character to does not matter
//*     - If the "change" would make it almost equal word[i + 1]
//*       we could just change the character to something else
//* So essentially, we are taking a greedy approach
//*     - We don't care what the character is changed to
//* If a change IS made, however, increment i again
//*     - There is no point in checking the next character
//*     - It should never equal the changed character since we'd just make it different anyway
function removeAlmostEqualCharacters(word) {
  //* There are no adjacent characters
  if (word.length <= 1) return 0;

  let changes = 0;

  for (let i = 1; i < word.length; i++) {
    //* Check if a pair of characters are almost equal
    if (Math.abs(word[i].charCodeAt(0) - word[i - 1].charCodeAt(0)) <= 1) {
      changes++;
      i++; //* Skip the next since it is irrelevant now
    }
  }

  return changes;
}

console.log(removeAlmostEqualCharacters("aaaaa")); //* 2
console.log(removeAlmostEqualCharacters("abddez")); //* 2
console.log(removeAlmostEqualCharacters("zyxyxyz")); //* 3
console.log(removeAlmostEqualCharacters("acegikmo")); //* 0
console.log(removeAlmostEqualCharacters("az")); //* 0

//* Time: O(n) - In the worst case, no characters are almost equal
//* Which means we need to iterate over the entire string

//* Space: O(1) - The space usage remains constant regardless of input size
