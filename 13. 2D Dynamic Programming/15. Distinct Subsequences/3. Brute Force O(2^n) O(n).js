//* Our goal is to use characters in "s" to reach the end of "t"
//* At each step, we can either include or exclude the current character
//* When we match every character in "t"
//*     - If we also reached the end of "s", then we found a valid subsequence
function numDistinct(s, t) {
  function findSubsequences(i, j) {
    //* Base Case: "i" is our boundary
    if (i === s.length) {
      return j === t.length ? 1 : 0;
    }

    let ways = 0;

    //* Case 1: Include current character (characters match)
    if (j < t.length && s[i] === t[j]) {
      ways += findSubsequences(i + 1, j + 1);
    }

    //* Case 2: Exclude current character
    ways += findSubsequences(i + 1, j);

    return ways;
  }

  //* There aren't enough characters to find a valid subsequence
  if (s.length < t.length) return 0;

  return findSubsequences(0, 0);
}

console.log(numDistinct("aa", "a")); //* 2
console.log(numDistinct("rabbbit", "rabbit")); //* 3
console.log(numDistinct("babgbag", "bag")); //* 5
console.log(numDistinct("xyz", "abc")); //* 0
console.log(numDistinct("battle", "batle")); //* 2
console.log(numDistinct("fifjawhiadaskldskkslkdl", "fwhiadsldkl")); //* 10
console.log(
  numDistinct(
    "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm",
    "qrt"
  )
); //* 56

//* Time: O(2^n) - At each step, we can either include or exclude the current character
//* The height of the recursion tree scales with "n" (s.length)

//* Space: O(n) - The height of the recursion tree scales with "s.length" (n)
