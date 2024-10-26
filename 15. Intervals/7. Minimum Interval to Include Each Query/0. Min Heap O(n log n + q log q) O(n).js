class MyPriorityQueue {
  constructor(values = [], func = (a, b) => a - b) {
    this.heap = values;
    this.func = func;
    this.heapify();
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.func(this.heap[i], this.heap[parent]) < 0) {
      this.swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.heap.length === 0) return undefined;

    this.swap(0, this.heap.length - 1);
    const popped = this.heap.pop();
    this.sinkDown(0);
    return popped;
  }

  sinkDown(i) {
    let length = this.heap.length;

    while (true) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      let swapIndex = i;

      if (
        leftChild < length &&
        this.func(this.heap[leftChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[rightChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = rightChild;
      }

      if (i === swapIndex) break;

      this.swap(i, swapIndex);
      i = swapIndex;
    }
  }
}

//* We need fast access to the minimum size interval that answers our query
//*     - Use a Min Heap that sorts by the size of each interval
//* Given how a priority queue works, we shouldn't immediately dequeue
//!     - What if we need to reuse the same interval for multiple queries?
//*     - We can't just dequeue the moment we find a match
//* Instead, since the priority queue sorts based on size
//*     - We should also sort the queries by their value (in ascending order)
//!     - But given that their index matters, we should retain their order (index) too
//*         - Sorting means that it becomes harder to determine their result (index) position
//* We should ALSO sort the intervals themselves, despite having the priority queue
//*     - This ensures we see the intervals in order of their start time
//* Iterate over the list of queries (in order of their value)
//*     - Add all of the intervals whose start <= query (because they are valid intervals)
//*         - [start, end, end - start + 1] (end - start + 1 is the SIZE of the interval)
//*     - Remove all of the intervals whose end < query
//*         - Since the queries are sorted in ascending order, these intervals are no longer needed
//*         - If query > peek()[1] (end), the removed queries do not fit our criteria
//*     - After these steps, if the PQ is not empty
//*         - The peek element will now be the smallest size interval that answers the query
//!         - Do not dequeue here, we may need to reuse the same interval again
//*             - The query validity is handled by the while loops
function minInterval(intervals, queries) {
  //* There are no queries to answer
  if (intervals.length === 0) return [];

  //* Assume every query failed
  const results = new Array(queries.length).fill(-1);

  //* We need to keep track of their indices since these are going to be sored
  const indexedQueries = queries.map((query, i) => [query, i]);

  //* Sort intervals in ascending by start time, queries by value in ascending
  intervals.sort((a, b) => a[0] - b[0]);
  indexedQueries.sort((a, b) => a[0] - b[0]);

  //* PQ sorts by size in ascending order (gives us the smallest size interval)
  const PQ = new MyPriorityQueue([], (a, b) => a[2] - b[2]);
  let index = 0;

  for (const [query, i] of indexedQueries) {
    //* Add all of the intervals whose start time <= query
    while (index < intervals.length && intervals[index][0] <= query) {
      const [start, end] = intervals[index];

      if (start <= query) {
        PQ.enqueue([start, end, end - start + 1]);
      }

      index++; //* Don't enqueue the same interval again
    }

    //* Remove all of the outdated intervals (intervals whose end < query)
    while (!PQ.isEmpty() && PQ.peek()[1] < query) {
      PQ.dequeue();
    }

    //* If the PQ still contains intervals, the peek is the smallest size interval
    if (!PQ.isEmpty()) {
      results[i] = PQ.peek()[2]; //* Don't pop, we may have to reuse the same interval
    }
  }

  return results;
}

console.log(
  minInterval(
    [
      [1, 4],
      [2, 4],
      [3, 6],
      [4, 4],
    ],
    [2, 3, 4, 5]
  )
); //* [3, 3, 1, 4]

console.log(
  minInterval(
    [
      [2, 3],
      [2, 5],
      [1, 8],
      [20, 25],
    ],
    [2, 19, 5, 22]
  )
); //* [2, -1, 4, 6]

console.log(
  minInterval(
    [
      [1, 2],
      [3, 5],
    ],
    [2, 5]
  )
); //* [2, 3]

console.log(
  minInterval(
    [
      [1, 4],
      [5, 7],
      [4, 4],
      [10, 12],
      [3, 5],
    ],
    [3, 2, 1, 5, 4]
  )
); //* [3, 4, 4, 3, 1]

//* Time: O(n log n + q log q) - It takes O(n log n) to sort the intervals themselves
//* Then it takes O(q log q) to sort the queries (intervals.length is not necessarily = queries.length)
//* Grouping the queries with their index takes O(n), as does iterating over the queries list
//* Building the results takes O(q) since the results array scales with the number of queries we have
//* Each enqueue and dequeue takes O(log n) since there are "n" intervals
//* Everything else takes constant time (peek(), isEmpty())

//* Space: O(n) - Sorting uses O(n) memory if merge sort is used, but we also sort the queries, so O(q)
//* The priority queue can store all n intervals in the worst case, so the PQ can scale to a size of "n"
//* The indexedQueries array scales with the number of queries given O(q)
//* And finally the results array itself also scales with O(q)
