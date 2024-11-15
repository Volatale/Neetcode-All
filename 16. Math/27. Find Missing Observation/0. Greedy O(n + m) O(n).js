//* We are given the MEAN, and the TOTAL number of rolls (n + m)
//! We DON'T know what the SUM of the rolls is
//* mean = sum of rolls / total rolls (n + m)
//* So we can REARRANGE THE FORMULA
//*     - Sum of rolls = mean * (n + m)
//* Then, we subtract the sum of the "m" rolls from the total sum
//*     - This gives us the total of the "n" missing rolls
//! If missingSum / n > 6, there aren't enough slots in the array
//! If missing sum < n, the missing sum isn't large enough to split into "n" rolls
//*     - Some of the rolls will inevitably be 0, which is an invalid roll
//* Lastly, we can answer the "queries"
//* There could be MULTIPLE possible answers; we don't care which we get as long as its correct
//* Greedily choose the largest number for each roll
//*     - But ensure that we have enough left over for the rest of the numbers
//* Math.min(6, missingSum - n + 1)
//*     - 6 is the largest number we can roll (our maximum)
//*     - missingSum - n + 1 gives us the largest number we can put in this position
//*         - missingSum - n tells us how much is left over after this
//*         - + 1 is used to account for THIS roll
function missingRolls(rolls, mean, n) {
  const m = rolls.length;

  const results = [];

  //* Total POSSIBLE sum of "m + n" rolls given the mean
  const totalSum = mean * (m + n);

  //* Subtract the usm of rolls from the total possible sum (to get the sum of the "n" rolls)
  let missingSum = totalSum - rolls.reduce((acc, curr) => acc + curr, 0);

  //* Either the missing amount is too large (such that there aren't enough slots)
  //* Or, the sum isn't large enough to split into n rolls AND still create the missing sum (some rolls = 0)
  if (missingSum > 6 * n || missingSum < n) {
    return [];
  }

  //* Greedily choose the highest number that leaves enough leftover for the next rolls (minimize maximium per roll)
  while (n !== 0) {
    const dice = Math.min(6, missingSum - n + 1); //* 6 is max per slot, + 1 to account for THIS slot
    results.push(dice);
    missingSum -= dice;
    n--; //* We have one less slot to fill
  }

  return results;
}

console.log(missingRolls([3, 2, 4, 3], 4, 2)); //* [6, 6]
console.log(missingRolls([1, 5, 6], 3, 4)); //* [2, 3, 2, 2]
console.log(missingRolls([1, 2, 3, 4], 6, 4)); //* []
console.log(missingRolls([3, 5, 3], 5, 3)); //* []

//* Time: O(n + m) - It takes O(m) to calculate the sum of the "m" rolls
//* Then, it takes O(n) to fill the the results array (n is decremented by 1 each iteration)

//* Space: O(n) - We use O(n) space since the results array uses "n" space
