//* Sort the intervals based on their start time, and then end time to deal with ties
//*     - This lets us iterate from left to right and track the last interval found
//* A person can only attend all of the meetings if there are no overlaps among any of the intervals
//*     - So immediately return false if you find an overlap
//* If an interval does NOT overlap
//*     - Set the lastEnd = whatever the end value of this interval is
//*     - The "next" interval's start time now needs to be greater than the previous' end time
//*         - Otherwise we get an overlap
//* By sorting, we only need to perform this check in one-way
//*     - If we didn't sort we'd need to compare every interval against every OTHER interval
//*     - Which would take O(n^2)
function meetingRooms(intervals) {
  //* If there are 0 meetings to attend, technically we still attended all of them
  if (intervals.length <= 1) return true;

  //* Sort intervals based on start time, then end time as a tiebreaker
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  let lastEnd = intervals[0][1];

  //* If there is an overlap among any interval, we return false
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    //* There is an overlap
    if (start < lastEnd) {
      return false;
    }

    //* Next interval's start must be > this value
    lastEnd = end;
  }

  //* There were no overlaps, thus we can attend all meetings
  return true;
}

console.log(
  meetingRooms([
    [0, 30],
    [5, 10],
    [15, 20],
  ])
); //* False

console.log(
  meetingRooms([
    [1, 2],
    [2, 3],
    [5, 10],
  ])
); //* True

console.log(
  meetingRooms([
    [7, 10],
    [2, 4],
  ])
); //* True

console.log(meetingRooms([])); //* True
console.log(meetingRooms([[1, 20]])); //* True

//* Time: O(n log n) - It takes O(n log n) to sort the intervals
//* Then it takes O(n) to check for overlaps among all the intervals

//* Space: O(n) - The sorting step uses O(n) space in the worst case (if merge sort is used)
//* Other than that, we use a constant amount of space
