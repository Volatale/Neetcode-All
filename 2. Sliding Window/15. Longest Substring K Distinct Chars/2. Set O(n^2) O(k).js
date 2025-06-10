//* Given a string, find the length of the LONGEST substring that contains AT MOST `k` DISTINCT characters
//* Since we care about unique characters, and the frequency of these characters, we should use a frequency map
//*     - A set would help, but wouldn't give us all of the information we need
//*     - We'd still have no way of knowing when we should delete a character
//* However, if we use a brute force approach, we CAN in fact, use a set instead of a frequency map
//* Simply try every possible substring (all 2^n of them) and reset the set for each
//* Why does this work? Because we care about the LENGTH of the valid substring(s), not the substring itself
//*     - So we can completely discard any information about the string (i.e. the characters in the substring themselves)
function longestSubstringKDistinctChars(s, k) {
  const distincts = new Set();
  let maxLength = 0;

  //* Try every substring. Clearing the set is faster than allocating memory for a new object (set)
  for (let i = 0; i < s.length; i++) {
    distincts.clear();
    let length = 0;

    //* Try to find non-distinct chars
    for (let j = i; j < s.length; j++) {
      if (distincts.has(s[j])) {
        length++;
      } else if (distincts.size < k) {
        distincts.add(s[j]);
        length++;
      } else {
        break; //* We cannot add a third character to the "substring"
      }
    }

    maxLength = Math.max(maxLength, length);
  }

  return maxLength;
}

console.log(longestSubstringKDistinctChars("eceba", 2)); //* 3
console.log(longestSubstringKDistinctChars("aba", 2)); //* 3
console.log(longestSubstringKDistinctChars("bba", 1)); //* 2
console.log(longestSubstringKDistinctChars("aqwwer", 4)); //* 5

//* Time: O(n^2) - In the worst case, there are (n * (n + 1)) / 2 iterations

//* Space: O(k) - The size of the set scales with `k` itself
