//* A "k"-booking happens when "k" events have a non-empty intersection
//*     - In other words, there is some time common to all "k" events
//* We are given intervals of [start, end]
//*     - So essentially, this is an INTERVAL problem
//! Except, in this case, we want to return the "maximum number of overlaps after each insertion"
//*     - Bookings will never be rejected at any point
//*     - So our goal is simply to track the maximum that have "currently" occurred
//! One way to think about this is that we're answering queries
//*     - These happen to be ONLINE queries (we answer them as they come without knowing anything beforehand)
//! Whenever we have a new booking, we add the new booking, and then answer the query
//*     - Remember, the query is "the maximum number of overlaps after each insertion"
//* So we need to be tracking the maximum as we go
//! A Segment Tree can actually handle this problem very well (with some modification)
//*     - We are given intervals (pairs of integers), so we can't simply use those as values
//*     - We also don't necessarily know how many queries will need to be answered
//* The main difficulty is EFFICIENTLY tracking the max no. of intervals
//* Which means we need to be able to:
//*     - Update the tree when a new booking is added (increment the relevant ranges)
//*     - Query the tree for the maximum number of overlapping bookings after each booking
//* By using lazy propagation, we can perform both operations in an O(log n) time comlexity
class MyCalendarThree {
  #ST;
  #lazy;

  constructor() {
    this.#ST = {};
    this.#lazy = {};
    this.max = 0;
  }

  #applyLazy(node, left, right) {
    if (this.#lazy[node] !== undefined && this.#lazy[node] !== 0) {
      this.#ST[node] = (this.#ST[node] || 0) + this.#lazy[node];

      if (left !== right) {
        this.#lazy[node << 1] = (this.#lazy[node << 1] || 0) + this.#lazy[node];
        this.#lazy[(node << 1) | 1] =
          (this.#lazy[(node << 1) | 1] || 0) + this.#lazy[node];
      }

      this.#lazy[node] = 0;
    }
  }

  update(node, tl, tr, left, right, val) {
    this.#applyLazy(node, tl, tr);

    if (left > tr || right < tl) return 0;

    if (left <= tl && tr <= right) {
      this.#lazy[node] = (this.#lazy[node] || 0) + val;
      this.#applyLazy(node, tl, tr);
      this.max = Math.max(this.max, this.#ST[node] || 0);
      return;
    }

    const mid = Math.floor((tl + tr) / 2);

    this.update(node << 1, tl, mid, left, right, val);
    this.update((node << 1) | 1, mid + 1, tr, left, right, val);

    this.#ST[node] = Math.max(
      this.#ST[node << 1] || 0,
      this.#ST[(node << 1) | 1] || 0
    );
  }

  book(startTime, endTime) {
    this.update(1, 0, 1e9, startTime, endTime - 1, 1);
    return this.max;
  }
}

const calendar = new MyCalendarThree();
console.log(calendar.book(10, 20)); //* 1
console.log(calendar.book(50, 60)); //* 1
console.log(calendar.book(10, 40)); //* 2
console.log(calendar.book(5, 15)); //* 3
console.log(calendar.book(5, 10)); //* 3
console.log(calendar.book(25, 55)); //* 3
