//* After we find 2 seats, we know the THIRD seat will allow us to split the range between seat 2 and 3
//*     - The range is given by the calculation [sets[i + 1] - seats[i]]
//* So we push every seat index to an array
//!     - If the number of seats is ODD, or there are less than 2, we have 0 valid ways
//* Start from seat 1 (because we then we KNOW we start from the second)
//*     - Seat[i+1] - seats[i] will tell us the number of dividers we can put within that range
//* Since this is combinatorial in nature, we multiply the number of ways as we go

//* Why does combinatorics work here?
//*     - We have several independent choices/events
//*         - Each section is formed by finding 2 seats and finding a third
//*         - Then, we can take the difference between the indices of seat 3 and seat 2 (1-indexed)
//*         - Each choice has 0 impact on the future choices, hence they are independent
//*     - The rule of product applies here
//*         - We want to take ALL of the possible ways
//*         - This is not a mutual exclusion scenario (take this OR that), which would mean applying the Rule of Sums)
function numberOfWays(corridor) {
  let seats = 0;
  let lastSeatIndex = -1;
  let dividers = 1;

  const MOD = 10 ** 9 + 7;

  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === "S") {
      seats++;

      //* Every THIRD seat means we can place a divider between seat seat 2 and 3
      if (seats > 2 && seats % 2 === 1) {
        dividers = (dividers * (i - lastSeatIndex)) % MOD;
      }

      lastSeatIndex = i;
    }
  }

  //* There must be an EVEN number of seats
  return seats % 2 === 0 && seats > 0 ? dividers : 0;
}

console.log(numberOfWays("SSSS")); //* 1
console.log(numberOfWays("P")); //* 0
console.log(numberOfWays("SSPPSPS")); //* 3
console.log(numberOfWays("PPSPSP")); //* 1
console.log(numberOfWays("SSSSS")); //* 0
console.log(numberOfWays("SSPPSSPSPSSS")); //* 6

//* Time: O(n) - We have to iterate through the entire array, which takes O(n)

//* Space: O(1) - We only use constant space variables
