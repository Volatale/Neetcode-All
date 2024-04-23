//* Get the frequency of characters in s1 and up to s1.length in s2
//* Then iterate from 0 to 26 and count how many indices in both match
//* Track this number, and if it is 26, then you have found an anagram
//* Within each iteration, drop the left character
//* And then see if the frequency post-drop matches
//* If it does, then matches++, otherwise,
//* Check if it WOULD match if we didn't remove the last character
//* Do the same for adding the next character
function permutationInString(s1, s2) {
  if (s2.length < s1.length) return false;

  let start = 0;
  let end = 0;

  let matches = 26;

  const freq1 = new Array(26).fill(0);
  const freq2 = new Array(26).fill(0);

  //* Create anagrams of first window
  for (let i = 0; i < s1.length; i++) {
    freq1[s1[end].charCodeAt(0) - 97]++;
    freq2[s2[end].charCodeAt(0) - 97]++;
    end++;
  }

  //* Find the number of matches in both arrays
  for (let i = 0; i < 26; i++) {
    if (freq1[i] !== freq2[i]) matches--;
  }

  if (matches === 26) return true;

  while (end < s2.length) {
    const startChar = s2[start++].charCodeAt(0) - 97;
    const endChar = s2[end++].charCodeAt(0) - 97;

    //* Removing a character from the window
    freq2[startChar]--;

    if (freq1[startChar] === freq2[startChar]) {
      matches++;
    } else if (freq1[startChar] - 1 === freq2[startChar]) {
      matches--; //* If REMOVING gave us 1 too few characters
    }

    //* Adding a character to the window
    freq2[endChar]++;

    if (freq1[endChar] === freq2[endChar]) {
      matches++;
    } else if (freq1[endChar] + 1 === freq2[endChar]) {
      matches--; //* If ADDING gave us 1 too many characters
    }

    if (matches === 26) return true;
  }

  return false;
}

console.log(permutationInString("ab", "acab")); //* true
console.log(permutationInString("ab", "eidbaooo")); //* true
console.log(permutationInString("ab", "bloba")); //* true
console.log(permutationInString("icson", "sonic")); //* true
console.log(permutationInString("zw", "wz")); //* true
console.log(permutationInString("w", "z")); //* false
console.log(permutationInString("law", "lae")); //* false

//* Time: O(n) - We generate the first anagram for both at the same time O(s2)
//* Then we do an O(26) loop (once)
//* Followed by an O(n) loop through the second input

//* O(1) - We have two frequency arrays that are constrained to 26 characters
//* So the space usage always remains constant regardless of input size
