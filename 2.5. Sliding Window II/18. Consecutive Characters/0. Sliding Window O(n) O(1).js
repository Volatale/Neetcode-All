//* There is no need to actually track the unique characters within the substring, however
//! All we have to do is compare the ASCII char codes of the current and previous characters
//*     - If s[i-1].charCodeAt(0) !== s[i].charCodeAt(0), then they are not equal
//* Why does this work? Because each character maps to a unique char code (ASCII, Unicode Code Point etc)
//! We can use a sliding window / two pointers approach
//* If the substring s[i...j] is valid, then all of the characters are the same
//* How do we know if a substring is NOT valid?
//*     - If there exists more than 1 unique character within the substring
//! Since s[i...j] is valid, if the char code of j + 1 is NOT the same as the substring character's char codes
//* Then we know the window is invalid (the sliding window invariant has been broken)
//* Thus, we should SHRINK the window on the left until the invariant is once again upheld
//* However, if s[i...j] is valid, and s[i...j + 1] is invalid
//*     - There is no point in testing substrings WITHIN these bounds
//* We have no choice BUT to extend the substring to include s[j + 1]
//* And we already know all of the characters in the range s[i...j] are the same
//* Thus, the inclusion of s[j + 1] to that subarray means ALL of the subarrays s[i...j + 1] are implicitly invalid
//* So just SKIP all of those subarrays altogether
//*     - Thus, we can just say i = j
function maxPower(s) {
  //* A string that only has a length of 1 has a power of 1
  if (s.length <= 1) return s.length;

  let maxPower = 0;

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  while (end < s.length) {
    //* The sliding window invariant was broken (there exists > 1 unique character in the window)
    if (end > 0 && s[end - 1].charCodeAt(0) !== s[end].charCodeAt(0)) {
      start = end;
    }

    //* end - start + 1 gives us the length of the substring
    maxPower = Math.max(maxPower, end - start + 1);
    end++;
  }

  return maxPower;
}

console.log(maxPower("leetcode")); //* 2
console.log(maxPower("abcde")); //* 1
console.log(maxPower("wwwww")); //* 5
console.log(maxPower("abbcccddddeeeeedcba")); //* 5
console.log(maxPower("a")); //* 1
console.log(maxPower("xyxxy")); //* 2

//* Time: O(n^2) - We are generating every possible substring
//* There are (n * (n + 1) / 2) substrings in total

//* Space: O(1) - The memory usage remains constant regardless of input size
