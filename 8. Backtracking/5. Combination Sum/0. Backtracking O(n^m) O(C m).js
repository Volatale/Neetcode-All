//* In the case of regular combinations, we cannot choose the same element twice
//* In THIS case, we can
//* We want to try every path from the current stack frame
//* So at each level of recursion, iterate over the entire array
//*     - We should sort candidates because we have no guarantee of them being in order
//*     - If the current element failed, we know the future ones in this stack frame will too
//*         - Since they are monotonically increasing, we know that 5 - 6 failed, therefore 5 - 7 will ALSO fail etc
//* target becomes target - candidates[i] (the currently selected element)
function combinationSum(candidates, target) {
  const results = [];
  candidates.sort((a, b) => a - b); //* Ensures candidates are in order
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

  //* Iterate over every candidate to test them all
  //* Pass "i" and not start because we might want to reuse the same element (index)
  for (
    let i = start;
    //* The array is sorted; thus if the current element failed, all the future ones will too
    i < candidates.length && target - candidates[i] >= 0;
    i++
  ) {
    curr.push(candidates[i]);
    backtrack(i, curr, candidates, target - candidates[i], results);
    curr.pop();
  }
}

console.log(combinationSum([2, 3, 6, 7], 7));
console.log(combinationSum([2, 3, 5], 8));
console.log(combinationSum([2], 1));
console.log(combinationSum([1, 5, 9], 10));

//* Time: O(n^m) - There are "n" elements in candidates
//* The depth of the call stack scales with target "m"
//* Each call generates up to "n" separate calls in the worst case

//* Space: O(C * m) -
//* Where C is the number of valid combinations and "m" is target
//* In the worst case, a combination = m length (if candidate is 1 and target is 7, for example, [1] * 7)
