//* At each step, we have to options
//*     - Solve the question (SKIP AHEAD "questions[i][1] + 1" questions)
//*     - Skip the question (skip the current question)
//* Take the MAXIMUM of both paths
//* We need to iterate BACKWARDS
//*     - The current state relies on the future states

//! Recurrence Relation: F(i) = max(F(i + 1), F(i + questions[i][1]) + questions[i][0])
//* Apply tabulation to avoid recursion overhead
function mostPoints(questions) {
  if (questions.length === 0) return 0;

  const n = questions.length;

  //* dp[i] = Maximum points we can get STARTING at index i
  const dp = new Array(n + 1).fill(0);

  //* Iterate BACKWARDS, the current subproblem relies on the FUTURE states
  for (let i = n - 1; i >= 0; i--) {
    const [points, skip] = questions[i];
    const next = i + skip + 1;

    //* If we would go out of bounds, assume + 0 ponts(base case)
    dp[i] = Math.max(dp[i + 1], points + (next > n ? 0 : dp[next]));
  }

  //* Maximum points we can get starting at index 0
  return dp[0];
}

console.log(
  mostPoints([
    [3, 2],
    [4, 3],
    [4, 4],
    [2, 5],
  ])
); //* 5

console.log(
  mostPoints([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
  ])
); //* 7

console.log(mostPoints([[1, 4]])); //* 1

//* Time: O(n) - We perform an O(n) for loop, so the time taken scales with the input size

//* Space: O(n) - The DP array scales with the size of the input
