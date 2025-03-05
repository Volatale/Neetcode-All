//* This is essentially an anagram question
//* We need to track the frequency of characters in "t"
//* Then, we can try to create substrings that contain all of those characters in "s"
//* In this variation, we need to validate:
//*     - Whether sFreq (currently) contains all of the characters we need in "t"
//*     - AND whether or not the frequencies of those characters is >= those in "t"
//* We ONLY want to take the current substring as our best if its length is LESS than the current best
//*     - So track the start and end indices of the current best
//*     - And also track the LENGTH of the current best so we have an easy time comparing them
//* Regardless of whether or not we actually take the current string, we need to decrease the window size
//*     - The goal is to find the MINIMUM valid window
//*     - Since we know THIS window is valid, shrink the window on the left
//*         - If the window is STILL valid, then we repeat the process
//* If at the end we never found a string (minLength === infinity)
//*     - Return an empty string
//* Otherwise, return a substring starting from the START of the best valid substring up to the END of the best
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

  //* Get the frequency of characters in "t"
  for (let i = 0; i < t.length; i++) {
    tFreq[t[i]] = (tFreq[t[i]] || 0) + 1;
  }

  while (end < s.length) {
    //* Increment frequency of current character (@end)
    sFreq[s[end]] = (sFreq[s[end]] || 0) + 1;

    while (isValid(sFreq, tFreq)) {
      //* Only take this substring if it is SMALLER than the previous
      if (end - start + 1 < minLength) {
        sStart = start;
        sEnd = end;
        minLength = end - start + 1;
      }

      //* Shrink on the left (we want always want a SMALLER window)
      sFreq[s[start]] = sFreq[s[start]] - 1;
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

function isValid(sFreq, tFreq) {
  for (let key in tFreq) {
    if (!sFreq.hasOwnProperty(key) || sFreq[key] < tFreq[key]) {
      return false;
    }
  }

  return true;
}

console.log(minWindow("ADOBECODEBANC", "ABC")); //* "BANC"
console.log(minWindow("a", "a")); //* "a"
console.log(minWindow("a", "aa")); //* ""

//* Time: O(n * k) - For every iteration of the outer loop, the inner while loop is triggered
//* The time complexity of "isValid" is O(k) since the time taken scales with the number of unique chars in tFreq

//* Space: O(n + m) - We use an object (hashtable) to store the frequency of every character in "t"
//* And we do the same for "s". In the worst case, every character in both inputs is unique
