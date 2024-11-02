//* In a brute force manner, we can go through the entire simulation
//* There are a total of "n" days to deposit on
//*     - Each iteration, we increment the day
//*     - If day is a multiple of 7, we need to subtract 6 from deposit
//*         - For example, if day is 7, deposit will be 8
//*         - We need to get back to 2 for the next week (starting at monday)
//*             - So we 8 - 6 = 2, which is exactly what the next monday's deposit will be
function totalMoney(n) {
  let day = 0;
  let deposit = 1;
  let result = 0;

  while (day < n) {
    result += deposit;
    deposit++; //* On the next day we deposit 1 more
    day++;

    //* Start of week: Go back to 1 more than what we started with
    if (day % 7 == 0) {
      deposit -= 6;
    }
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

//* Time: O(n) - The time taken to deposit everything scales with "n"
//* Each iteration, we increment the current day
//* The loop is only complete when day >= n

//* Space: O(1) - The space usage remains constant; we use the same amount of space regardless of input
