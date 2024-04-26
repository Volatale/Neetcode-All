//* Use a set to track the number of unique elements
//* If the number of unique elements === 3 (chars.size === 3)
//* Then we know we have 3 different chars (a, b, c) in any permutation
//* bca === abc for this purpose, so we are essentially looking for anagrams
function numberOfSubstringsContainingThreeChars(s) {
  const chars = new Set();
  let substrings = 0;

  for (let i = 0; i <= s.length - 3; i++) {
    chars.clear();

    for (let j = i; j < s.length; j++) {
      chars.add(s[j]);

      //* Guaranteed to have {a, b, c} in some variation
      if (chars.size === 3) substrings++;
    }
  }

  return substrings;
}

console.log(numberOfSubstringsContainingThreeChars("abcabc")); //* 10
console.log(numberOfSubstringsContainingThreeChars("aabc")); //* 2
console.log(numberOfSubstringsContainingThreeChars("aaacb")); //* 3
console.log(numberOfSubstringsContainingThreeChars("abc")); //* 1
console.log(numberOfSubstringsContainingThreeChars("abcc")); //* 2

//* Time: O(n^2) - We have two nested for loops, both of which depend on the input size
//* It takes Θ(1) to clear the set, and Θ(1) time to add something to the set

//* Space: O(1) - There are only 3 characters that can possibly be added to the set
//* So the set can only contain at most 3 elements
//* O(3) -> O(1)
