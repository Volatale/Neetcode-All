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

//* Follow-up
//* The main difference is that instead of a singular "s", we now have an string[] s
//* A Dynamic Programming could be possible, but since k >= 10^9, the DP array must be sized 10^9 + 1
//*     - Obviously that isn't really plausible since it would use too much memory
//* We already have a function that can determine whether "s" is a a subsequence of "t" in O(n) time
//* So all we have to do is call that function for each string in the string[] s
function isSubsequence(s, t) {
  function isSub(s, t) {
    //* A subsequence is not possible
    if (s.length > t.length) return false;

    //* s[left] tells us what character we need to find next in "t"
    let left = 0;

    //* Iterate over every character in "t" and try to find all characters in "s"
    for (let i = 0; i < t.length; i++) {
      if (t[i] === s[left]) {
        left++;
      }

      //* Early return; no point checking the rest of the characters
      if (left === s.length) return true;
    }

    //* If left === s.length, then "s" is a subsequence of "t"
    return left === s.length;
  }

  const subsequences = [];

  for (let string of s) {
    if (isSub(string, t)) {
      subsequences.push(string);
    }
  }

  return subsequences;
}

console.log(isSubsequence(["s", "w", "f", "x"], "swfx")); //* ["s", "w", "f", "x"]
console.log(isSubsequence(["sonic"], "sonic")); //* ["sonic"]
console.log(isSubsequence(["so", "i", "f"], "sonic")); //* ["so", "i"]
console.log(isSubsequence(["abc", "e", "q", "qwer"], "qwerty")); //* ["e", "q", "qwer"]

//* Time: O(k * t) - There are "k" potential subsequences, and in the worst case, it takes O(n) to check validity
//* We have to check the validity of each of the "k" strings, thus giving us O(k * t)

//* Space: O(k) - In the worst case, each of the "k" strings is a valid subsequence
//* So the subsequence array will have a size of "k"
