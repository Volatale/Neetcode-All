//* Basically the same logic as Fibonacci
//!     - Except we have THREE numbers now

//! Recurrence Relation: F(n) = F(n - 1) + F(n - 2) + F(n-3)
function tribonacci(n) {
  function trib(n) {
    if (n === 0) return 0; //* 0th Trib = 0
    if (n === 1 || n === 2) return 1; //* 1st & 2nd Trib = 1
    if (n === 3) return 2; //* 3rd Trib = 2

    //* Return the sum of all three branches
    return trib(n - 1) + trib(n - 2) + trib(n - 3);
  }

  return trib(n);
}

console.log(tribonacci(3)); //* 4
console.log(tribonacci(4)); //* 4
console.log(tribonacci(5)); //* 7
console.log(tribonacci(25)); //* 1389537

//* Time: O(3^n) - Each call leads to three extra calls in the worst case
//* The depth of the recursion tree scales with "n" itself
//* In the worst case, we subtract 1 from "n" at each level, giving us a depth of "n"
//* Branching Factor ^ Depth of Tree = 3^n

//* Space: O(n) - The depth of the recursion tree scales with "n"
