//* Expand outward from every index
//* Use the two pointer technique to compare both characters simultaneously

//* Palindromes can be odd or even length
//*     - So handle BOTH cases
//*     - For example, even though "abb" is an odd length palindrome
//*         - "bb" would not be found if we ONLY try the odd length
function countSubstrings(s) {
  let palindromes = 0;

  //* Expand from the center of every index
  for (let i = 0; i < s.length; i++) {
    palindromes += expandOutward(s, i, i);
    palindromes += expandOutward(s, i, i + 1);
  }

  return palindromes;
}

function expandOutward(s, left, right) {
  let palindromes = 0;

  //* Every time this loop activates we found a palindrome
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    palindromes++;
    left--;
    right++;
  }

  return palindromes;
}

console.log(countSubstrings("abc")); //* 3
console.log(countSubstrings("aaa")); //* 6
console.log(countSubstrings("abcde")); //* 5
console.log(countSubstrings("xxxxx")); //* 15
console.log(countSubstrings("abb")); //* 4

//* Time: O(n^2) - We use an O(n) for loop to get every index i from 0 to n - 1
//* Within each for loop, we perform an O(n) loop (in the worst case) to expand from the center

//* Space: O(1) - We only use a constant amount of space
