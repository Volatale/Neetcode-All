//* A subsequence is just a subset, but we retain the relative ordering of the elements
//*     - In this case, it means we can't take characters OUT of order
//*     - Therefore, this means we can't sort/manipulate the order of any characters
//* At each step, either include or exclude the current character
//*     - We can only include if the absolute difference of the alphabet order is <= k
//* We have no heuristic that we can use to influence our decision to make better choices
//*     - So we need to try every possible subsequence (brute force)
function longestIdealString(s, k) {
  function findString(i, prevVal) {
    let longest = 0;

    //* Case 1: Include current character
    const charValue = s[i].charCodeAt(0) - 97 + 1; //* Ascii to Alphabet
    const diff = Math.abs(prevVal - charValue);

    if (diff <= k) {
      //* Add one to include THIS character
      longest = Math.max(longest, findString(i + 1, charValue) + 1);
    }

    //* Case 2: Exclude current character

    longest = Math.max(longest, findString(i + 1, prevVal));

    return longest;
  }

  //* Minimum s length is 1
  if (k === 0) return 1;

  return findString(0, 0);
}

console.log(longestIdealString("abc", 3)); //* 3
console.log(longestIdealString("wwwwww", 0)); //* 1
console.log(longestIdealString("acfgbd", 2)); //* 4
console.log(longestIdealString("adg", 3)); //* 3

//* Time: O(2^n) - We can either include or exclude each character
//* There are "n" characters we have to make these decisions for

//* Space: O(n) - The height of the recursion tree scales with the size of "s"
//* The alphabet array uses O(26) space, but that is effectively constant space usage
