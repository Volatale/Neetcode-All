//* We need to count the number of ways to do something
//!     - So this is a combinatorics problem
//*     - Combinatorics usually involves straight Math, Brute Force, or Dynamic Programming
//* There are 3 possibilities
//*     - Try all of them at each level
//* The depth of our recursion scales with the input "n"
//*     - We cannot have a record longer than "n", so this is our base case

//* If we find an "A", the state becomes absences + 1
//*     - Otherwise, retain the same number of absences
//* If we find an "L", the state becomes latesInRow + 1
//*     - Otherwise, reset lates to 0 since we BROKE the streak

//! TLE
//* Apply memoization to avoid redundant work
function checkRecord(n) {
  function getAttendance(absences, latesInRow, length, memo) {
    //* Only count eligible records
    if (length === n) return 1;

    //* Utilize memoized value
    const key = `${absences}-${latesInRow}-${length}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let ways = 0;

    //* At each level, try every possibility
    for (let choice of choices) {
      const newAbsenses = choice === "A" ? absences + 1 : absences;
      const newLates = choice === "L" ? latesInRow + 1 : 0;

      //* Apply pruning
      if (newAbsenses < 2 && newLates <= 2) {
        ways =
          (ways + getAttendance(newAbsenses, newLates, length + 1, memo)) % MOD;
      }
    }

    return (memo[key] = ways);
  }

  if (n === 0) return 1;

  const MOD = 10 ** 9 + 7;
  const choices = ["A", "P", "L"];

  return getAttendance(0, 0, 0, {});
}

console.log(checkRecord(1)); //* 3
console.log(checkRecord(2)); //* 8
console.log(checkRecord(5)); //* 8
console.log(checkRecord(9)); //* 1753
console.log(checkRecord(10101)); //* 183236316
console.log(checkRecord(99996)); //* 555387871

//* Time: O(n) - There are 2 possible values for absences (0, 1), anything more is invalid
//* There are 3 possible values for latesInRow (0, 1, 2), anything more is invalid
//* There are n possibilities for "length"
//* Within each call, we have a for loop that always does 3 iterations (but that is constant)
//* Unique states = (2 x 3 * n) = O(n)

//* Space: O(n) - The space usage scales with "n" since that is the maximum depth of our recursion
//* Each unique state is only computed once due to memoization, the calculation is the same
