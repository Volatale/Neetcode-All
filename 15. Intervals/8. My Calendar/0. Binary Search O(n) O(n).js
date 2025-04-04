class MyCalendar {
  #bookings;

  constructor() {
    //* Stores intervals as [start, end] in a sorted order
    this.#bookings = [];
  }

  //* Use Binary Search to maintain a sorted list of bookings
  //* Find the leftmost insertion position of the new interval
  //* A is after B if a's start > b's end
  //* A is before B if a's end < b's start
  //* Thus, an overlap occurs if NEITHER of the above are true
  //* One of De Morgan's Laws: ¬(A or B) = Not A AND Not B (reverse the signs)
  book(startTime, endTime) {
    //* The search space is all of our intervals
    let left = 0;
    let right = this.#bookings.length - 1;

    while (left <= right) {
      const mid = left + ((right - left) >> 1);
      const [s, e] = this.#bookings[mid];

      //* The intervals overlap -> ¬(A or B) = Not A AND Not B
      if (s < endTime && e > startTime) {
        return false;
      }

      //* (s, e) = [1, 3], (start, end) = [3, 6], or [4, 6] -> [[1, 3], [3,6]]
      if (e <= startTime) {
        left = mid + 1; //* New interval STARTS after the current one ENDS
      } else {
        right = mid - 1; //* New interval ENDS after current one STARTS
      }
    }

    //* Insert the new interval at the leftmost insertion index
    this.#bookings.splice(left, 0, [startTime, endTime]);
    return true;
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

//* Time: O(n) - The initialization takes O(1), but the queries take take between O(log n) and O(n)
//* We binary search to find the insertion position for the query (checking for overlaps takes O(1))
//* But then we have to splice the array to insert it into the correct position
//* This wouldn't be necessary if we had a TreeMap

//* Space: O(n) - The memory used scales with the number of valid bookings
