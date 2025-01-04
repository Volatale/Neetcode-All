//* In a brute force manner, try bitwise ANDing every number in the range
//* Start with AND = left
//!     - If you initialize AND to 0, then it will never be able to become anything other than 0
function rangeBitwiseAnd(left, right) {
  //* If AND stats at 0, it will never become anything else
  let AND = left;

  //* Start from left + 1 since left has been counted
  for (let i = left + 1; i <= right; i++) {
    AND &= i;
  }

  return AND;
}

console.log(rangeBitwiseAnd(5, 7)); //* 4
console.log(rangeBitwiseAnd(0, 0)); //* 0
console.log(rangeBitwiseAnd(1, 2147483647)); //* 0
console.log(rangeBitwiseAnd(0, 10)); //* 0
console.log(rangeBitwiseAnd(5, 50)); //* 0

//* Time: O(n) - We AND left with every possible number in the range [left + 1, right]

//* Space: O(1) - The space used does not scale with the input(s)
