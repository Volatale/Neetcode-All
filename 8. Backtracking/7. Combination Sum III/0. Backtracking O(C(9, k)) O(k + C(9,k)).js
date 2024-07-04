function combinationSumIII(k, n) {
  const results = [];
  backtrack(1, [], k, n, results); //* Range is 1 to 9, start at 1
  return results;
}

function backtrack(start, curr, k, n, results) {
  //* Base Cases
  if (n < 0) return;
  if (n === 0 && curr.length === k) {
    results.push([...curr]);
    return;
  }

  //* Try every number from "start" to 9
  for (let i = start; i <= 9 && n - i >= 0; i++) {
    curr.push(i); //* Explore candidate
    backtrack(i + 1, curr, k, n - i, results);
    curr.pop(); //* Unexplore candidate
  }
}

console.log(combinationSumIII(3, 7));
console.log(combinationSumIII(3, 9));
console.log(combinationSumIII(3, 6));
console.log(combinationSumIII(4, 1));

//* Time: O(C(9, k))
//* We choose "k" numbers out of a set of 9
//* Every recursive call made removes a potential element from selection

//* Space: O(k + C(9, k))
//* The recursion depth is at most "k"
//* The space used to store all the valid combinations
//* Scales with O(C(9, k)) since there are 9 numbers and we choose "k"
//* Not every combination is valid
