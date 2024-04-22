//* Result is only maximized as we find a NEW max frequency
//* Even if we "overestimate" what the maxFreq is vs what is actually in the freq array1
//* Take "AAAB", K = 0
//* You know that maxLength would be 3, then we get to "B"
//* We CANNOT replace any characters, so the window size needs to keep decreasing
//* maxFreq is STILL 3, but you also know that it is impossible to improve maxLength
//* If the two pointers are too close together
function longestRepeatingCharacterReplacement(s, k) {
  let start = 0;
  let end = 0;
  let length = 0;
  let maxFreq = 0; //* Most frequent character found so far

  //* Represents the characters within the window ([0] = "A", [25] = "Z")
  const freq = new Array(26).fill(0);

  while (end < s.length) {
    freq[s[end].charCodeAt(0) - 65]++; //* Add an occurrence
    maxFreq = Math.max(maxFreq, freq[s[end].charCodeAt(0) - 65]);

    //* windowSize - maxFreq = The number of chars we have to replace
    //* If the result > k, then we need to decrease the window size
    //* You need to replace MORE than k characters, so remove the leftmost character
    while (end - start + 1 - maxFreq > k) {
      freq[s[start++].charCodeAt(0) - 65]--;
    }

    length = Math.max(length, end - start + 1);
    end++;
  }

  return length;
}

console.log(longestRepeatingCharacterReplacement("AB", 0)); //* 2
console.log(longestRepeatingCharacterReplacement("ABAB", 2)); //* 4
console.log(longestRepeatingCharacterReplacement("AABABBA", 1)); //* 4

//* Time: O(n) - It takes O(26) -> O(1) time to create the array
//* Then, the time taken to process every element in the string scales with the input size

//* Space: O(26) -> O(1) - The space usage is bounded by the number of uppercase alphabetical characters
//* We know there are 26 possibilities, so the array will always have 26 indices
//* 26 is a constant, so we simplify to O(1)
