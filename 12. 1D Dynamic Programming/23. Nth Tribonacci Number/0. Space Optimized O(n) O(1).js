//* Basically the same logic as Fibonacci
//!     - Except we have THREE numbers now
//* Look at the LAST THREE numbers instead of the last two

//! Recurrence Relation: F(n) = F(n - 1) + F(n - 2) + F(n-3)
//* We only need the three previous states
//*     - Instead of making an array of length n, use variables instead
function tribonacci(n) {
  if (n === 0) return 0; //* 0th Trib = 0
  if (n === 1 || n === 2) return 1; //* 1st & 2nd Trib = 1
  if (n === 3) return 2; //* 3rd Trib = 2

  let first = 0; //* F(n - 3)
  let second = 1; //* F(n - 2)
  let third = 1; //* F(n - 1)

  for (let i = 3; i <= n; i++) {
    //* F(n) = F(n - 1) + F(n - 2) + F(n-3)
    const fourth = first + second + third;
    first = second;
    second = third;
    third = fourth;
  }

  return third;
}

console.log(tribonacci(3)); //* 4
console.log(tribonacci(4)); //* 4
console.log(tribonacci(5)); //* 7
console.log(tribonacci(25)); //* 1389537
console.log(tribonacci(30)); //* 29249425
console.log(tribonacci(35)); //* 615693474

//* Time: O(n) - We have one non-constant parameter; "n" itself
//* We subtract 1, 2 and 3 from "n" at each step
//* So we only have ONE dimension to worry about

//* Space: O(1) - We use a constant amount of space
//* We optimized for space to eliminate the need for the DP array
