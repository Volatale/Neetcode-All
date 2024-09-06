//* Apply reverse thinking, instead of building UP to a word
//!     - Start with the LONGEST and work down to smaller
//* The sorting makes less sense here since we aren't using memoization
//*     - But if we WERE, it would cache the deepest subproblems
//*     - Thus reducing the overall time complexity
//! There is no way to tell what the best starting point is
//*     - So treat EVERY word as a potential starting point
//! We are starting with the LONGEST and working our ward downward
function longestStrChain(words) {
  function findChain(i) {
    //* Each word is its own chain
    let longest = 1;

    for (let j = i; j < words.length; j++) {
      //* Skip the current word
      if (i === j) continue;

      if (isPredecessor(words[i], words[j])) {
        longest = Math.max(longest, findChain(j) + 1);
      }
    }

    return longest;
  }

  //* Start with the LONGEST words so we can later apply memoization
  words.sort((a, b) => b.length - a.length);

  let maxLength = 1;

  //* Try treating EVERY word as a starting point
  for (let i = 0; i < words.length; i++) {
    maxLength = Math.max(maxLength, findChain(i));
  }

  return maxLength;
}

//* Only progress smaller string pointer when we find a match
//* Always progress the longer string's pointer
function isPredecessor(s1, s2) {
  //* Word 1 cannot possibly be a predecessor of word 2
  if (s1.length - 1 !== s2.length) return false;

  let i = 0;
  let j = 0;
  let differences = 0;

  while (i < s1.length && j < s2.length && differences <= 1) {
    if (s1[i] !== s2[j]) {
      differences++;
    } else {
      j++;
    }

    i++;
  }

  //* 0 differences means the extra character is the FINAL character
  //* 1 difference means the extra character is in the middle of the string somewhere
  return differences <= 1;
}

console.log(longestStrChain(["a", "ab", "abc"])); //* 3
console.log(longestStrChain(["yua", "ayua"])); //* 2
console.log(longestStrChain(["a", "b", "ba", "bca", "bda", "bdca"])); //* 4
console.log(longestStrChain(["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"])); //* 5
console.log(longestStrChain(["x", "y"])); //* 1
console.log(longestStrChain(["z"])); //* 1

//* Time: O(n^n * L) - Where "n" is words.length and "L" is the length of the longest word
//* There are "n" outer calls to findChain, and within each call, we iterate over the entire list (-1)
//* So the branching factor is "n" in the worst case, and the depth of the recursion is "n"
//* isPredecessor takes O(L) and we do this within each call
//* So branching factor ^ depth of recursion tree * isPrecessor = O(n^n * L)

//* Space: O(n) - The depth of the recursion tree scales with the number of words
//* In the worst case, the entire list is part of the same chain
//* Sorting uses O(n) memory on average
