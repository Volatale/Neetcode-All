//* Addition is made up using two components
//*     - The addition itself (without the carry)
//*     - And the carry itself (handling the overflow per digit)
//* We cannot use the addition operator, so we have to handle it the same way CPUs do
//!     - Using Bit Manipulation
//* Lets say we have the following numbers
//*     - A = 011 = 3
//*     - B = 010 = 2
//* Naturally, 3 + 2 = 5, but once again, we cannot use the addition operator
//* So we need to handle it using bitwise operators instead
//* It just so happens that we have 2 operators that handle BOTH components of addition separately
//!     - XOR handles the addition itself, due to the following:
//*         - 0 + 0 = 0
//*         - 0 + 1 = 1
//*         - 1 + 0 = 1
//*         - 1 + 1 = 0
//!     - While AND handles the carry
//*         - The ONLY situation where a carry occurs is (1 + 1)
//*         - And we know that 1 & 1 = 1
//* Due to how carries work, we need to left shift by 1 spot
//*     - The number is moved to the NEXT column over
//* Putting everything together:
//*     - ADDITION: 3 ^ 2 = 1
//*     - CARRY: 3 & 2 = 2
//*         - 2 << 1 = 4
//* Then, we simply add both components
//*     - 1 + 4 = 5
function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1; //* Carry if 1 + 1 in this position; but it is applied to NEXT digit
    a = a ^ b; //* a ^ b is essentially ADDITION, but without the carry (which we have above)
    b = carry; //* Update b to carry for next iteration
  }

  return a;
}

console.log(getSum(1, 2)); //* 3
console.log(getSum(2, 3)); //* 5
console.log(getSum(16, 19)); //* 35
console.log(getSum(0, 0)); //* 0
console.log(getSum(-2, 3)); //* 1

//* Time: O(1) - There will only ever be (at most) 32 iterations

//* Space: O(1) - We are not using any additional space that will scale with input size
