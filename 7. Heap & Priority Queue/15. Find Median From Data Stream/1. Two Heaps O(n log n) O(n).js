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
  }

  addNum(num) {
    //* By default, we enqueue to maxHeap
    //* Max Heap stores the smaller of the elements
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.enqueue(num);
    } else {
      //* MinHeap stores the larger of the elements
      this.minHeap.enqueue(num);
    }

    //* Balance the heaps after insertion; difference in size should not exceed one
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.enqueue(this.maxHeap.dequeue());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.enqueue(this.minHeap.dequeue());
    }
  }

  findMedian() {
    if (this.maxHeap.size() === this.minHeap.size()) {
      return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    } else {
      //* Max heap will have 1 extra element, so return that one
      return this.maxHeap.peek();
    }
  }
}
