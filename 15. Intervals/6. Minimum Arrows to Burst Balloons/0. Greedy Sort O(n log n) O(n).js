//* Sort intervals by their end time in ascending order
//* The end time of an interval is essentially its overlap boundary
//*     - For example, [1, 5] means that an interval starting at 6 won't overlap with it
//*     - So the moment we are AT 5, we have to shoot since its the last potential chance for a collateral
//* When we need to shoot a NEW arrow (no overlap with previous group)
//*     - We have a NEW overlap boundary
//* Any interval whose start time <= lastEnd can be hit by the same arrow (in this group)
//*     - So every new arrow creates a new boundary, and we know when that houndary ends (points[i][1])
function findMinArrowShots(points) {
  //* If there is only 1 balloon, we shoot 1 arrow, 0 if 0 balloons
  if (points.length <= 1) return points.length;

  //* Sort intervals by their END time in ascending order
  points.sort((a, b) => a[1] - b[1]);

  let arrowsShot = 1;
  let lastEnd = points[0][1]; //* If start of next < this, arrow can hit both

  for (let i = 1; i < points.length; i++) {
    const [start, end] = points[i];

    //* Interval does not overlap with the previous group (new arrow)
    if (start > lastEnd) {
      arrowsShot++;
      lastEnd = end;
    }
  }

  return arrowsShot;
}

console.log(
  findMinArrowShots([
    [1, 5],
    [2, 8],
    [3, 7],
    [8, 11],
  ])
); //* 2

console.log(
  findMinArrowShots([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ])
); //* 2

console.log(findMinArrowShots([])); //* 0
console.log(findMinArrowShots([[10, 20]])); //* 1

console.log(
  findMinArrowShots([
    [3, 9],
    [7, 12],
    [3, 8],
    [6, 8],
    [9, 10],
    [2, 9],
    [0, 9],
    [3, 9],
    [0, 6],
    [2, 8],
  ])
); //* 2

console.log(
  findMinArrowShots([
    [9, 12],
    [1, 10],
    [4, 11],
    [8, 12],
    [3, 9],
    [6, 9],
    [6, 7],
  ])
); //* 2

console.log(
  findMinArrowShots([
    [4, 7],
    [2, 6],
  ])
); //* 1

//* Time: O(n log n) - It takes O(n log n) to sort the intervals
//* Then, it takes O(n) to iterate through every interval checking for overlaps

//* Space: O(n) - Sorting generally uses O(n) space (assuming merge sort is used)
