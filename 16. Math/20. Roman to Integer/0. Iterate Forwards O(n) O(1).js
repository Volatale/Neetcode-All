//* Iterate FORWARDS and perform a lookahead
//* If the NEXT character is SMALLER than the current
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

  let sum = 0;

  for (let i = 0; i < s.length; i++) {
    //* In cases like "IV", we need to subtract one, and add five
    if (i + 1 < s.length && roman[s[i]] < roman[s[i + 1]]) {
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
