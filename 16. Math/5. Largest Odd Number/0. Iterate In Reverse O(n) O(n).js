//* If we search the string from right to left
//*     - We guarantee that we see the larger numbers first
//* Searching left to right means there is no guarantee that THIS odd is the largest
//* For example, take "42329"
//*     - "3" is odd, so "423" is ALSO odd
//*         - But we can't immediately return yet; "42329" is ALSO odd
//*     - "9" is idd, so now we have "42329" as the final result
//* Since substring() takes O(n) in the worst case
//*     - If we had an input like "33333", we would need to create "n" substrings
function largestOddNumber(num) {
  //* The entire number is odd
  if (num[num.length - 1] % 2 === 1) return num;

  //* Search from right to left; return immediately on finding an odd
  for (let i = num.length - 1; i >= 0; i--) {
    if (num[i] % 2 === 1) return num.substring(0, i + 1);
  }

  //* Found no odd numbers
  return "";
}

console.log(largestOddNumber("52")); //* 5
console.log(largestOddNumber("4206")); //* ""
console.log(largestOddNumber("35427")); //* "35427"
console.log(largestOddNumber("42229")); //* "42229"
console.log(largestOddNumber("3810")); //* "381"
console.log(largestOddNumber("101")); //* "101"

//* Time: O(n) - We iterate through the entire input in reverse
//* And if we find an odd character, we immediately create a substring (of up to n length)
//* In the worst case, the time complexity ends up being O(n) + O(n)

//* Space: O(n) - In the worst case, we create a substring that has an equivalent length to num (O(n))
