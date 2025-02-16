//* This is a frequency-based problem, so track the frequency of characters
//* Instead of explicitly sorting, we can sort indirectly
//* Place elements into buckets based on their freuency
//*     - Multiple elements can have the same frequency
//* Then, we can iterate through the buckets BACKWARDS
//*     - We want the HIGHEST frequency characters first (they are at the end)
//* Since the current bucket could have multiple characters stored within
//*     - We need to perform a nested loop and push a string of the char.repeat(i) for each
function frequencySort(s) {
  const results = [];
  const freq = {}; //* Get the frequency for every character
  const bucket = new Array(s.length + 1).fill(-1);

  //* Get the frequency of every character
  for (let i = 0; i < s.length; i++) {
    freq[s[i]] = (freq[s[i]] || 0) + 1;
  }

  //* Elements with the same frequency go into the same bucket
  for (let char of Object.keys(freq)) {
    const frequency = freq[char];

    //* Create a bucket to hold elements of this frequency
    if (bucket[frequency] === -1) {
      bucket[frequency] = [];
    }

    bucket[frequency].push(char);
  }

  //* Build the string in reverse (the highest frequency elements are ->)
  for (let count = bucket.length - 1; count >= 0; count--) {
    if (bucket[count] === -1) continue; //* Frequency of 0

    //* For each character in this bucket, push the char repeated "count" times
    for (let char of bucket[count]) {
      results.push(char.repeat(count));
    }
  }

  return results.join("");
}

console.log(frequencySort("tree")); //* "eert"
console.log(frequencySort("cccaaa")); //* "aaaccc"
console.log(frequencySort("Aabb")); //* "bbAa"
console.log(frequencySort("abc")); //* "abc" or any permutation

//* Time: O(n) - We are not sorting anymore, so the time taken scales with "n"

//* Space: O(n) - In the worst case, every character is unique
//* So the result string could potentially have an equal length to the input
