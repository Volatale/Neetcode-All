//* Sort the intervals by start time, and then end time if there is a tie
//*     - This allows us to avoid redundant work (we can just compare pairs of intervals)
//* There is no need to actually modify the intervals array
//*     - Instead, we just count the number of removals
//* Iterate through the array from left to right
//*     - Assume we include the first one
//* We can check for intervals by comparing start time of the new vs the end time of the old
//*     - Track the end time of the last interval we added
//* If we can include the current interval (no overlap)
//*     - Set lastEnd to the current interval's end time
//*     - The next interval's start time must be >= this value
//* Otherwise, we have an overlap and thus cannot include the current interval
//*     - So we "remove" the current interval by not including it
//*     - But in reality, we should retain whatever interval ENDS sooner
//*         - Logically speaking, intervals that end sooner give a better chance of no overlaps later
//*         - [[1, 6], [2, 4], [5, 8]], in this example, we want to keep [2, 4] instead of [1, 6]
//*         - Since [2, 4] ends earlier, it means we can include [5, 8]
//*             - Choosing to include [1, 6] would mean we have to remove both [2, 4] and [5, 8]
function eraseOverlapIntervals(intervals) {
  //* There are no overlapping intervals
  if (intervals.length <= 1) return 0;

  //* Sort intervals by their start time, and then by end time if there is a tie
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  let removals = 0;
  let lastEnd = intervals[0][1];

  //* Compare intervals on a pair-by-pair basis
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    //* Intervals don't overlap
    if (start >= lastEnd) {
      lastEnd = end;
    } else {
      removals++; //* Intervals overlap
      lastEnd = Math.min(lastEnd, end); //* Keep interval that ends earlier
    }
  }

  return removals;
}

console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3],
  ])
); //* 1

console.log(
  eraseOverlapIntervals([
    [1, 2],
    [1, 2],
    [1, 2],
  ])
); //* 2

console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 3],
  ])
); //* 0

console.log(
  eraseOverlapIntervals([
    [1, 5],
    [5, 6],
    [10, 12],
    [4, 6],
    [7, 8],
  ])
); //* 1

console.log(
  eraseOverlapIntervals([
    [1, 100],
    [11, 22],
    [1, 11],
    [2, 12],
  ])
);

console.log(
  eraseOverlapIntervals([
    [1, 4],
    [1, 5],
    [1, 6],
  ])
); //* 2

console.log(
  eraseOverlapIntervals([
    [1, 4],
    [1, 5],
    [1, 6],
    [4, 5],
  ])
); //* 2

console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ])
); //* 0

//* Time: O(n log n) - Sorting the intervals takes O(n log n)
//* Then it takes O(n) to check for overlaps

//* Space: O(n) - Sorting uses O(n) space
