//* We need to merge two strings by adding letters in an alternating order
//* This resembles the logic that is used in the merge step of merge sort
//* If we run out of characters of one string, simply append the rest of the string
//* The key is that we need to alternate the characters we append
//* We can use a two pointer approach similar to merge sort
//* Append word1[i], then word2[j] keep repeating this process
//* Eventually, one string will have no more characters to append
function mergeAlternatively(word1, word2) {
  //* Two pointers to mark the current character to process in each word
  let left = 0;
  let right = 0;

  //* The eventual final merged string
  let string = "";

  while (left < word1.length && right < word2.length) {
    if (left < word1.length) string += word1[left++];
    if (right < word2.length) string += word2[right++];
  }

  //* Handle the remaining characters in either string
  while (left < word1.length) string += word1[left++];
  while (right < word2.length) string += word2[right++];

  return string;
}

console.log(mergeAlternatively("abc", "")); //* "abc"
console.log(mergeAlternatively("", "la")); //* "la"
console.log(mergeAlternatively("a", "b")); //* "ab"
console.log(mergeAlternatively("", "")); //* ""
console.log(mergeAlternatively("abc", "pqr")); //* "apbqcr"
console.log(mergeAlternatively("sonic", "hedgehog")); //* "shoendigcehog"

//* Time: O(n + m) - The time taken scales with the length of both input strings (they can vary)

//* Space: O(n + m) - The length of the result also scales with the length of both input strings
