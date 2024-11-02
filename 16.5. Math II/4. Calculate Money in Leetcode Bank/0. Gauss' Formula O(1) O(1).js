//* In a brute force manner, we can go through the entire simulation
//* There are a total of "n" days to deposit on
//*     - Each iteration, we increment the day
//*     - If day is a multiple of 7, we need to subtract 6 from deposit
//*         - For example, if day is 7, deposit will be 8
//*         - We need to get back to 2 for the next week (starting at monday)
//*             - So we 8 - 6 = 2, which is exactly what the next monday's deposit will be
function totalMoney(n) {
  const weeks = Math.floor(n / 7); //* Number of FULL completed weeks
  const low = 28; //* 1 Week Sum
  const high = 28 + 7 * (weeks - 1); //* Week "n" sum (subtract 1 because that has been counted)

  //* Gauss' Formula
  let result = Math.floor((weeks * (low + high)) / 2);

  //* Deposit the money for the remaining days
  for (let i = 0; i < n % 7; i++) {
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
