//* Figure out what we NEED
//* Track what we HAVE
//* On encountering a character we NEED, increment "have"
//* When a character we NEED leaves the window, decrement "have"

function minimumWindowSubstring(s, t) {
  //* Sliding window
  let start = 0;
  let end = 0;

  //* Anchors for the returned substring
  let left = 0;
  let right = 0;
  let minLength = Infinity;

  //* Track the frequencies
  let have = 0;
  let need = t.length;

  const tFreq = new Map();
  const sFreq = new Map();

  //* Find the frequency we need in T
  for (let i = 0; i < t.length; i++) {
    tFreq.set(t[i], (tFreq.get(t[i]) || 0) + 1);
  }

  while (end < s.length) {
    //* Add an occurrence
    sFreq.set(s[end], (sFreq.get(s[end]) || 0) + 1);

    //* If these characters have an equal frequency, we are closer to the goal
    if (tFreq.has(s[end]) && sFreq.get(s[end]) <= tFreq.get(s[end])) {
      have++;
    }

    //* Potentially update result: end - start + 1 is the window size
    while (have === need) {
      //* Only update if new window is smaller than current best
      if (end - start + 1 < minLength) {
        left = start;
        right = end;
        minLength = end - start + 1;
      }

      //* Remove left occurrence
      sFreq.set(s[start], sFreq.get(s[start]) - 1);

      //* If they no longer match, we need
      if (tFreq.has(s[start]) && sFreq.get(s[start]) < tFreq.get(s[start])) {
        have--;
      }

      //* Space optimization
      if (sFreq.get(s[start]) === 0) {
        sFreq.delete(s[start]);
      }

      start++;
    }

    end++;
  }

  return minLength < Infinity ? s.substring(left, right + 1) : "";
}

console.log(minimumWindowSubstring("aa", "aa")); //* ""
console.log(minimumWindowSubstring("awec", "aec")); //* "awec"
console.log(minimumWindowSubstring("ADOBECODEBANC", "ABC")); //* "BANC"
console.log(minimumWindowSubstring("a", "a")); //* "a"
console.log(minimumWindowSubstring("a", "aa")); //* ""

//* Time: O(s + p) - Check the frequency of the characters in "t"; this takes O(t) time
//* Then do an O(s) loop through the first input
//* It takes Θ(1) on average to add(), remove() and get()

//* Space: O(s + p) - In the worst case we have to store both strings in both maps respectively
