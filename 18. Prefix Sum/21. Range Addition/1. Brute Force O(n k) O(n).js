//* This is essentially an interval problem
//* We need to update the array elements in the range [left, right] inclusive by val
//* So this could be considered to be a range update
//* For each query, iterate from "start" to "end" (inclusive) and add val to each value in the range
function rangeAddition(length, updates) {
  function rangeUpdate(left, right, val) {
    for (let i = left; i <= right; i++) {
      results[i] += val;
    }
  }

  const results = new Array(length).fill(0);

  //* For each query, update the element in the range by val
  for (const [start, end, val] of updates) {
    rangeUpdate(start, end, val);
  }

  return results;
}

console.log(
  rangeAddition(5, [
    [1, 3, 2],
    [2, 4, 3],
    [0, 2, -2],
  ])
); //* [-2, 3, 3, 5, 3]

console.log(
  rangeAddition(3, [
    [0, 2, 1],
    [0, 2, 1],
    [0, 2, 1],
  ])
); //* [3, 3, 3]

console.log(
  rangeAddition(1, [
    [0, 0, 5],
    [0, 0, -5],
  ])
); //* [0]

//* Time: O(n * k) - The length of the entire array is "n"
//* And for each query, we could potentially have to iterate the entire list (of n elements)

//* Space: O(n) - The memory usage scales with the input (length)
