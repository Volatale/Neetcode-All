//* At each step, we have to options
//*     - Solve the question (SKIP AHEAD "questions[i][1] + 1" questions)
//*     - Skip the question (skip the current question)
//* Take the MAXIMUM of both paths

//! Recurrence Relation: F(i) = max(F(i + 1), F(i + questions[i][1]) + questions[i][0])
function mostPoints(questions) {
  function solve(i) {
    //* Base Case: No more questions to solve
    if (i >= questions.length) return 0;

    return Math.max(
      solve(i + 1), //* Skip
      solve(i + questions[i][1] + 1) + questions[i][0] //* Solve
    );
  }

  return solve(0);
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

//* Time: O(2^n) - There are two branches created at each call
//* The depth of the recursion tree is "n" in the worst case
//* We progress the state by 1 (minimum) each call

//* Space: O(n) - The depth of the recursion tree is "n"
