//* We need to use the characters in the string "text" to make the word "balloon"
//* However, we can only use each character in "text" once
//* Ultimately, we need to find the MAXIMUM number of instances of "balloon" we can make
//* Observations:
//*     - The (unique) characters that exist in balloon are: "b", "a", "l", "o", "n"
//*     - The number of times we can use each character is limited by its frequency in "word"
//* Mathematically, we can divide the frequency of each character to find the number of times we can use the character
//* If we have 4 "a" in the freqCount, if the other characters don't have enough
//* Then we can ONLY use "a" 4 times (to create a complete word)
//* For multiple instances of "balloon", the extra occurrences are useless
function maxNumberOfBalloons(text) {
  //* Get the frequency of chars we need
  const balloon = { b: 1, a: 1, l: 2, o: 2, n: 1 };
  const freqCount = getFreq(text);

  //* The maximum number of "balloon" we can make
  let occurrences = Infinity;

  //* Iterate through the characters in "balloon"
  for (let char of "balloon") {
    occurrences = Math.min(
      occurrences,
      Math.floor((freqCount[char] || 0) / balloon[char])
    );
  }

  return occurrences;
}

function getFreq(text) {
  const freqMap = {};

  for (let i = 0; i < text.length; i++) {
    freqMap[text[i]] = (freqMap[text[i]] || 0) + 1;
  }

  return freqMap;
}

console.log(maxNumberOfBalloons("nlaebolko")); //* 1
console.log(maxNumberOfBalloons("loonbalxballpoon")); //* 2
console.log(maxNumberOfBalloons("leetcode")); //* 0
console.log(maxNumberOfBalloons("balon")); //* 0

//* Time: O(n) - It takes O(n) to get the frequency of the input
//* And then we iterate through each character in "balloon" (O(7) -> O(1))

//* Space: O(26) -> O(1) - The frequency map is bounded by 26 (no. of lowercase characters)
