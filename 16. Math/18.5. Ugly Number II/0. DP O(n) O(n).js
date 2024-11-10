//* Since this is a prime factorization problem
//* There is a good chance we'll perform redundant (repeated) calculations
//*     - If we draw a decision tree where we multiply each number by 1, 2 and 5
//*     - We can determine that we have overlapping subproblems
//! Since overlapping subproblems exist, we should apply dynamic programming
//*     - dp[i] gives us the ith ugly number
//* The ugly numbers need to be generated in a monotonically increasing order
//* There are THREE ugly numbers we can generate simultaneously
//*     - We want the MINIMUM of all of them; this allows us to consistently generate them in order
//* Since there are three possible ugly numbers per iteration
//*     - Use THREE pointers - each is used to track an INDEX
//*     -
//* Each pointer is used to track the next multiple of 2, 3 and 5 that will produce the next ugly numbe
//*     - After choosing the MINIMUM among the three ugly numbers, increment the one that was actually used
//*     - This allows us to avoid creating duplicates
function nthUglyNumber(n) {
  //* 1 is the 1st ugly number
  if (n === 1) return 1;

  //* dp[i] = Ith ugly number
  const dp = new Array(n).fill(0);

  //* Base Case: 1 is an ugly number
  dp[0] = 1;

  //* Pointers used to track the next multiple of 2, 3 and 5
  let p2 = 0;
  let p3 = 0;
  let p5 = 0;

  for (let i = 1; i < n; i++) {
    //* The next ugly number should be the MINIMUM of all 3 multiples
    const nextUgly = Math.min(2 * dp[p2], 3 * dp[p3], 5 * dp[p5]);
    dp[i] = nextUgly;

    //* Progress the pointer whose index was used for the (minimum) ugly number
    //* Lets us skip duplicates
    if (nextUgly === 2 * dp[p2]) p2++;
    if (nextUgly === 3 * dp[p3]) p3++;
    if (nextUgly === 5 * dp[p5]) p5++;
  }

  //* Return the nth ugly number
  return dp[n - 1];
}

console.log(nthUglyNumber(3)); //* 3
console.log(nthUglyNumber(5)); //* 5
console.log(nthUglyNumber(10)); //* 12
console.log(nthUglyNumber(1)); //* 1
console.log(nthUglyNumber(100)); //* 1536
console.log(nthUglyNumber(8)); //* 9
console.log(nthUglyNumber(15)); //* 24
console.log(nthUglyNumber(32)); //* 90
console.log(nthUglyNumber(13)); //* 18

//* Time: O(n) - It takes O(n) to create the DP array, and O(n) to generate all of the ugly numbers
//* Within each iteration, we are performing "work" that is essentially constant time

//* Space: O(n) - By using extra space, we reduce the amount of repeated calculations done
