//* Apply reverse thinking, instead of building UP to a word
//!     - Start with the LONGEST and work down to smaller
//* Sort the words so we have a natural progression between words
//*     - Each successive word in the chain should be 1 length greater than the previous
//*     - By sorting, we maximize the chance that we find a valid successor
//! There is no way to tell what the best starting point is
//*     - So treat EVERY word as a potential starting point
//! We are starting with the SMALLEST and working our way upward

//* Apply tabulation to avoid recursion overhead
function longestStrChain(words) {
  if (words.length === 0) return 0;

  const n = words.length;
  let maxLength = 1;

  //* Sort words by length to start with the SMALLEST words first
  words.sort((a, b) => a.length - b.length);

  //* dp[i] = Length of longest chain ending at index "i"
  const dp = new Array(n).fill(1);

  //* "i" = index of word we are trying to get to
  //* "j" = index of (potential) predecessor word
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      //* Word J must be a predecessor of word I
      if (isPredecessor(words[j], words[i])) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    maxLength = Math.max(maxLength, dp[i]);
  }

  return maxLength;
}

function isPredecessor(s1, s2) {
  //* Impossible to be a predecessor
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

  //* 0 = Extra char is at the end, 1 = extra char is in the middle somewhere
  return differences <= 1;
}

console.log(longestStrChain(["a", "ab", "abc"])); //* 3
console.log(longestStrChain(["yua", "ayua"])); //* 2
console.log(longestStrChain(["a", "b", "ba", "bca", "bda", "bdca"])); //* 4
console.log(longestStrChain(["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"])); //* 5
console.log(longestStrChain(["x", "y"])); //* 1
console.log(longestStrChain(["z"])); //* 1

//* Time: O(n^2 * L) - Where "n" is words.length and "L" is the length of the longest word
//* There are "n" total words and "n" previous words
//* We do an O(n^2) nested for loop to check every possible predecessor
//* isPredecessor itself takes O(L) and we do this within each call
//* Sorting takes O(n log n) time, but this is dominated by the exponential nature

//* Space: O(n) - The depth of the recursion tree scales with the number of words
//* In the worst case, the entire list is part of the same chain
//* Sorting uses O(n) memory on average
