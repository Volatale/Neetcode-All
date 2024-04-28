//* Figure out what we NEED
//* Track what we HAVE
//* Use two pointers to track the distance between end and start
//* Mark the smallest distance with left and right; this is the substring we'll return
//* On encountering a character, increment the frequency of that character
//* Checking for an anagram (takes O(128))
function minimumWindowSubstring(s, t) {
  const need = new Array(128).fill(0);
  const have = new Array(128).fill(0);

  //* Sliding window
  let start = 0;
  let end = 0;

  //* Anchors for the substring positions
  let left = 0;
  let right = 0;

  let minLength = Infinity;

  //* Find the frequency we need in T
  for (let i = 0; i < t.length; i++) {
    need[t[i].charCodeAt(0)]++;
  }

  while (end < s.length) {
    have[s[end].charCodeAt(0)]++;

    while (isAnagram(need, have)) {
      if (end - start + 1 < minLength) {
        minLength = end - start + 1;
        left = start;
        right = end;
      }

      have[s[start].charCodeAt(0)]--;
      start++;
    }

    end++;
    s;
  }

  return minLength < Infinity ? s.substring(left, right + 1) : "";
}

//* O(128)
function isAnagram(freq1, freq2) {
  for (let i = 0; i < 128; i++) {
    if (freq1[i] > freq2[i]) return false;
  }

  return true;
}

console.log(minimumWindowSubstring("awec", "aec")); //* "awec"
console.log(minimumWindowSubstring("ADOBECODEBANC", "ABC")); //* "BANC"
console.log(minimumWindowSubstring("a", "a")); //* "a"
console.log(minimumWindowSubstring("a", "aa")); //* ""

//* Time: O(s + p) - We populate the "need" array first, which takes O(t) time
//* Then, we do an O(s) loop through the first input
//* Within each loop, we do an O(128) iteration to check the frequency of both arrays
//* So the true time complexity is O(s + p * 128) but we drop constants in Big O Notation
//* The time complexity is then simplified to O(s + p)

//* Space: O(s) - Two arrays are created; both have exactly 128 indices
//* In the worst case, the return can be the entire string "s"
//* So the true space complexity is O(128 * 2 + s.length)
//* But we drop constants in Big O Notation, so we simplify to O(s.length)
