//* Apply a sliding window approach
//* The window maintains a substring of characters whose cost <= maxCost
//! If we add a character to the window and that brings the cost > maxCost
//*     - Then we immediately know to shrink the window on the left
//*     - Keep shrinking until the window becomes valid again
//* After that process, we know the current window has to be valid
//* So we are safe to get the length of the current window
//*     - j - i + 1
//*     - Where "j" is the end of the substring
//*     - And "i" is the start of the substring
//! Based on the above logic, we know it is possible to maintain the sliding window invariant
//*     - The window is ONLY valid if the cumulative cost of the window is <= maxCost
//*     - If we add a character to the window, the cost will either stay the same, or increase
//*     - Likewise, if we remove a character, the cost either stays the same or decreases
//* So if the window is ever NOT valid, we can fix that
function equalSubstring(s, t, maxCost) {
  let maxLength = 0;

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  //* Cumulative cost of elements within the window
  let cost = 0;

  while (end < s.length) {
    //* "a" - "a" === (97 - 97) === 0
    cost += Math.abs(s[end].charCodeAt(0) - t[end].charCodeAt(0));

    //* Make sure the substring cost is <= maxCost
    while (cost > maxCost) {
      cost -= Math.abs(s[start].charCodeAt(0) - t[start].charCodeAt(0));
      start++;
    }

    //* Potentially update the current best
    maxLength = Math.max(maxLength, end - start + 1);
    end++;
  }

  return maxLength;
}

console.log(equalSubstring("abcd", "bcdf", 3)); //* 3
console.log(equalSubstring("abcd", "cdef", 3)); //* 1
console.log(equalSubstring("abcd", "acde", 0)); //* 1

//* Time: O(n) - At most, we process each element in "s" twice
//* So the time taken scales with s.kength

//* Space: O(1) - The memory usage remains constant regardless of input size
