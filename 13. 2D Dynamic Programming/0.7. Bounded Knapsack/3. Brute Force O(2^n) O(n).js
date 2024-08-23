//* There are 3 non-constant parameters to handle
//* The current element (i), current capacity (w) and no of items chosen so far (k)
//* At each step, consider including AND excluding the element

//! Recurrence Relation: f(i,w,k) = max(f(i + 1, w - weight[i], k - 1) + value[i]), f(i + 1, w, k))

function boundedKnapsack(n, w, k, value, weight) {
  function getItems(i, capacity, k) {
    //* Out of Bounds, or we can't add anymore items
    if (i === n || capacity === 0 || k === 0) return 0;

    let maxValue = 0;

    //* Case 1: Include the current element
    if (capacity >= weight[i])
      maxValue = getItems(i + 1, capacity - weight[i], k - 1) + value[i];

    //* Case 2: Exclude the current element
    maxValue = Math.max(maxValue, getItems(i + 1, capacity, k));

    return maxValue;
  }

  return getItems(0, w, k);
}

console.log(boundedKnapsack(4, 4, 2, [4, 8, 2, 1], [3, 1, 2, 4])); //* 12
console.log(boundedKnapsack(1, 5, 1, [10], [5])); //* 10
console.log(boundedKnapsack(1, 5, 0, [10], [5])); //* 0
console.log(boundedKnapsack(5, 8, 2, [2, 7, 1, 5, 3], [2, 5, 2, 3, 4])); //* 12
console.log(boundedKnapsack(5, 1, 2, [2, 7, 1, 5, 3], [2, 5, 2, 3, 4])); //* 0

//* Time: O(2^n) - At each step, there are cases we need to handle
//* Include the current element or exclude it
//* To find the optimal subset of elements, we need to consider both paths (for all elements)
//* So the branching factor is 2, and the height of the recursion tree is "n"

//* Space: O(n) - The height of the recursion tree is "n" since we are ultimately limited by the no. of items
