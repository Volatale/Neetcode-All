class MaxHeap {
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

  getValues() {
    return this.heap;
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

    while (i !== 0 && this.func(this.heap[parent], this.heap[i]) < 0) {
      this.swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  sinkDown(i) {
    let length = this.heap.length;

    while (true) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      let largest = i;

      if (
        leftChild < length &&
        this.func(this.heap[largest], this.heap[leftChild]) < 0
      ) {
        largest = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[largest], this.heap[rightChild]) < 0
      ) {
        largest = rightChild;
      }

      if (i === largest) break;

      this.swap(i, largest);
      i = largest;
    }
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }
}

const pq = new MaxHeap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const pq2 = new MaxHeap([1, 2, 3]);
const pq3 = new MaxHeap([1]);

console.log(pq.getValues()); //* [10, 9, 7, 8, 5, 6, 3, 1, 4, 2]
console.log(pq2.getValues()); //* [3, 2, 1]
console.log(pq3.getValues()); //* [1]
