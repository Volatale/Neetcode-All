//* Simply convert both arrays into strings and compare them
function arrayStringsAreEqual(word1, word2) {
  return word1.join("") === word2.join("");
}

console.log(arrayStringsAreEqual(["ab", "c"], ["a", "bc"])); //* true
console.log(arrayStringsAreEqual(["a", "cb"], ["ab", "c"])); //* false
console.log(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"])); //* true
console.log(arrayStringsAreEqual(["sonic"], [""])); //* false
console.log(arrayStringsAreEqual(["jas"], ["jes"])); //* false

//* Time: O(n + m) - We have to iterate through every character in every string in both arrays

//* Space: O(n + m) - Two strings of length n and m respectively are created
