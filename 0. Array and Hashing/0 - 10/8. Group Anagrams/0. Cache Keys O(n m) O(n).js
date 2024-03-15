//* Store the result in a new array
//* Use the frequency count of each word, and convert that to a string
//* If we already have a key of that string, just push the current word to that index's array
//* Otherwise, create a new array and do the above
//* Lastly, iterate over each key in the map and push the values to the result
function groupAnagrams(strs) {
  const map = {};

  for (let i = 0; i < strs.length; i++) {
    const freq = getFreq(strs[i]).toString(); // toString() because JS can't check object references with ===

    if (!map[freq]) {
      map[freq] = [];
    }

    map[freq].push(strs[i]);
  }

  //* Add all of the words from each key to result
  return Object.values(map);
}

//* O(m) - Where m is the length of the word
function getFreq(word) {
  const freq = new Array(26).fill(0);

  for (let i = 0; i < word.length; i++) {
    const char = word[i].charCodeAt(0) - 97;
    freq[char]++;
  }

  return freq;
}

console.log(groupAnagrams(["hey", "yeh", "no"]));
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["bat"],["nat","tan"],["ate","eat","tea"]]
console.log(groupAnagrams([""])); // [[""]]
console.log(groupAnagrams(["a"])); // [["a"]]

//* Time: O(n * m) - It takes O(n) time to iterate over the whole strs array
//* It takes O(26) time to get the freqency of a word, but that simplifies to constant time
//* It also takes O(m) time where "m" is the number of unique anagrams to get the result

//* Space: O(n) - The space usage of "map" scales with the size of the input array
//* If you have 1 million keys and all of those keys equate to the same anagram
//* The result would also have 1 million elements, just in anagram groups (separate arrays)
