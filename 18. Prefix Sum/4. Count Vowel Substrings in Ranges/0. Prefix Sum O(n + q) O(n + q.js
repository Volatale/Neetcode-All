//* Instead repeatedly checking if words[i] is valid or not
//*     - We can "cache" the validity of each word
//* prefix[i] = Cumulative sum of words that are "valid" up to (and including) this index
//* Generally speaking, prefix sums are calculated like so:
//*     - prefix[i] = prefix[i-1] + nums[i]
//* In our case, prefix[i-1] is the PREVIOUS count
//* And nums[i] is whether or not the CURRENT word is valid
//*     - "aba" starts and ends in a vowel, thus we can ADD ONE to the previous count
//*     - Whereas "bab" does NOT start and end with a vowel, so we ADD ZERO to the previous count
//* By precomputing the prefix sum, we can avoid recalculating values
//! Sliding Window won't work here because the invariants do not hold
//*     - If a window is valid, a smaller subset / subarray of the window should ALSO be valid
//*     - Likewise, if a window is invalid, a smaller subset / subarray of that window should also be INVALID
//*         - There isn't any consistent window-shrinking/expanding logic we can follow
function vowelStrings(words, queries) {
  const results = new Array(queries.length).fill(0);
  const prefix = new Array(words.length).fill(0);
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  //* Precompute a prefix array that counts the no. of valid strings in a range
  //* Prefix sums are usually computed like so: prefix[i] = prefix[i-1] + nums[i]
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const valid = vowels.has(word[0]) && vowels.has(word[word.length - 1]);
    prefix[i] = (i > 0 ? prefix[i - 1] : 0) + (valid ? 1 : 0);
  }

  //* Answer all of the queries
  for (let i = 0; i < queries.length; i++) {
    const [left, right] = queries[i];

    //* We want the prefix sum of [left, right], so remove everything BEFORE left
    results[i] = prefix[right] - (left > 0 ? prefix[left - 1] : 0);
  }

  return results;
}

console.log(
  vowelStrings(
    ["aba", "bcb", "ece", "aa", "e"],
    [
      [0, 2],
      [1, 4],
      [1, 1],
    ]
  )
); //* [2, 3, 0]

console.log(
  vowelStrings(
    ["a", "e", "i"],
    [
      [0, 2],
      [0, 1],
      [2, 2],
    ]
  )
); //* [3, 2, 1]

//* Time: O(n + q) - It takes O(n) to generate the prefix sum array where "n" is words.length
//* Then it takes O(q) to answer all of the queries

//* Space: O(n + q) - We create a prefix sum array and a results array, of length "n" and "q" respectively
//* The set always contains 5 elements regardless of input size (so it uses constant space)
