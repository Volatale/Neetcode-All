class MyMinHeap {
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

//* We want easy access to the MINIMUM numbered seat
//* So this is an optimization problem (greedy in this case)
//* Use a min heap of "n" length to have fast access to the smallest numbered seat
//* Initialize the heap (array) with all "n" seats available since that is what is asked
//* Heapify so don't have to build the heap from scratch in O(n log n)
//* When we reserve, just dequeue; that gives us the smallest numbered seat
//* If you unreserve, enqueue the seatNumber back to the heap
//* If 1 was reserved and then unreserved
//* The heap invariant will be maintained moving 1 back to the top of the heap
class SeatManager {
  constructor(n) {
    this.seats = n;
    this.pq = new MyMinHeap(this.createSeats(), (a, b) => a - b);
  }

  createSeats() {
    const seats = [];

    for (let i = 1; i <= this.seats; i++) {
      seats.push(i);
    }

    return seats;
  }

  //* Gets the smallest numbered seat (the top element)
  reserve() {
    return this.pq.dequeue();
  }

  //* Adds the seat back to the pool
  unreserve(seatNumber) {
    this.pq.enqueue(seatNumber);
  }
}

const seatManager = new SeatManager(5);
console.log(seatManager.reserve());
console.log(seatManager.reserve());
console.log(seatManager.unreserve(2));
console.log(seatManager.reserve());

//* Time: O(n) - It takes O(n) to initialize the heap
//* Enqueuing and Dequeuing take O(n) time

//* Space: O(n) - The size of the heap scales with the number of seats (n)
