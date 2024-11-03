//* Instead of using a brute force approach, we can apply a mathematical approach
//* The sum of an entire week (at base rate) is:
//*     - 1 + 2 + 3 + 4 + 5 + 6 + 7 -> Week 1
//*     - 2 + 3 + 4 + 5 + 6 + 7 + 7 -> Week 2
//*     - 3 + 4 + 5 + 6 + 7 + 8 + 9 -> Week 3
//*     - 4 + 5 + 6 + 7 + 8 + 9 + 10 -> Week 4
//! We can apply the arithmetic series formula to caclulate the amount we need to deposit per week
//* Get the total number of COMPLETE weeks we can do (Math.floor(n / 7))
//* Then, get the amount we can get deposit in ONE week (at the base rate)
//*     - Low = 28
//* Get the amount we get from the other weeks
//*     - High = 28 + 7 * (weeks - 1)
//*         - 1 entire week is 28, and there are 7 days in a week
//*         - Then, weeks - 1 is used because we already calculated for the FIRST week
//* Now, we have the low and high boundaries for the arithmetic series formula
//*     - Math.flor((weeks * (low + high)) / 2)
//*     - This gives us the total amount we can get from the complete weeks
//* Finally, we have a remaining number of days (n % 7)
//*     - Perform a loop and add the remaining deposits
//*     - weeks + 1 is used because these deposits take place within the NEXT week
function totalMoney(n) {
  const weeks = Math.floor(n / 7); //* Number of FULL completed weeks
  const daysLeft = n % 7; //* Number of remaining days

  const low = 28; //* 1 Week Sum
  const high = 28 + 7 * (weeks - 1); //* Week "n" sum (subtract 1 because that has been counted)

  //* Gauss' Formula
  let result = Math.floor((weeks * (low + high)) / 2);

  //* Deposit the money for the remaining days
  for (let i = 0; i < daysLeft; i++) {
    result += i + (weeks + 1); //* Weeks + 1 because this is the NEXT week after
  }

  return result;
}

console.log(totalMoney(4)); //* 10
console.log(totalMoney(7)); //* 28
console.log(totalMoney(8)); //* 30
console.log(totalMoney(10)); //* 37
console.log(totalMoney(20)); //* 96
console.log(totalMoney(21)); //* 105
console.log(totalMoney(23)); //* 114

//* Time: O(1) - It takes O(1) to calculate the sum for the first "n" full weeks
//* Then we do AT MOST 6 iterations to calculate the extra days

//* Space: O(1) - The space usage remains constant; we use the same amount of space regardless of input
