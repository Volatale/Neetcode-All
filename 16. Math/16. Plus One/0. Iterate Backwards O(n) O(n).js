//* Iterate backwards, since that is how addition works
//* If the current digit is a 9, set it to 0
//* Otherwise, set it to digit[i] + 1
function plusOne(digits) {
  //* Iterate backwards since that is how addition works
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i] += 1;
      return digits; //* Add one to current digit
    } else {
      digits[i] = 0; //* Turn the 9 into a 0
    }
  }

  //* If ALL the digits were 9, we need to add a 1 to the start
  digits.unshift(1);
  return digits;
}

console.log(plusOne([1, 2, 3])); //* [1, 2, 4]
console.log(plusOne([4, 3, 2, 1])); //* [4, 3, 2, 2]
console.log(plusOne([9])); //* [10]
console.log(plusOne([1, 9, 9, 9, 9])); //* [2, 0, 0, 0, 0]

//* Time: O(n) - In the worst case, every digit is a 9, so we iterate through the entire array
//* Then, it takes O(1) to add a 1 to the start of the array

//* Space: O(n) - In the worst case, we need to add an extra digit to the input
