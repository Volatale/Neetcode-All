//* A DOUBLE booking occurs if there are TWO intervals that overlap
//* Thus, a TRIPLE booking occurs if there are THREE intervals that overlap
//* The problem operates using half-open intervals
//*     - So the intervals [1, 2], [2, 3] do not overlap
//* Defining the Overlap Definition:
//*     - a is BEFORE b: a's END <= b's start
//*     - a is AFTER b: a's start >= b's end
//* Thus, the condition for no overlap is:
//*     - aEnd <= bStart || aStart >= bEnd
//* We can use De Morgan's Law to Negate the no-overlap condition
//*     - ¬(A or B) = Not A and Not B (neither are true, which means both are false)
//*     - ¬(aEnd <= bStart || aStart >= bEnd)
//! That gives us the following:
//*     - aEnd > bStart && aStart < bEnd
//* Reorient the above to make it slightly more readable
//*     - aStart < bEnd && aEnd > bStart

//* We need an array that tracks every individual (as we usually would)
//* But we ALSO need a separate array that tracks all of the double bookings
//* Why? Because we are allowed to have TWO intervals that overlap
//* But a THIRD would cause a TRIPLE booking
//* If the 3rd interval would overlap with ANY interval in the double booking pair
//* Then we know the 3rd interval will cause a triple booking
//! So essentially, whenever we find a double booking, we MERGE the two intervals together
//* Then, we push that merged interval to a separate, triple booking array
//! How do we actually merge the intervals?
//*     - [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
//*     - This gives us the "overlapping" part of the two intervals
//* Whenever we want to book, we iterate over the triple booking array to find an overlap
//*     - If there is an overlap here, then, as mentioned before, we have a triple booking
//*     - The double booking array contains merged intervals, so each interval represents TWO
//*         - Thus, if the ALSO 3rd overlaps then we MUST have a triple booking
class MyCalendarTwo {
  #bookings;
  #doubleBookings;

  constructor() {
    this.#bookings = []; //* Stores the intervals as [start, end]
    this.#doubleBookings = []; //* Stores the double booking (overlapping parts of intervals)
  }

  book(startTime, endTime) {
    //* Check for a triple booking by comparing the new interval against the doubles
    for (const b of this.#doubleBookings) {
      if (startTime < b[1] && b[0] < endTime) {
        return false; //* We have a triple booking
      }
    }

    //* Check for double bookings, and if we find one, push the overlapping portions to the array
    for (const b of this.#bookings) {
      if (startTime < b[1] && b[0] < endTime) {
        const overlapStart = Math.max(startTime, b[0]);
        const overlapEnd = Math.min(endTime, b[1]);
        this.#doubleBookings.push([overlapStart, overlapEnd]);
      }
    }

    //* Complete the booking
    this.#bookings.push([startTime, endTime]);
    return true;
  }
}

console.log("\nFirst Calendar");
const calendarI = new MyCalendarTwo();
console.log(calendarI.book(10, 20)); //* True
console.log(calendarI.book(50, 60)); //* True
console.log(calendarI.book(10, 40)); //* True
console.log(calendarI.book(5, 15)); //* False
console.log(calendarI.book(5, 10)); //* True
console.log(calendarI.book(25, 55)); //* True

console.log("\nSecond Calendar");
const calendarII = new MyCalendarTwo();
console.log(calendarII.book(1, 2)); //* True
console.log(calendarII.book(1, 2)); //* True
console.log(calendarII.book(2, 3)); //* True

console.log("\nThird Calendar");
const calendarIII = new MyCalendarTwo();
console.log(calendarIII.book(1, 2)); //* True
console.log(calendarIII.book(1, 2)); //* True
console.log(calendarIII.book(1, 2)); //* False (Can't add a third)
