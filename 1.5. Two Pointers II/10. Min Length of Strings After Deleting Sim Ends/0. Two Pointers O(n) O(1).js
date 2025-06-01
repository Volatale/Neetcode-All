//* We are given a string consisting only of "a", "b" and "c"
//* The goal is to pick (non-empty) prefixes and suffixes of identical characters from both sides simultaneously
//* The characters used in the prefixes and suffixes must also not intersect in any order
//*     - In other words, we can't reuse characters/indices
//* After all of the conditions are met, we delete both the prefix and suffix
//* Keep repeating the process until no deletions are possible
//* Essentially, we need to compare characters from both ends simultaneously
//*     - A two pointer approach will help immensely
//! "Deletions" are handled by simply incrementing/decrementing the pointers
//* Since the goal is to "remove" as many characters as possible, we want to "maximize" the amount of characters deleted
//* Ultimately, that means we need to find as many duplicate characters as possible
//* To get the length of the final string, we can simply evaluate (right - left)
function minimumLength(s) {
  if (s.length <= 1) return s.length;

  //* Two pointers used to find prefix/suffix characters
  let left = 0;
  let right = s.length - 1;
  let char = "";

  while (left < right && s[left] === s[right]) {
    char = s[left]; //* Both pointers must point to this character

    //* Eliminate all of the duplicate characters
    while (left < right && s[left] === char) left++;
    while (left < right && s[right] === char) right--;
  }

  //* If s[left] !== char, then we know we didn't eliminate the entire string
  return s[left] === char ? 0 : right - left + 1;
}

console.log(minimumLength("aaaa")); //* 0
console.log(minimumLength("ca")); //* 2
console.log(minimumLength("cabaabac")); //* 0
console.log(minimumLength("aabccabba")); //* 3
console.log(minimumLength("w")); //* 1
console.log(minimumLength("")); //* 0
console.log(minimumLength("aa")); //* 0
console.log(minimumLength("cac")); //* 1

//* Time: O(n) - The time taken scales with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
