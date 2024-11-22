//* Answer each query individually
//* Use a set of vowels to check for word validity
//*     - This helps avoid messy chained if statements
//* The inner loop iterates over all of the words in the range [left, right] inclusive
//*     - If the word starts and ends with a vowel, we can increment the count
function vowelStrings(words, queries) {
  const results = new Array(queries.length).fill(0);
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  //* For each query, check for the validity of each word
  for (let i = 0; i < queries.length; i++) {
    const [left, right] = queries[i];
    let count = 0;

    //* Check all of the words in the range [left, right] inclusive
    for (let i = left; i <= right; i++) {
      const word = words[i];

      //* This word starts and ends with a vowel
      if (vowels.has(word[0]) && vowels.has(word[word.length - 1])) {
        count++;
      }
    }

    //* Answer the query
    results[i] = count;
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

//* Time: O(n * q) - There are "q" queries, and for each query, there is the possibility of exploring every word
//* There are "n" words we have to check for validity, so we do a nested loop that scales with both n and q

//* Space: O(q) - We create an array of "q" length where q is queries.length
//* The set always contains 5 elements since the number of vowels is constant
