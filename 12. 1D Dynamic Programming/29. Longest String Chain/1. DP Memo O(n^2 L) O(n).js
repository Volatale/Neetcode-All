//* Apply reverse thinking, instead of building UP to a word
//!     - Start with the LONGEST and work down to smaller
//* Sort the words so we have a natural progression between words
//*     - Each successive word in the chain should be 1 length greater than the previous
//*     - By sorting, we maximize the chance that we find a valid successor
//! There is no way to tell what the best starting point is
//*     - So treat EVERY word as a potential starting point
//! We are starting with the SMALLEST and working our way upward

//* Apply memoization to avoid redundant work
function longestStrChain(words) {
  function findChain(i, memo) {
    //* Each word is its own chain
    let longest = 1;

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* We sorted the words by length, so we can avoid
    for (let j = i; j < words.length; j++) {
      //* Skip the current word
      if (i === j) continue;

      if (isPredecessor(words[i], words[j])) {
        longest = Math.max(longest, findChain(j, memo) + 1);
      }
    }

    memo[i] = longest;
    return longest;
  }

  //* Start with the SHORTEST words so we can later apply memoization
  words.sort((a, b) => a.length - b.length);

  const memo = {};
  let maxLength = 1;

  //* Try treating EVERY word as a starting point
  for (let i = 0; i < words.length; i++) {
    maxLength = Math.max(maxLength, findChain(i, memo));
  }

  return maxLength;
}

//* Only progress smaller string ointer when we find a match
//* Always progress the longer string's pointer
function isPredecessor(s1, s2) {
  //* Word 1 cannot possibly be a predecessor of word 2
  if (s1.length + 1 !== s2.length) return false;

  let i = 0;
  let j = 0;
  let differences = 0;

  while (i < s1.length && j < s2.length && differences <= 1) {
    if (s1[i] !== s2[j]) {
      differences++;
    } else {
      i++;
    }

    j++;
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

//* Time: O(n^2 * L) - Where "n" is words.length and "L" is the length of the longest word
//* There are "n" outer calls to findChain, and within each call, we iterate over the rest of the list (-1)
//* We are memoizing the results of subproblems, but we still need to try every word as the start of a chain
//* isPredecessor takes O(L) and we do this within each call

//* Space: O(n) - The depth of the recursion tree scales with the number of words
//* In the worst case, the entire list is part of the same chain
//* Sorting uses O(n) memory on average
