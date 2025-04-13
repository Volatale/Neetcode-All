//* Since we need to perform ALL of the range updates without querying in between
//* We can use the "difference array" technique
//* It is a variation of prefix sums that allows us to efficiently perform range updates
//* For every update:
//*     - Apply (add) the value to nums[start]
//*     - Then, SUBTRACT the value from nums[end + 1]
//* Why does this work?
//* Because when we compute the prefix sum array:
//*     - If we update [0], then EVERY index AFTER [0] will ALSO receive the changes
//*     - So we don't have to iterate over every element in the range
//* The values in the updated range will see the updated value
//*     - So we ADD the update to the first element in the range
//* Then, any element AFTER that range will NOT see this particular updated value
//*     - So we SUBTRACT (remove) the update after the query range
//* Example: [0, 0, 0, 0], updates = [[0, 2, 3]]
//*     - Diff Array = [3, 0, 0, -3]
//*         - Indices [0, 2] will see the +3, and the changes will be propagated to the elements in that range
//*     - Prefix Array = [3, 3, 3, 0]
//* See how index 3 DOES NOT see the value?
//* Because we effectively "cut off" the update AFTER index 2
//*     - Which is why we do nums[right + 1] -= val
//*     - Because no element AFTER the right boundary should reflect this update
//! This technique works because we ONLY need the actual values AFTER performing all of the updates
//*     - When we later compute the prefix sum array, ONLY the range [start...end] for each update receive the update
function rangeAddition(length, updates) {
  const diffArray = new Array(length).fill(0);

  //* For each element, apply +val to start and -val to end +1
  for (const [start, end, val] of updates) {
    //* The FUTURE indices (up to end + 1) will all use this value
    diffArray[start] += val;

    //* When we compute the prefix sum, the "updated" value ends here
    if (end + 1 < length) {
      diffArray[end + 1] -= val;
    }
  }

  //* Compute the prefix sum of the elements
  for (let i = 1; i < length; i++) {
    diffArray[i] += diffArray[i - 1];
  }

  return diffArray;
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

//* Time: O(n + k) - It takes O(n) to create the results array
//* Then, iterating over the updates array takes O(k) and recomputing the prefix array takes O(n)

//* Space: O(n) - The memory usage scales with the input size (length === n)
