//* Sort the intervals in order of start time (in ascending order)
//*     - This lets us easily determine if the previous/next intervals overlap
//* The previous interval can be found as the final element in the array
//* If the current and previous intervals overlap, overwrite the last element with the merged interval
//* Otherwise, just add the current interval to the results array
function merge(intervals) {
  //* If there are 1 or less intervals, we have nothing to merge
  if (intervals.length <= 1) return intervals;

  //* Sort intervals in ascending order based on start time
  intervals.sort((a, b) => a[0] - b[0]);

  //* Initialized with the first interval
  const results = [intervals[0]];

  for (let interval of intervals) {
    //* Previous interval exists in the results array
    const prevInterval = results[results.length - 1];

    //* If they overlap, they need to be merged
    if (isOverlap(interval, prevInterval)) {
      results[results.length - 1] = mergeInterval(interval, prevInterval);
    } else {
      results.push(interval);
    }
  }

  return results;
}

//* New interval has the min and max of the two extremes
function mergeInterval(a, b) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}

//* Start time of A <= end time of B AND
//* Start time of B <= end time of A
function isOverlap(a, b) {
  return a[0] <= b[1] && b[0] <= a[1];
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
); //* [[1,6],[8,10],[15,18]]
console.log(
  merge([
    [1, 4],
    [4, 5],
  ])
); //* [[1, 5]]
console.log(
  merge([
    [2, 4],
    [3, 5],
    [4, 6],
    [5, 7],
    [7, 9],
  ])
); //* [[2, 9]]

//* Time: O(n log n) - We have to sort the intervals, which takes O(n log n) time
//* It takes O(n) to iterate over the intervals list and process everything
//* Checking for overlaps and merging both take constant time

//* Space: O(n) - Sorting generally uses O(n) space (merge sort)
//* The results array scales with the input size in the worst case/
//* If none of the intervals overlap, we essentially just return the input
