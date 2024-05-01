function generateParentheses(n) {
  const results = [];
  backtrack(0, 0, n, "", results);
  return results;
}

//* Number of closers has to be SMALLER than the number of openers
//* Number of openers has to be SMALLER than "n"
//* We can either use a base case of: "left + right === 2 * n", or,
//* "curr.length === n * 2"
function backtrack(left, right, n, curr, result) {
  //* Base Case
  if (curr.length === n * 2) {
    result.push(curr);
    return;
  }

  //* Openers have to preceed closers
  if (left < n) {
    backtrack(left + 1, right, n, curr + "(", result);
  }

  //* We can't have more closers than openers
  if (right < left) {
    backtrack(left, right + 1, n, curr + ")", result);
  }
}

console.log(generateParentheses(2)); //* ["(())", "()()"]
console.log(generateParentheses(3)); //* ["((()))", "(()())", "(())()", "()(())", "()()()"]
console.log(generateParentheses(4));
console.log(generateParentheses(5));

//* Time: O(C(n)) - We don't follow every path that is possible
//* The time taken actually scales proportionally with the Catalan Numbers
//* O(4^n / (n^(3/2) * sqrt(pi)))

//* Space: O(n) - The depth of the recursive stack scales proportionally with "n"
