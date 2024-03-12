//* Left tracks "s" position
//* LeftII tracks "t" position
//* If s[left] === t[leftII], then you found a match (so we can look for a new character in s) -> increment
//* Regardless, t increments each iteration
//* If left === s.length, that means either left reached the end first, or at the same time as leftII
function isSubsequence(s, t) {
  if (t.length < s.length) return false;

  let left = 0; //* "s" pointer
  let leftII = 0; //* "t" pointer

  while (left < s.length && leftII < t.length) {
    if (s[left] === t[leftII]) {
      //* Found a match
      left++;
    }

    leftII += 1;
  }

  //! If this ISN'T the case, then pointer II finished earlier
  //! This signals that
  return left === s.length;
}

console.log(isSubsequence("abc", "abc")); // true
console.log(isSubsequence("abc", "aebc")); // true
console.log(isSubsequence("abc", "aaabc")); // true
console.log(isSubsequence("xyz", "xy")); // false
console.log(isSubsequence("sonic", "xsoaxnlioc")); // true
console.log(isSubsequence("a", "a")); // true

//* Time: O(n) - The time taken scales with the size of the longest input

//* Space: O(1) - No extra auxilary space is used at all, just two constant space variables
