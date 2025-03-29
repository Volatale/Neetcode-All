function largestGoodInteger(num) {
  //* There aren't three characters
  if (num.length < 3) return "";

  let digit = 0; //* Largest triplet digit found
  let found = false; //* Helps handle "000" case

  for (let i = 2; i < num.length; i++) {
    //* Ensure all three adjacent characters match
    if (num[i - 2] === num[i - 1] && num[i - 1] === num[i]) {
      digit = Math.max(digit, parseInt(num[i]));
      found = true;
    }
  }

  //* Repeat the digit 3 times if we found a good string, and return "" otherwise
  return digit === 0 && !found ? "" : digit.toString().repeat(3);
}

console.log(largestGoodInteger("6777133339")); //* "777"
console.log(largestGoodInteger("2399918")); //* "999"
console.log(largestGoodInteger("3222444555888")); //* "888"
console.log(largestGoodInteger("42352338")); //* ""
console.log(largestGoodInteger("230001119")); //* "111"
console.log(largestGoodInteger("000")); //* "000"

//* Time: O(n) - We iterate through the entire string once
//* At the end, turning digit into a string takes O(1), then repeat takes O(3), so both are constant

//* Space: O(1) - The frequency map and set cannot store more than 3 characters each
//* And the string(s) created via substring() will always be of length 3
