//* In a brute force manner, generate every substring
//* For every substring, check if it is a palindrome
//* If it is, increment palindromes
function countSubstrings(s) {
  let palindromes = 0;

  //* Generate every possible substring; check if it is a palindrome
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const substring = s.substring(i, j + 1);

      if (isPalindrome(substring)) {
        palindromes++;
      }
    }
  }

  return palindromes;
}

function isPalindrome(s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }

  return true;
}

console.log(countSubstrings("abc")); //* 3
console.log(countSubstrings("aaa")); //* 6
console.log(countSubstrings("abcde")); //* 5
console.log(countSubstrings("xxxxx")); //* 15
console.log(countSubstrings("abb")); //* 4
