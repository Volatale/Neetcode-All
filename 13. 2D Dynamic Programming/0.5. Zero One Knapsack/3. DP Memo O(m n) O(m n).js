//* At each step, we have two choices: include or exclude the current value
//* Including the element may have consequences later on
//* And excluding the element may not work out in the end
//* So we need to try BOTH paths to ensure the optimal choice

//* Apply Memoization to avoid redudant work
//* "w" is the capacity of the knapsack
//* "i" is the index of the current element
//! Recurrence Relation: F(w, i) = max(F(w - weights[i], i + 1) + values[i], F(w, i + 1))
function zeroOneKnapsack(n, capacity, values, weights) {
  function getValues(capacity, i, memo) {
    //* Base Case: Out of Bounds
    if (i === n) return 0;

    //* Utilize memoized value
    const key = `${capacity}-${i}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let maxValue = 0;

    //* Case 1: Include the current value (abide by capacity)
    if (capacity - weights[i] >= 0) {
      maxValue = getValues(capacity - weights[i], i + 1, memo) + values[i];
    }

    //* Case 2: Exclude the current value
    maxValue = Math.max(maxValue, getValues(capacity, i + 1, memo));

    memo[key] = maxValue;
    return maxValue;
  }

  return getValues(capacity, 0, {});
}

console.log(zeroOneKnapsack(3, 4, [2, 3, 4], [3, 4, 2])); //* 4
console.log(zeroOneKnapsack(3, 5, [1, 2, 5], [2, 4, 3])); //* 6
console.log(zeroOneKnapsack(1, 10, [10], [10])); //* 10
console.log(zeroOneKnapsack(5, 4, [1, 2, 3, 4, 5], [5, 6, 7, 8, 9])); //* 0
console.log(zeroOneKnapsack(3, 10, [1, 2, 3], [4, 5, 6])); //* 4
console.log(zeroOneKnapsack(3, 5, [1, 2, 5], [2, 4, 3])); //* 6
console.log(zeroOneKnapsack(1, 10, [10], [10])); //* 10
console.log(zeroOneKnapsack(5, 4, [1, 2, 3, 4, 5], [5, 6, 7, 8, 9])); //* 0
console.log(zeroOneKnapsack(3, 10, [1, 2, 3], [4, 5, 6])); //* 4

//* Time: O(w * n) - There are w * n unique subproblems to cache
//* We are doing 2D Dynamic Programming because we have two non-constant parameters

//* Space: O(w * n) - Since there are w * n unique subproblems
//* That means there are w * n keys (at most)
//* The depth of the recursion tree scales with "n"
//* We could have a capacity of 10 but every weight is 1
//* So we hit the index limit before the capacity limit
