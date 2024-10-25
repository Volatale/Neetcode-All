class MyPriorityQueue {
  constructor(values = [], func = (a, b) => a - b) {
    this.heap = values;
    this.func = func;
    // this.heapify();
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
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

//* We need to maintain fast access to the room that will clear earliest
//*     - Use a priority queue for this purpose
//* The number of elements in the priority queue at any given moment = number of rooms used
//* The priority queue (min heap) will track END times
//* We always enqueue to take up a room regardless of whether we dequeued (freed a room) or not
function meetingRoomsII(intervals) {
  //* There is only ever going to be 1 room needed
  if (intervals.length === 1) return 1;

  //* Sort based on the start time, and then end time as a fallback
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  //* Tracks earliest end time, number of elements in PQ = number of rooms in use
  const PQ = new MyPriorityQueue([intervals[0][1]], (a, b) => a - b);

  //* Look for overlapping intervals
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    //* There is no overlap, so we can free a room (by popping)
    if (start >= PQ.peek()) {
      PQ.dequeue();
    }

    //* Assign a room
    PQ.enqueue(end);
  }

  //* Number of rooms in use
  return PQ.size();
}

console.log(
  meetingRoomsII([
    [0, 30],
    [5, 10],
    [15, 20],
  ])
); //* 2

console.log(
  meetingRoomsII([
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [8, 10],
  ])
); //* 4

console.log(
  meetingRoomsII([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
); //* 1

console.log(
  meetingRoomsII([
    [0, 2],
    [2, 6],
    [4, 8],
    [8, 10],
  ])
); //* 2

//* Time: O(n log n) - Sorting takes O(n log n) time, and it takes O(n) to iterate over every interval
//* Dequeuing from the priority queue takes O(log n), and if we do this "n" times we get n * log n = O(n log n)

//* Space: O(n) - Sorting uses O(n) space on average due to merge sort, and the priority queue uses O(n) space in the worst case
//* If every interval overlaps, the priority queue's size scales linearly
