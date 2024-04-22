//* Take the maximum frequency and subtract that from windowSize
//* That gives us the number of characters we have to replace to make a valid substring
//* Ideally, we want to replace the characters that are LESS common
//* Because then logically speaking, we can replace LESS characters overall
function longestRepeatingCharacterReplacement(s, k) {
  let start = 0;
  let end = 0;
  let length = 0;
  let maxFreq = 0; //* Most frequent character found so far

  //* Represents the characters within the window ([0] = "A", [25] = "Z")
  const freq = new Array(26).fill(0);

  while (end < s.length) {
    freq[s[end].charCodeAt(0) - 65]++; //* Add an occurrence
    maxFreq = Math.max(...freq);

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

//* Time: O(n * 26) - It takes O(26) -> O(1) time to create the array
//* Within each iteration we have to find the max value in the freq array
//* We know we are limited to 26 indices

//* Space: O(26) -> O(1) - The space usage is bounded by the number of uppercase alphabetical characters
//* We know there are 26 possibilities, so the array will always have 26 indices
//* 26 is a constant, so we simplify to O(1)
