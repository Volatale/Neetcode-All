//* Use a set to track the number of distinct chars
//* The set also tells us what characters we already have
//* Test every substring, which takes O(n^2) time complexity
function longestSubstringWithAtMostTwoDistinctChars(s) {
  const distincts = new Set();
  let maxLength = 0;

  for (let i = 0; i < s.length; i++) {
    distincts.clear();
    let length = 0;

    for (let j = i; j < s.length; j++) {
      if (distincts.has(s[j])) {
        length++;
      } else if (distincts.size < 2) {
        distincts.add(s[j]);
        length++;
      } else {
        break;
      }
    }

    maxLength = Math.max(maxLength, length);
  }

  return maxLength;
}

console.log(longestSubstringWithAtMostTwoDistinctChars("eceba")); //* 3
console.log(longestSubstringWithAtMostTwoDistinctChars("ccaabbb")); //* 5
console.log(longestSubstringWithAtMostTwoDistinctChars("xyze")); //* 2
console.log(longestSubstringWithAtMostTwoDistinctChars("o")); //* 1

//* Time: O(n^2) - We have nested loops, both of which depend on "n" (s.length)
//* It takes O(1) time to clear the set, and it takes Θ(1) to add to the set on average

//* Space: O(1) - The set can only contain 2 elements at most
//* But O(2) simplifies to O(1) in Big O Notation since we drop constants
