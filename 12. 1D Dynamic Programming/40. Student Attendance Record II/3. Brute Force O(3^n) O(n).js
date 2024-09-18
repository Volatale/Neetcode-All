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
function checkRecord(n) {
  function getAttendance(absences, latesInRow, length) {
    //* Only count eligible records
    if (length === n) {
      return absences < 2 && latesInRow <= 2 ? 1 : 0;
    }

    let ways = 0;

    //* At each level, try every possibility
    for (let choice of choices) {
      const newAbsenses = choice === "A" ? absences + 1 : absences;
      const newLates = choice === "L" ? latesInRow + 1 : 0;

      //* Apply pruning
      if (newAbsenses < 2 && newLates <= 2) {
        ways = (ways + getAttendance(newAbsenses, newLates, length + 1)) % MOD;
      }
    }

    return ways;
  }

  const MOD = 10 ** 9 + 7;
  const choices = ["A", "P", "L"];

  return getAttendance(0, 0, 0);
}

console.log(checkRecord(1)); //* 3
console.log(checkRecord(2)); //* 8
console.log(checkRecord(10101)); //* 183236316

//* Time: O(3^n) - Each call to getAttendance leads to 3 extra calls in the worst case
//* The depth of the recursion tree scales with "n" since we can only be "n" levels deep
//* Trying each possibility involves a for loop at each level of recursion, but this always loops 3 times
//* Hence it is "constant"

//* Space: O(n) - The space usage scales with "n" since that is the maximum depth of our recursion
