//* After we find 2 seats, we know the THIRD seat will allow us to split the range between seat 2 and 3
//*     - The range is given by the calculation [sets[i + 1] - seats[i]]
//* So we push every seat index to an array
//!     - If the number of seats is ODD, or there are less than 2, we have 0 valid ways
//* Start from seat 1 (because we then we KNOW we start from the second)
//*     - Seat[i+1] - seats[i] will tell us the number of dividers we can put within that range
//* Since this is combinatorial in nature, we multiply the number of ways as we go
function numberOfWays(corridor) {
  const seats = [];
  let dividers = 1;

  const MOD = 10 ** 9 + 7;

  //* Get the indices for every seat
  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === "S") {
      seats.push(i);
    }
  }

  //* We don't have any valid combinations (not enough seats, or an odd number)
  if (seats.length < 2 || seats.length & 1) return 0;

  //* Calculate the difference between every seat
  for (let i = 1; i < seats.length - 1; i += 2) {
    dividers = (dividers * (seats[i + 1] - seats[i])) % MOD;
  }

  return dividers;
}

console.log(numberOfWays("SSSS")); //* 1
console.log(numberOfWays("P")); //* 0
console.log(numberOfWays("SSPPSPS")); //* 3
console.log(numberOfWays("PPSPSP")); //* 1
console.log(numberOfWays("SSSSS")); //* 0

//* Time: O(n) - We have to iterate through the entire array twice in the worst case
//* Once to get the seat indices and the second to calculate how many dividers to place within each range

//* Space: O(n) - In the worst case, everything is a seat
