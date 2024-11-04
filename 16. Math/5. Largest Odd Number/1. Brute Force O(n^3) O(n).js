//* In a brute force manner, try every possible substring
//* If it is odd and also larger than the previously found odd number
//*     - Then THIS newly found odd number becomes our "best" result
function largestOddNumber(num) {
  //* The entire number is odd
  if (num[num.length - 1] % 2 === 1) return num;

  let largestOdd = 0;

  for (let i = 0; i < num.length; i++) {
    for (let j = i; j <= num.length; j++) {
      const substring = num.substring(i, j);
      const value = parseInt(substring) || 0; //* "" turns into NaN

      //* Found a larger odd number
      if (value % 2 === 1 && value > largestOdd) {
        largestOdd = value;
      }
    }
  }

  //* Convert largest (odd) number to string at the end
  return largestOdd > 0 ? largestOdd.toString(10) : "";
}

console.log(largestOddNumber("52")); //* 5
console.log(largestOddNumber("4206")); //* ""
console.log(largestOddNumber("35427")); //* "35427"
console.log(largestOddNumber("42229")); //* "42229"
console.log(largestOddNumber("3810")); //* "381"
console.log(largestOddNumber("101")); //* "101"

//* Time: O(n^3) - We have two nested loops, both of which scale with the length of the input
//* Within the innermost loop, we create a string, which takes O(k), but can be O(n) in the worst case

//* Space: O(n) - In the worst case, we create a substring that has an equivalent length to num (O(n))
