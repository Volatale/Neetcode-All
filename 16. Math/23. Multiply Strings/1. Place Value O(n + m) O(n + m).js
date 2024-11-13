//* Calculate the place value of each string
//* Then multiply the values together
//* Finally, convert the result into a string
//! Doesn't work
function multiply(num1, num2) {
  let val1 = 0;
  let val2 = 0;

  //* Calculate the place value for num1
  for (let i = 0; i < num1.length; i++) {
    val1 = val1 * 10 + parseInt(num1[i]);
  }

  //* Calculate the place value for num2
  for (let j = 0; j < num2.length; j++) {
    val2 = val2 * 10 + parseInt(num2[j]);
  }

  //* Return the result as a string
  return String(val1 * val2);
}

console.log(multiply("2", "3")); //* 6
console.log(multiply("123", "456")); //* "56088"
console.log(multiply("35", "273")); //* "9555"
console.log(multiply("1000", "52")); //* "52000"

//* Time: O(n + m) - The time taken scales with the length of both input strings

//* Space: O(n + m) - The output string has a length equal to the sum of lengths of both inputs
