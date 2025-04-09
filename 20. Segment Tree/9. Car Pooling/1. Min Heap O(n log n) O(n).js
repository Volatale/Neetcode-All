//* Originally, we ONLY care about WHEN we can pick a passenger up
//* It makes sense to get the EARLY passengers first
//! Sort the trips by FROM (index 1) in ASCENDING order
//!     - The car cannot turn around, so we should pick up the passengers in ascending order
//! We can use a min heap since we have already sorted by pickup time
//*     - The heap sorts based on the DROP OFF time of the passengers
//* Track array pairs as [passengers, end]
//*     - Passengers = No. of Passengers we are pickup
//*     - End = Drop Off time
//* If totalPassengers += passengers > capacity
//*     - Return false
//* Before we do anything, immediately drop of all of the "expired" passengers in the heap
//*     - If peek()[1] <= trips[i][1], then this passenger should already be dropped off
//*     - [20, 30], [30, 40], here, the first set off passegers has already left
//! This is essentially an INTERVAL problem
//* If SUM of passengers currently in the <= capacity, we are fine
//*     - If there are trips happening simultaneously, we take the sum of the passengers on those trips
//*     - After an interval ENDS, we subtract the relevant passengers from the total
//* So we immediately remove all of the finished (CLOSED) intervals
//* And then handle the current (OPEN) interval
class PriorityQueue {
  #heap;
  #func;

  constructor(nums = [], func = (a, b) => a - b) {
    this.#heap = nums;
    this.#func = func;
    this.#heapify();
  }

  size() {
    return this.#heap.length;
  }

  isEmpty() {
    return this.#heap.length === 0;
  }

  peek() {
    if (this.#heap.length === 0) return undefined;
    return this.#heap[0];
  }

  #heapify() {
    for (let i = Math.floor((this.#heap.length - 2) / 2); i >= 0; i--) {
      this.#sinkDown(i);
    }
  }

  #swap(x, y) {
    [this.#heap[x], this.#heap[y]] = [this.#heap[y], this.#heap[x]];
  }

  enqueue(val) {
    this.#heap.push(val);
    this.#bubbleUp(this.#heap.length - 1);
  }

  #bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.#func(this.#heap[i], this.#heap[parent]) < 0) {
      this.#swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.#heap.length === 0) return undefined;

    this.#swap(0, this.#heap.length - 1);
    const popped = this.#heap.pop();
    this.#sinkDown(0);

    return popped;
  }

  #sinkDown(i) {
    const length = this.#heap.length;

    while (true) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      let swapIndex = i;

      if (
        leftChild < length &&
        this.#func(this.#heap[leftChild], this.#heap[swapIndex]) < 0
      ) {
        swapIndex = leftChild;
      }

      if (
        rightChild < length &&
        this.#func(this.#heap[rightChild], this.#heap[swapIndex]) < 0
      ) {
        swapIndex = rightChild;
      }

      if (i === swapIndex) break;

      this.#swap(i, swapIndex);
      i = swapIndex;
    }
  }
}

function carPooling(trips, capacity) {
  //* Sort trips by START time
  trips.sort((a, b) => a[1] - b[1]);

  let currPassengers = 0;

  //* PQ sorts by END time (in ASCENDING order)
  const PQ = new PriorityQueue([], (a, b) => a[1] - b[1]);

  for (const [passengers, start, end] of trips) {
    //* Remove all of the passengers that should already have left
    while (!PQ.isEmpty() && start >= PQ.peek()[1]) {
      currPassengers -= PQ.dequeue()[0];
    }

    //* Add current passengers to the vehicle
    currPassengers += passengers;
    if (currPassengers > capacity) return false; //* Can't make all of the trips

    PQ.enqueue([passengers, end]);
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
