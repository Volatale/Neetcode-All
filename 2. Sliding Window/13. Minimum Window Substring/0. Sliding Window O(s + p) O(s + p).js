//* We are given two strings `s` and `t` and we need to return the "minimum window substring"
//*     - Every character in `t` should be included in the window
//* So this is similar to an anagram problem, except that we need to return an actual string
//*     - So we cannot simply track the frequency alone
//* Since we need to track a "window" of characters, naturally, we can use a sliding window approach
//* To optimize our approach, we can use the "need vs have" variation of sliding window
//* Immediately get the frequency of characters in `t`, and the length of the string
//* Then, as we work through `s, if we need the current character, need will decrement
//* How do we determine what characters we "need"?
//*     - "have" !== "need"
//*     - "need" is not 0
//*     - We still need additional occurrences of the current character
//* If have ever equals need, then we know we have a valid window
//* We can use "anchor variables" to mark the start / end of the best valid substring thus far
//*     - Of course, this means we need to ensure that (end - start + 1 > previous best)
//*     - So we also need to track the previous best min length
//* Once we have processed the valid window, we can begin shrinking the window on the left
//* Keep shrinking until the window is no longer valid
//! Remember, we want the MINIMUM of all valid substrings, not the max
function minWindow(s, t) {
  //* There is no way that "s" contains all the characters in "t"
  if (t > s.length) return "";

  //* Pointers to mark the current window start and end
  let start = 0;
  let end = 0;

  let bestStart = 0;
  let bestEnd = 0;
  let minLength = Infinity;

  //* Used to support the need vs have variation of sliding window
  let need = t.length;
  let have = 0;

  const sFreq = {};
  const tFreq = {};

  //* Get the frequency of every character we need in `t`
  for (let i = 0; i < t.length; i++) {
    tFreq[t[i]] = (tFreq[t[i]] || 0) + 1;
  }

  while (end < s.length) {
    //* Add an occurrence of this character
    sFreq[s[end]] = (sFreq[s[end]] || 0) + 1;

    //* Check if we have made any progress toward the goal
    if (tFreq[s[end]] && sFreq[s[end]] <= tFreq[s[end]]) {
      have++;
    }

    //* We have a valid window, so now we just need to process it
    while (have === need) {
      //* Only update if the new window is smaller than the current best
      if (end - start + 1 < minLength) {
        bestStart = start;
        bestEnd = end;
        minLength = end - start + 1;
      }

      sFreq[s[start]]--;

      //* Check if we have lost any progress made
      if (tFreq[s[start]] && sFreq[s[start]] < tFreq[s[start]]) {
        have--;
      }

      //* Remove the characters with 0 occurrences from the frequency map
      if (sFreq[s[start]] === 0) {
        delete sFreq[s[start]];
      }

      start++;
    }

    end++;
  }

  //* If we didn't find a valid substring, return an empty string
  return minLength < Infinity ? s.substring(bestStart, bestEnd + 1) : "";
}

console.log(minWindow("aa", "aa")); //* "aa"
console.log(minWindow("awec", "aec")); //* "awec"
console.log(minWindow("ADOBECODEBANC", "ABC")); //* "BANC"
console.log(minWindow("a", "a")); //* "a"
console.log(minWindow("a", "aa")); //* ""
