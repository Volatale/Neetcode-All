class MinHeap {
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

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
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

class MaxHeap {
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

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
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

    while (i !== 0 && this.func(this.heap[parent], this.heap[i]) < 0) {
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
        this.func(this.heap[smallest], this.heap[leftChild]) < 0
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[smallest], this.heap[rightChild]) < 0
      ) {
        smallest = rightChild;
      }

      if (i === smallest) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }
}

class MedianFinder {
  constructor() {
    this.minHeap = new MinHeap();
    this.maxHeap = new MaxHeap();
    this.even = true;
  }

  //* Alternate between pushing to min or max
  addNum(num) {
    if (this.even) {
      this.maxHeap.enqueue(num);
      this.minHeap.enqueue(this.maxHeap.dequeue());
    } else {
      this.minHeap.enqueue(num);
      this.maxHeap.enqueue(this.minHeap.dequeue());
    }

    this.even = !this.even;
  }

  findMedian() {
    if (this.minHeap.size() == this.maxHeap.size()) {
      //* The two peeks are the middle values
      return (this.minHeap.peek() + this.maxHeap.peek()) / 2.0;
    } else {
      //* The peek of minHeap is the middle value
      return this.minHeap.peek();
    }
  }
}

const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
medianFinder.addNum(3);

debugger;
console.log(medianFinder.findMedian());
