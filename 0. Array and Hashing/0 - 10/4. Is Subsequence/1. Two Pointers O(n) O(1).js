//* A subsequence implies we we can SKIP / DELETE some characters
//* But we need to ensure the relative order is maintained (i.e. we can't sort or rearrange s or t)
//* Since the relative ordering is important, we can iterate from the left
//! In a brute force manner, we COULD generate every possible subsequence of "t"
//*     - But the time complexity of that is O(n^3), even with Dynamic Programming
//* Instead, we can just use a Two Pointers approach
//* We know there are s.length characters to find
//* And we also know the relative ordering is important
//* So simply iterate through "t" and try to find each of the characters that exist in "s"
//* Increment the pointer that is tracking "s" every time we successfully find the current character
//* Since we need to find s.length characters
//*     - If "left" ever equals s.length, we know we have successfully found every character
//*     - Thus, we simply return true
//* If at the end, left !== s.length
//*     - Then we DIDN'T find every character that exists in "s" within "t"
//*     - Therefore we know that "s" does not exist as a subsequence within "t"
//*     - Return false
function isSubsequence(s, t) {
  //* There is no way "s" is a subsequence of "t" if s.length > t.length
  if (s.length > t.length) return false;

  //* Used to track progress through "s"
  let left = 0;

  //* Iterate through "t" and increment "left" when we find matching characters
  for (let i = 0; i < t.length; i++) {
    if (s[left] === t[i]) {
      left++;
    }

    //* Early return (no point checking the rest of the characters)
    if (left === s.length) return true;
  }

  //* If this is true, then "s" is a subsequence of "t"
  return left === s.length;
}

console.log(isSubsequence("abc", "ahbgdc")); //* True
console.log(isSubsequence("axc", "ahbgdc")); //* false
console.log(isSubsequence("ace", "abcde")); //* True
console.log(isSubsequence("ed", "abcde")); //* False
console.log(isSubsequence("w", "sonic")); //* False (t.length > s.length)
console.log(isSubsequence("i", "sonic")); //* True
console.log(isSubsequence("", "")); //* True
console.log(isSubsequence("", "a")); //* True

//* Time: O(n) - In the worst case, "s" is not a subsequence of "t", which means checking every character

//* Space: O(1) - The memory usage remains constant regardless of input size
