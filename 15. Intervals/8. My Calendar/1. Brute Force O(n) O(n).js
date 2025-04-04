//* For every new booking, check if the new interval overlaps with any previous interval
//* If there are "n" previous intervals, and we can check for an overlap in O(1)
//* Then book() has a time complexity of O(n)
//*     - O(1) * n = O(n)
//* The number of comparisons that need to occur increases with every successful booking (n)
class MyCalendar {
  #books;

  constructor() {
    //* Stores interval pairs [start, end]
    this.#books = [];
  }

  //* Check if the new interval overlaps with any previous interval
  book(startTime, endTime) {
    for (let b of this.#books) {
      if (this.#isOverlapping([startTime, endTime], b)) {
        //* Overlap detected, don't add the booking
        return false;
      }
    }

    //* Successfully added the booking
    this.#books.push([startTime, endTime]);
    return true;
  }

  //* Interval A is completely after Interval B if startA > endB
  //* Interval A is completely before Interval B if endA < startB
  //* An overlap occurs if NEITHER is true: One of De Morgan's Laws is "Not (A or B) <=> Not A and Not B"
  //* Which translates to startA <= endB && endA >= startB
  #isOverlapping(a, b) {
    return a[0] < b[1] && a[1] > b[0];
  }
}

const calendar = new MyCalendar();
console.log(calendar.book(1, 7)); //* True
console.log(calendar.book(2, 3)); //* False
console.log(calendar.book(1, 7)); //* False

const calendarII = new MyCalendar();
console.log(calendarII.book(10, 20)); //* True
console.log(calendarII.book(15, 25)); //* False
console.log(calendarII.book(20, 30)); //* True

//* Time: O(n) - The setup takes O(1), but each call to book() takes O(n)
//* We have to ensure the new interval doesn't overlap with any previously booked event (previous interval)

//* Space: O(n) - The memory usage scales with the number of valid intervals
