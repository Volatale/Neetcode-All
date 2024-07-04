//* We cannot choose the same element twice
//* We want to try every path from the current stack frame
//* So at each level of recursion, iterate over the entire array
//*     - We should sort candidates because we have no guarantee of them being in order
//*     - If candidate[i - 1] === candidate[i]
//*     - If the current element failed, we know the future ones in this stack frame will too
//*         - Since they are monotonically increasing, we know that 5 - 6 failed, therefore 5 - 7 will ALSO fail etc
//* target becomes target - candidates[i] (the currently selected element)
function combinationSumII(candidates, target) {
  const results = [];
  candidates.sort((a, b) => a - b); //* Make duplicates adjacent
  backtrack(0, [], candidates, target, results);
  return results;
}

function backtrack(start, curr, candidates, target, results) {
  //* Base Cases
  if (target < 0) return;
  if (target === 0) {
    results.push([...curr]);
    return;
  }

  //* Try every candidate
  for (
    let i = start;
    //* If target - candidates[i] < 0, target - candidates[i + 1] < 0 too
    i < candidates.length && target - candidates[i] >= 0;
    i++
  ) {
    if (i > start && candidates[i - 1] === candidates[i]) continue; //* Skip duplicates
    curr.push(candidates[i]); //* Explore candidate
    backtrack(i + 1, curr, candidates, target - candidates[i], results);
    curr.pop(); //* Unexplore candidate
  }
}

console.log(combinationSumII([4, 1], 4));
console.log(combinationSumII([10, 1, 2, 7, 6, 1, 5], 8));
console.log(combinationSumII([2, 5, 2, 1, 2], 5));
console.log(combinationSumII([1, 3, 5, 4], 4));

//* Time: O(n^m) - There are "n" elements in candidates
//* The depth of the call stack scales with target "m"
//* Each call generates up to "n" separate calls in the worst case

//* Space: O(C * m)
//* Where C is the number of valid combinations and "m" is target
//* In the worst case, a combination = m length (if candidate is 1 and target is 7, for example, [1] * 7)
