//* At each step, we have to options
//*     - Solve the question (SKIP AHEAD "questions[i][1] + 1" questions)
//*     - Skip the question (skip the current question)
//* Take the MAXIMUM of both paths

//! Recurrence Relation: F(i) = max(F(i + 1), F(i + questions[i][1]) + questions[i][0])
//* Apply memoization to avoid recursion overhead
function mostPoints(questions) {
  function solve(i, memo) {
    //* Base Case: No more questions to solve
    if (i >= questions.length) return 0;

    if (memo.hasOwnProperty(i)) return memo[i];

    return (memo[i] = Math.max(
      solve(i + 1, memo), //* Skip
      solve(i + questions[i][1] + 1, memo) + questions[i][0] //* Solve
    ));
  }

  return solve(0, {});
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

//* Time: O(n) - We are memoizing the results of each subproblem
//* There are "n" unique subproblems to solve in the worst case

//* Space: O(n) - The depth of the recursion tree is "n"
//* There are "n" keys/values stored in the memo object in the worst case
