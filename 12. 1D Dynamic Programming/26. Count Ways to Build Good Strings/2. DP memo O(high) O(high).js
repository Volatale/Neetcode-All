//* We have two choices to make at each level of recursion
//*     - Append "zero" 0s
//*     - Append "ones" 1s
//! There is no need to actually use a string
//*     - Just track the LENGTH of what the string would be
//*     - If length > high, this is NOT a valid "good" string

//! Recurrence Relation: F(n) = F(n + zero) + F(n + ones)
//* Apply memoization to avoid redundant work
function countGoodStrings(low, high, zero, one) {
  function count(length, memo) {
    //* No longer a good string
    if (length > high) return 0;

    //* Utilize memoized value
    if (memo.hasOwnProperty(length)) return memo[length];

    let goodStrings = 0;

    //* Valid good string
    if (length >= low) goodStrings++;

    //* Case 1: Append zeroes
    if (length + zero <= high) {
      goodStrings += count(length + zero, memo);
    }

    //* Case 2: Append ones
    if (length + one <= high) {
      goodStrings += count(length + one, memo);
    }

    return (memo[length] = goodStrings % (10 ** 9 + 7));
  }

  return count(0, {}) % (10 ** 9 + 7);
}

console.log(countGoodStrings(3, 3, 1, 1)); //* 8
console.log(countGoodStrings(1, 1, 1, 1)); //* 2
console.log(countGoodStrings(2, 3, 1, 2)); //*  5

//* Time: O(high) - We are memoizing the results of each subproblem
//* Whenever we find a valid substring, we technically find TWO of them
//* So we only have to memoize based on the length (which ranges from 0 to high inclusive)
//* If we traveled along the "zero" path (at the top level), the "one" path will have the same result

//* Space: O(high) - The depth of the recursion tree scales with "high"
//* There are "high" ranges (0 to high inclusive)
