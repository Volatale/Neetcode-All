//* Sort the intervals by their start time in ascending, and then by their end time in descending as a tiebreaker
//*     - We want to see the intervals that START earlier (easier to check for overlaps that way)
//*     - The end times need to be in descending order
//*         - [1, 3], [1, 15], out of both of these, we are more likely to "cover" an interval with the longer interval
//*         - We want to include [1, 15] rather than [1, 3], since we know [1, 3] is LESS likely to cover something else
//* If the current interval is NOT covered by the previous
//*     - Then we can include the current interval
//*     - Update the lastStart and lastEnd
//* Otherwise, the inteval is completely covered by the previous interval
//*     - So increment the number of removals
//*     - Since we DIDN'T include the interval, the lastStart and lastEnd remain as is
function removeCoveredIntervals(intervals) {
  //* We don't remove any intervals
  if (intervals.length <= 1) return intervals.length;

  //* Sort by start time in ascending order, then end time in descending order as a tiebreaker
  //* If the start times are tied, we want to see the LONGER interval first (easier to check for covers)
  intervals.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  //* Track the last interval that was included
  let lastStart = intervals[0][0];
  let lastEnd = intervals[0][1];
  let removals = 0;

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start >= lastStart && end <= lastEnd) {
      //* Remove this interval; it is completely covered
      removals++;
    } else {
      //* Include this interval, it isn't completely covered
      lastStart = start;
      lastEnd = end;
    }
  }

  //* Remaining intervals = original number - removals
  return intervals.length - removals;
}

console.log(
  removeCoveredIntervals([
    [1, 4],
    [2, 8],
    [3, 6],
  ])
); //* 2

console.log(
  removeCoveredIntervals([
    [1, 4],
    [2, 3],
  ])
); //* 1

console.log(removeCoveredIntervals([[1, 4]])); //* 1
console.log(removeCoveredIntervals([])); //* 0

console.log(
  removeCoveredIntervals([
    [1, 30],
    [2, 5],
    [7, 9],
    [11, 13],
  ])
); //* 1

console.log(
  removeCoveredIntervals([
    [1, 14],
    [1, 3],
    [2, 5],
    [7, 9],
    [11, 13],
  ])
); //* 1

console.log(
  removeCoveredIntervals([
    [1, 2],
    [2, 3],
  ])
); //* 2

//* Time: O(n log n) - It takes O(n log n) to sort the intervals
//* Then, it takes O(n) to iterate through every interval checking for completely covered intervals

//* Space: O(n) - Sorting generally uses O(n) space (assuming merge sort is used)
