//* Grab substrings from start to i + 1
//* i is initialized to "start"
//*     - It will increment whereas start stays static
//* For each call, generate a substring from start to i + 1
//*     - Check if that substring is a palindrome
//*     - If it is, explore the path
//*     - Else,  don't explore this path
function palindromePartitioning(s) {
  const results = [];
  backtrack(0, [], s, results);
  return results;
}

function backtrack(start, curr, s, results) {
  //* Base Case; there are no more indices
  if (start === s.length) {
    results.push([...curr]);
    return;
  }

  for (let i = start; i < s.length; i++) {
    //* "i" increases every iteration on this stack frame
    //* But "start" stays the same, so take substrings from start to i + 1
    const ss = s.substring(start, i + 1);

    if (isPalindrome(ss)) {
      curr.push(ss);
      backtrack(i + 1, curr, s, results); //* Can't reuse same index; pass i + 1
      curr.pop();
    }
  }
}

function isPalindrome(s) {
  for (let left = 0, right = s.length - 1; left < right; left++, right--) {
    if (s[left] !== s[right]) return false;
  }

  return true;
}

console.log(palindromePartitioning("aab"));
console.log(palindromePartitioning("avc"));
console.log(palindromePartitioning("aaaww"));
console.log(palindromePartitioning("aaaa"));

//* Time: O(n * 2^n) - Within each call to backtrack, we call isPalindrome()
//* isPalindrome takes O(n) to finish, so we do O(n) work within each call so far
//* At each step, we either create a substring or we don't (for each position)
//* There are 2^n - 1 substrings

//* Space: O(n * 2^n) - The depth of the recursion is at most "n"
//* In the worst case, we take singlular characters from each index
//* If we have a string like "aaaa", every substring is a palindrome
//* We create a substring for each call, which in the worst case, takes O(n) space
