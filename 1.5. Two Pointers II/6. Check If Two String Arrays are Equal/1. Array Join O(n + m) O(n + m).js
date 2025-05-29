//* We are given two arrays of strings (each of which can be concatenated into another string)
//* The goal is to compare every character in each inner string to see if the "concatenated" strings are equal
//* Since they are string[], we can simply "join" the arrays using a function and compare at the very end
function arrayStringsAreEqual(word1, word2) {
  return word1.join("") === word2.join("");
}

console.log(arrayStringsAreEqual(["ab", "c"], ["a", "bc"])); //* true
console.log(arrayStringsAreEqual(["a", "cb"], ["ab", "c"])); //* false
console.log(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"])); //* true
console.log(arrayStringsAreEqual(["sonic"], [""])); //* false
console.log(arrayStringsAreEqual(["jas"], ["jes"])); //* false

//* Time: O(n + m) - The time taken to join each string scales with the length of each respective input

//* Space: O(n + m) - The `join()` method returns a new string, so the total memory usage scales with the length of both
