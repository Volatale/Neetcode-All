class MyPriorityQueue {
  constructor(values = [], func = (a, b) => b - a) {
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

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
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

//* Add the entire array to a priority queue
//* After completion, we have O(1) access to the top element
//* While there are 2 elements or more in the priority queue
//* We still have stones we can smash
//* Pop the top two and save them to variables
//* If x -  y > 0, it means the left stone still exists
//* Enqueue a new element of (x - y)
//* If that condition is NOT true, there aren't enough stones to smash
function lastStoneWeight(stones) {
  //* Gives us O(1) access to the top two stones
  const pq = new MyPriorityQueue(stones);

  //* While you have stones to smash (handles 0 or 1 left)
  while (pq.size() > 1) {
    //* Dequeue the two heaviest stones
    const x = pq.dequeue();
    const y = pq.dequeue();

    //* The left stone still exists; push the result
    if (x - y > 0) {
      pq.enqueue(x - y);
    }
  }

  return pq.isEmpty() ? 0 : pq.peek();
}

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1])); //* 1
console.log(lastStoneWeight([1, 1])); //* 0
console.log(lastStoneWeight([5])); //* 5
console.log(lastStoneWeight([100, 100, 100])); //* 100

//* Time: O(n log n) - It takes O(log n) to insert an element into the priority queue
//* We do this "n" times, so O(n log n)

//* Space: O(n) - The priority queue is initialized with "n" elements
