//! The intervals are already sorted in ascending order by start time
//* We need to insert an interval
//*     - But we need to ensure there are no overlaps and that the intervals remain sorted post-insert
//* To make this easier, split the process up into three parts
//*     - Add intervals that won't overlap to the results array first
//*     - Then, repeatedly merge all of the overlapping intervals
//*         - Push the final merged interval to the results array
//*     - Finally, since we know we performed the final merge, add the rest
//*         - Any start time >= newIntervals[1] is guaranteed to not overlap
function insert(intervals, newInterval) {
  //* There are no intervals, so nothing stops us from adding the new one
  if (intervals.length === 0) return [newInterval];

  const results = [];
  let i = 0;

  //* Add all of the intervals that end before newInterval starts
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    results.push(intervals[i++]);
  }

  //* Merge all of the intervals that DO overlap into newInterval
  while (i < intervals.length && isOverlap(intervals[i], newInterval)) {
    newInterval = mergeIntervals(intervals[i++], newInterval);
  }

  //* Add the completely merged interval
  results.push(newInterval);

  //* Add all of the rest of the intervals (they don't overlap)
  while (i < intervals.length) {
    results.push(intervals[i++]);
  }

  return results;
}

//* Start time of A is <= end time of B AND
//* Start time of B is <= end time of A
function isOverlap(a, b) {
  return a[0] <= b[1] && b[0] <= a[1];
}

//* Return NEW interval with new bounds
function mergeIntervals(a, b) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}

console.log(
  insert(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5]
  )
); //* [[1, 5], [6, 9]]

console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16],
    ],
    [4, 8]
  )
); //* [[1,2],[3,10],[12,16]]

console.log(insert([[1, 2]], [3, 5])); //* [[1,2], [3, 5]]

console.log(insert([], [2, 5])); //* [[2, 5]]

//* Time: O(n) - We iterate through the entire array regardless of input size
//* Checking for overlaps and merging take O(1) space

//* Space: O(n) - The results array in the worst case will scale in length with the input size
//* [[1, 2], [4, 5], [6, 7]], [9, 10] -> none of these overlap, so we get intervals.length + 1 space usage
