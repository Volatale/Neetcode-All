//* Basically the same logic as Fibonacci
//!     - Except we have THREE numbers now

//! Recurrence Relation: F(n) = F(n - 1) + F(n - 2) + F(n-3)
//* Apply memoization to avoid redundant work
function tribonacci(n) {
  function trib(n, memo) {
    if (n === 0) return 0; //* 0th Trib = 0
    if (n === 1 || n === 2) return 1; //* 1st & 2nd Trib = 1
    if (n === 3) return 2; //* 3rd Trib = 2

    //* Utilize memoized value
    if (memo.hasOwnProperty(n)) return memo[n];

    //* Return the sum of all three branches
    return (memo[n] =
      trib(n - 1, memo) + trib(n - 2, memo) + trib(n - 3, memo));
  }

  return trib(n, {});
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

//* Space: O(n) - The depth of the recursion tree scales with "n"
//* In the worst case, there are "n" keys/values stored in the memo object
