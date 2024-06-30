class MinHeap {
  constructor(values = [], func = (a, b) => a[1] - b[1]) {
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

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
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
      let smallest = i;

      if (
        leftChild < length &&
        this.func(this.heap[leftChild], this.heap[smallest]) < 0
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[rightChild], this.heap[smallest]) < 0
      ) {
        smallest = rightChild;
      }

      if (i === smallest) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }
}

function carPooling(trips, capacity) {
  //* Sort based on FROM (index 1)
  trips.sort((a, b) => a[1] - b[1]);

  let currPassengers = 0;
  const pq = new MinHeap();

  for (let [numPass, start, end] of trips) {
    //* Look at the "end" value of the "peek" trip
    //* If it is <= start, THAT TRIP HAS FINISHED
    while (!pq.isEmpty() && pq.peek()[1] <= start) {
      //* Remove the passengers from vehicle; their trip ended
      currPassengers -= pq.dequeue()[0];
    }

    //* Add passengers to vehicle
    currPassengers += numPass;
    if (currPassengers > capacity) return false;

    //* PQ will compare using the "end" value
    pq.enqueue([numPass, end]);
  }

  return true;
}

console.log(
  carPooling(
    [
      [2, 1, 5],
      [3, 3, 7],
    ],
    4
  )
);

console.log(
  carPooling(
    [
      [2, 1, 5],
      [3, 3, 7],
    ],
    5
  )
);
