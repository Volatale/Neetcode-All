//* Use Dynamic Programming
//* Lets say we have the number "3"
//*     - In binary, that is "011"
//* But if we take a look at "6"
//*     - That would be "110" in binary
//* So we can get to 3 from 6 by right shifting by 1 bit position
//! Another observation is that the number of set bits is the same in both numbers
//* 14 is "1110" and 7 is "0111"
//*     - There are 3 set bits in both numbers, so the same works here too
//! A right shift is technically a (truncated) division by 2^n
//*     - Odd numbers don't play well
//* For example, 7 >> 1 = 3, because 7 / 2 = 3.5
//*     - Then we truncate the .5, so we are left with 3
//* If "i" is odd, then we need to add 1 to the number of set bits we are given
//*     - Hence we add 1 in those situations
function countBits(n) {
  //* We need to return an array of size n + 1
  if (n === 0) return [0];

  //* dp[i] = Number of Set Bits in ith number
  const DP = new Array(n + 1).fill(0);

  //* Ith set bit = i >> 1 + (i & 1)
  for (let i = 0; i <= n; i++) {
    DP[i] = DP[i >> 1] + (i & 1);
  }

  return DP;
}

console.log(countBits(2)); //* [0, 1, 1]
console.log(countBits(5)); //* [0, 1, 1, 2, 1, 2]
console.log(countBits(14)); //* [0, 1, 1, 2, 1, 2]

//* Time: O(n) - It takes O(n) to create the DP array, then O(n) to calculate the set bits

//* Space: O(n) - We create an array whose size scales proportionally with the input size (n + 1)
