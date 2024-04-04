//* We need to track unique palindromes, so use a set
//* This requires 3 loops, one for the leftmost character, one for the middle character (for the subsequence)
//* And one more loop for everything else
//* A string builder is used because we need to test candidates (similar to backtracking)
//* After testing completely, we need to pop to get ready for the next character
function uniquePalindromes(s) {
  const set = new Set();

  for (let i = 0; i < s.length; i++) {
    const myStr = [s[i]];

    for (let j = i + 1; j < s.length; j++) {
      myStr.push(s[j]);

      for (let k = j + 1; k < s.length; k++) {
        myStr.push(s[k]);

        const candidate = myStr.join("");
        if (isPalindrome(candidate)) set.add(candidate);

        myStr.pop();
      }

      myStr.pop();
    }
  }

  return set.size;
}

function isPalindrome(s) {
  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] !== s[s.length - 1 - i]) return false;
  }

  return true;
}

console.log(uniquePalindromes("aabca")); //* 3
console.log(uniquePalindromes("adc")); //* 0
console.log(uniquePalindromes("bbcbaba")); //* 4

//* Time: O(n^3) - We have 3 nested for loops, all of which depending on the length of the input

//* Space: O(n) - If there are "n" unique palindromes, the size of the set would be "n" too
//* We continually create temporary substrings to generate candidates that are used for palindrome testing
//* The worst case scenario would be storing the entire string within the myStr array
