//* This is a frequency-based problem, so track the frequency of characters
//* Then, we can simply get a list of every character and its frequency
//* Sort the list of characters in descending order based on their frequency
//* Finally, join all of the characters in reverse order
function frequencySort(s) {
  //* Get the frequency for every character
  const freq = {};

  //* Get the frequency of every character
  for (let i = 0; i < s.length; i++) {
    freq[s[i]] = (freq[s[i]] || 0) + 1;
  }

  const entries = Object.entries(freq);

  //* Sort the characters in descending order based on frequency
  entries.sort((a, b) => b[1] - a[1]);

  //* Iterate through each character and build the string
  return entries.reduce((acc, [char, freq]) => acc + char.repeat(freq), "");
}

console.log(frequencySort("tree")); //* "eert"
console.log(frequencySort("cccaaa")); //* "aaaccc"
console.log(frequencySort("Aabb")); //* "bbAa"
console.log(frequencySort("abc")); //* "abc" or any permutation

//* Time: O(n log n) - In the worst case, every element has a frequency of 1
//* Therefore, the time taken to sort scales with the input size

//* Space: O(n) - Technically, we only have 60 possible characters
//* 26 lowercase and uppercase respectively, and 0 - 9
//* So the space used by the frequency map can be O(60) at most
//* However, the string output can potentially be of equal length to the input
