//* Get the frequency of characters in "balloon", and the input
//* Start result at the highest value possible
//* Iterate through characters in "balloon"
//* Take the minimum of the ratio:
//* Even if you have 4 "a" in the freqCount, if the other characters don't have enough
//* For multiple instances of "balloon", these extra characters are useless
//* So we take the minimum (we have to check for the minimum amount each time)]
//* Essentially, assume that we don't have enough on each iteration
function maxNumberOfBalloons(text) {
  const balloon = getFreq("balloon");
  const freqCount = getFreq(text);

  //* Set this to a value you know we can't reach
  let result = Infinity;

  for (let char of "balloon") {
    result = Math.min(
      result,
      Math.floor((freqCount[char] || 0) / balloon[char]) // || 0 in cases where key doesn't exist (avoids NaN)
    );
  }

  return result;
}

//* O(26) -> O(1)
function getFreq(text) {
  const freqMap = {};

  for (let i = 0; i < text.length; i++) {
    freqMap[text[i]] = (freqMap[text[i]] || 0) + 1;
  }

  return freqMap;
}

console.log(maxNumberOfBalloons("nlaebolko")); // 1
console.log(maxNumberOfBalloons("loonbalxballpoon")); // 2
console.log(maxNumberOfBalloons("leetcode")); // 0
console.log(maxNumberOfBalloons("balon"));

//* Time: O(n) - The time taken by the function scales with the time it takes to get the frequency of the input
//* The length of the string is "n", so the time taken to get hte frqeuency of text is O(n)
//* "balloon" will always take O(7) -> O(1) to compute because it is always going to be the same string
//* The for loop within the original function will also always take O(7) -> O(1) for this very reason

//* Space: O(26) -> O(1) - Since we are restricted to lowercase alphabetical characters
//* That only leaves 26 options at most. So in the worst case, there are 26 keys in "freqCount"
//* Therefore, freqCount is bounded by 26 (which is a constant, and therefore simplifies down to O(1))
