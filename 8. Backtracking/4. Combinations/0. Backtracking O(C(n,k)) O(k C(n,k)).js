//* Out of "n" numbers, choose "k" (nCk)
//* Combinations are unique and don't care about order
//* The range of numbers is 1 to n (inclusive)
//* We can't choose the same element twice
//* So pass i + 1 to ensure that element is not considered again along this path
function combinations(n, k) {
  const results = [];
  backtrack(1, [], n, k, results); //* Range is 1 to n (inclusive), start from 1
  return results;
}

function backtrack(start, curr, n, k, results) {
  //* A combination has "k" length
  if (curr.length === k) {
    results.push([...curr]);
    return;
  }

  //* The range of numbers is 1 to n
  //* i + 1 ensures future branches on this path ignore "i"
  //* Therefore every combination is unique and increasing order
  for (let i = start; i <= n; i++) {
    curr.push(i);
    backtrack(i + 1, curr, n, k, results);
    curr.pop();
  }
}

console.log(combinations(4, 2));
console.log(combinations(5, 1));
console.log(combinations(2, 2));

//* Time: O(C(n,k))
//* The time complexity is proportional to the number of combinations
//* It scales with the Binomial Coefficient C(n,k)

//* Space: O(k * C(n,k))
//* The depth of the call stack is "k" since each combination is "k" length
//* There are C(n,k) different combinations, thus it takes k * C(n,k) space to hold them all
