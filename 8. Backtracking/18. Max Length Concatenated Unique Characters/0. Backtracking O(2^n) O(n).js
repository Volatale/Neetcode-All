//* Filter out all of the input strings that contain duplicate characters
//*     - Convert them to sets and compare the lengths of the string vs the set
//* Track the frequency of each possible character (26 possibilities)
//* At each level of recursion, check if the frequency of each character <= 1 even after adding all str[i] chars
//* If it IS valid, we can continue the search
//* Take the maximum of whatever maxLen is vs whatever the backtrack function returned
//* The frequency of each character cannot exceed one
function maximumLengthConcatenatedUniqueString(arr) {
  const freqArray = new Array(26).fill(0); //* Base 26 Frequency Array
  const filteredArray = arr.filter(isUnique); //* Remove all strings with duplicates from the input
  return backtrack(0, 0, freqArray, filteredArray);
}

function backtrack(start, maxLength, freqArray, arr) {
  let maxLen = maxLength;

  for (let i = start; i < arr.length; i++) {
    //* Would result in the same maxLength (they are the same string)
    if (i > start && arr[i - 1] === arr[i]) continue;

    //* Ensures that adding one to the frequency of each char in arr[i] would not exceed 1
    if (isValid(arr[i], freqArray)) {
      updateFrequency(arr[i], freqArray, 1); //* Increase the frequency of chars in arr[i]
      maxLen = Math.max(
        maxLen,
        backtrack(i + 1, maxLength + arr[i].length, freqArray, arr)
      );
      updateFrequency(arr[i], freqArray, -1); //* Decrease the frequency of chars in arr[i]
    }
  }

  return maxLen;
}

function isUnique(str) {
  return new Set(str).size === str.length;
}

//* Ensures adding a count to the frequency of each char in str would not result in duplicates
function isValid(str, freqArray) {
  for (let i = 0; i < str.length; i++) {
    //* Adding occurrence would make frequency > 1
    if (freqArray[str[i].charCodeAt(0) - 97] === 1) return false;
  }

  return true;
}

//* Increments or Decrements the frequency of each character in the input
function updateFrequency(str, freqArray, delta) {
  for (let i = 0; i < str.length; i++) {
    freqArray[str[i].charCodeAt(0) - 97] += delta;
  }
}

console.log(maximumLengthConcatenatedUniqueString(["aa"])); //* 0
console.log(maximumLengthConcatenatedUniqueString(["un", "iq", "ue"])); //* 4
console.log(maximumLengthConcatenatedUniqueString(["cha", "r", "act", "ers"])); //* 6
console.log(
  maximumLengthConcatenatedUniqueString(["abcdefghijklmnopqrstuvwxyz"])
); //* 26
console.log(maximumLengthConcatenatedUniqueString(["sonic", "sonic", "abc"])); //* 5
console.log(maximumLengthConcatenatedUniqueString(["sonic", "sonic", "xyz"])); //* 8

//* Time: O(2^n) - At each step, we either include or exclude the element
//* Converting the string into a set takes O(m) where "m" is the length of the longest string
//* Each call to backtrack leads to 2 more calls

//* Space: O(n) - The auxillary structures contribute to O(n) space
//* The depth of the recursion is O(n)
