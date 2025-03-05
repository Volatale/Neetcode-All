//* Uses the "Need vs Have" variation of Sliding Window
//* Instead of using a loop to validate whether the current window is valid
//* We can track the number of characters we currently NEED vs what we already HAVE
//* Ultimately, we will NEED every character that exists in "t"
//*     - Hence, initially, need = t.length
//* But we START with no characters in the window
//*     - So need = 0
//* A "needed" character is:
//*     - A character that exists in T
//*     - AND is a character that we need a higher frequency of
//* So when we add characters to the window, we ALSO check if it is a NEEDED character
//*     - If it IS, then increment "have", because we now need one less character to have a VALID window
//* When a character LEAVES the window, we do the opposite
//*     - If it is a character that exists in T
//*     - AND is a character that we'll need a replacement of
//*         - Decrement "have" -> we lost progress toward having a valid window
//* This reduces the validation step's time complexity from O(n * k) to O(1)
function minWindow(s, t) {
  //* Can't make window
  if (s.length < t.length) return "";

  const sFreq = {};
  const tFreq = {};

  //* Sliding window pointers
  let start = 0;
  let end = 0;

  //* Marks start and end of "best" valid substring so far
  let sStart = 0;
  let sEnd = 0;
  let minLength = Infinity; //* Substring length we have to beat

  let need = t.length; //* The total number of valid characters we NEED
  let have = 0; //* The number of (valid) characters that exist in the current window

  //* Get the frequency of characters in "t"
  for (let i = 0; i < t.length; i++) {
    tFreq[t[i]] = (tFreq[t[i]] || 0) + 1;
  }

  while (end < s.length) {
    //* Increment frequency of current character (@end)
    sFreq[s[end]] = (sFreq[s[end]] || 0) + 1;

    //* We now need one less character to have a valid window
    if (tFreq[s[end]] !== undefined && sFreq[s[end]] <= tFreq[s[end]]) {
      have++;
    }

    //* While we have a VALID window (we HAVE all the chars we NEED)
    while (have === need) {
      //* Only take this substring if it is SMALLER than the previous
      if (end - start + 1 < minLength) {
        sStart = start;
        sEnd = end;
        minLength = end - start + 1;
      }

      //* Shrink on the left (we want always want a SMALLER window)
      sFreq[s[start]] = sFreq[s[start]] - 1;

      //* Character LEAVING window is NEEDED by tFreq (needs a replacement later)
      if (tFreq[s[start]] !== undefined && sFreq[s[start]] < tFreq[s[start]]) {
        have--;
      }

      //* Remove the character - no occurrences left (space optimization)
      if (sFreq[s[start]] === 0) {
        delete sFreq[s[start]];
      }

      start++;
    }

    end++;
  }

  //* Return an empty string if we never found a valid window
  return minLength < Infinity ? s.substring(sStart, sEnd + 1) : "";
}

console.log(minWindow("ADOBECODEBANC", "ABC")); //* "BANC"
console.log(minWindow("a", "a")); //* "a"
console.log(minWindow("a", "aa")); //* ""

//* Time: O(n + m) - It takes O(m) to iterate over "t", and then O(n) to iterate over "s"
//* The strings could possibly have different lengths, hence the different terms

//* Space: O(n + m) - We use an object (hashtable) to store the frequency of every character in "t"
//* And we do the same for "s". In the worst case, every character in both inputs is unique
