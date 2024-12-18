//* Use a set to track the unique characters we have found
//* If we have already found that character, remove it from the set
//* Otherwise, add it to the set
//* For example, "aba", if we were going all the way from i = 0, to j = 2
//*     - We would only have {"b"} in the set because the "a"s cancel out
//! The above reasoning also works for bit manipulation
//*     - So that would be a valid optimization
function wonderfulSubstrings(str) {
  let substrings = 0;

  for (let i = 0; i < str.length; i++) {
    const letters = new Set();

    //* Add character is if it is unique, and remove it otherwise
    for (let j = i; j < str.length; j++) {
      if (letters.has(str[j])) {
        letters.delete(str[j]);
      } else {
        letters.add(str[j]);
      }

      //* At MOST one (can be either 0 or 1) character should be in the set
      if (letters.size <= 1) {
        substrings++;
      }
    }
  }

  return substrings;
}

console.log(wonderfulSubstrings("aba")); //* 4
console.log(wonderfulSubstrings("aabb")); //* 9

//* Time: O(n^2) - We have a nested for loop, because we need to check every possible substring

//* Space: O(n)  - In the worst case, every character is unique, but there are only 10 different characters
//* So in reality, the space usage is capped at O(10)
