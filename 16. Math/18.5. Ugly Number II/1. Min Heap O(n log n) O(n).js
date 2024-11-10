class MyPriorityQueue {
  constructor(values = [], func = (a, b) => a - b) {
    this.heap = values;
    this.func = func;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  #swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  enqueue(val) {
    this.heap.push(val);
    this.#bubbleUp(this.heap.length - 1);
  }

  #bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.func(this.heap[i], this.heap[parent]) < 0) {
      this.#swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.heap.length === 0) return undefined;

    this.#swap(0, this.heap.length - 1);
    const popped = this.heap.pop();
    this.#sinkDown(0);

    return popped;
  }

  #sinkDown(i) {
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

      this.#swap(i, swapIndex);
      i = swapIndex;
    }
  }
}

//* Use a min heap to have fast access to the minimum ugly number
//* Start from 1, then multiply the current ugly number by 2, 3 and 5
//*     - The min heap ensures the numbers are found in a monotonically increasing order
//* The set prevents us from enqueuing ugly numbers that have already been found
function nthUglyNumber(n) {
  //* Min Heap that tracks the largest (latest) ugly numbers
  const PQ = new MyPriorityQueue([1], (a, b) => a - b);
  const found = new Set([1]);

  //* Tracks the current number we are testing
  let ugly = 1;

  for (let i = 1; i <= n; i++) {
    //* Get the minimum ugly value
    ugly = PQ.dequeue();

    //* The next three possible ugly numbers
    const nextUgly = [ugly * 2, ugly * 3, ugly * 5];

    for (const num of nextUgly) {
      if (!found.has(num)) {
        found.add(num);
        PQ.enqueue(num);
      }
    }
  }

  //* Return the nth ugly number
  return ugly;
}

console.log(nthUglyNumber(3)); //* 3
console.log(nthUglyNumber(5)); //* 5
console.log(nthUglyNumber(10)); //* 12
console.log(nthUglyNumber(1)); //* 1
console.log(nthUglyNumber(100)); //* 1536
console.log(nthUglyNumber(8)); //* 9
console.log(nthUglyNumber(15)); //* 24
console.log(nthUglyNumber(32)); //* 90
console.log(nthUglyNumber(13)); //* 18

//* Time: O(n log n) - There are "n" outer iterations
//* Within each iteration, we dequeue the minimum ugly number (O(log n))
//* Then, we perform 3 iterations (a constant), folowed by an enqueue (O(log n))

//* Space: O(n) - The priority queue's size scales with the input size
//* The set also scales proportionally with the input size
