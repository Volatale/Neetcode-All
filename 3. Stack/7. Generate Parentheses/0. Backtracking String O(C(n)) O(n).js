//* We need to generate ALL combinations of well-formed parentheses
//*     - Well-formed in this case means valid
//* Generating "all" versions of something with a constraint implies backtracking
//* So we can use a backtracking approach here
//*     - Base Case
//*     - Choose candidate
//*     - Validate candidate
//*     - Unchoose candidate
//* Rules:
//*     - In total, there should be "n" openers and "n" closers
//*         - Thus, in total, a "valid" parentheses string has a length of (n * 2)
//*     - There should be a closer for every opener
//*     - There should never be more closers than openers
//! At each step, we have two choices, either add a "(" or add a ")"
//*     - So the branching factor here is 2, and the depth of the recursion is ")"
function generateParenthesis(n) {
  function backtrack(openers, closers, n, curr) {
    //* Base Case
    if (curr.length === n * 2) {
      parentheses.push(curr);
      return;
    }

    //* Openers are first because they precede closers
    if (openers < n) {
      backtrack(openers + 1, closers, n, curr + "(");
    }

    //* Ensure there are never more closers than openers
    if (closers < openers) {
      backtrack(openers, closers + 1, n, curr + ")");
    }
  }

  const parentheses = [];
  backtrack(0, 0, n, "");
  return parentheses;
}

console.log(generateParenthesis(2)); //* ["(())", "()()"]
console.log(generateParenthesis(3)); //* ["((()))", "(()())", "(())()", "()(())", "()()()"]
console.log(generateParenthesis(4));
console.log(generateParenthesis(5));

//* Time: O(C(n)) - We don't actually follow every possible path
//* The time taken actually scales proportionally with the Catalan numbers
//* O(4^n / (n^3/2) * sqrt(pi))

//* Space: O(n) - The depth of the recursion scales with the input (n)
