//* Instead of dealing with positive vs negative integers
//*     - We can preserve the parity of "x" immediately
//*     - Get the absolute value of "x" so we only have to deal with positive numbers
//*     - Then, convert the number back to its original parity at the end
//* num = num * 10 + digit
//*     - This is the formula we can use to handle the place value digit by digit
//* The main issue is that we need to deal with potential overflows
//* 10 * digit may make "num" overflow
//* So we get rid of the last digit and check if num is greater than (2 ** 31 - 1) / 10
//*     - If it is, then adding this final digit will guarantee an overflow
//*     - So we should return 0
//* To get the last digit, we can use (x % 10)
//* We can use x = Math.floor(x / 10)
//*     - This knocks off the final digit
//*     - But remember to floor the result, we are working with INTEGERS
function reverse(x) {
  const INT_MAX = 2 ** 31 - 1; //* 2,147,483,647
  const sign = Math.sign(x); //* Preserve the sign of x
  let num = 0;

  x = Math.abs(x); //* Convert the value to negative if needed later on

  while (x !== 0) {
    const digit = x % 10; //* Get the last digit
    x = Math.floor(x / 10); //* Remove the last digit from x

    //! Check for overflows BEFORE updating num
    //* Case 1: A multiplication by 10 would result in an overflow
    //* Case 2: If INTMAX = 44 and we have 4, then digit > 5 = overflow
    if (
      num > Math.floor(INT_MAX / 10) ||
      (num === INT_MAX && digit > INT_MAX % 10)
    ) {
      return 0;
    }

    //* Calculate next place value
    num = num * 10 + digit;
  }

  //* Apply the original sign
  return num * sign;
}

console.log(reverse(123)); //* 321
console.log(reverse(-123)); //* -321
console.log(reverse(120)); //* 21
console.log(reverse(9999)); //* 9999
console.log(reverse(150000)); //* 51
console.log(reverse(0)); //* 0

//* Time: O(d) or O(1) - The number of iterations scales with the number of digits in the input
//* The number of iterations is always going to be between [0, 32], so we could also say O(1)

//* Space: O(1) - We are not using any additional space that will scale with input size
