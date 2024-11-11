//* Iterate BACKWARDS and perform a lookahead
//* If the CURRENT character is SMALLER than the previous (i + 1)
//*     - Then we need to subtract the current value from the sum
//* Otherwise, add the current value to the sum
function romanToInt(s) {
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  //* Start the sum using the last character
  let sum = 0;

  //* Iterate from right to left and perform a lookup
  for (let i = s.length - 1; i >= 0; i--) {
    //* In cases like "IV", we need to subtract one, and add five
    if (i < s.length && roman[s[i]] < roman[s[i + 1]]) {
      sum -= roman[s[i]];
    } else {
      sum += roman[s[i]];
    }
  }

  return sum;
}

console.log(romanToInt("III")); //* 3
console.log(romanToInt("LVIII")); //* 58
console.log(romanToInt("MCMXCIV")); //* 1994
console.log(romanToInt("CMXCVIII")); //* 998

//* Time: O(n) - It takes O(n) to iterate through the entire string
//* Addition and subtraction both take constant time

//* Space: O(1) - There are only 7 unique characters for us to worry about
