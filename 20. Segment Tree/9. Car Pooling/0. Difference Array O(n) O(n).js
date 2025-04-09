//* Instead of treating this like an interval problem
//* We can simply use a DIFFERENCE ARRAY approach
//* Track the NET CHANGE in passengers at any point in time
//* For each trip:
//*     - diff[start] += passengers
//*         - At this stop, we pickup passengers
//*     - diff[end] -= passengers
//*         - Then we drop them off here
//! If the cumulative sum of all the net changes is ever > capacity, we can't make all of the trips
//* The end result is essentially a difference array that tracks the net change in passengers
function carPooling(trips, capacity) {
  //* A difference array that tracks the net change in passengers at any point
  const diff = new Array(1001).fill(0);

  let currPassengers = 0;

  //* Pickup AND Dropoff passengers at once
  for (const [passengers, start, end] of trips) {
    diff[start] += passengers; //* Pickup the passengers
    diff[end] -= passengers; //* Drop of the passengers
  }

  //* If the total passengers is ever > capacity, we can't make all of the trips
  for (let i = 0; currPassengers <= capacity && i < 1001; i++) {
    currPassengers += diff[i];
  }

  return currPassengers <= capacity;
}

console.log(
  carPooling(
    [
      [2, 1, 5],
      [3, 3, 7],
    ],
    4
  )
); //* false

console.log(
  carPooling(
    [
      [2, 1, 5],
      [3, 3, 7],
    ],
    5
  )
); //* true

//* Time: O(n) - We have to iterate through the entire trips array, and there are "n" elements

//* Space: O(1) - 1 <= from <= to <= 1000, so we know the maximum difference is 1000 (a constant)
