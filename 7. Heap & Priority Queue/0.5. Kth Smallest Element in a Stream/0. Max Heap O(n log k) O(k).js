class MaxHeap {
  constructor(values = []) {
    this.heap = [];

    for (let val of values) {
      this.insert(val);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  length() {
    return this.heap.length;
  }

  swap(x, y) {
    const temp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = temp;
  }

  peek() {
    if (this.heap.length === 0) return;
    return this.heap[0];
  }

  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return;

    this.swap(0, this.heap.length - 1);
    const popped = this.heap.pop();
    this.sinkDown(0);
    return popped;
  }

  sinkDown(i) {
    let leftChild = 2 * i + 1;
    let rightChild = 2 * i + 2;
    let length = this.heap.length;

    while (
      (leftChild < length && this.heap[i] < this.heap[leftChild]) ||
      (rightChild < length && this.heap[i] < this.heap[rightChild])
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild] > this.heap[rightChild]
      ) {
        this.swap(i, leftChild);
        i = leftChild;
      } else {
        this.swap(i, rightChild);
        i = rightChild;
      }

      leftChild = 2 * i + 1;
      rightChild = 2 * i + 2;
    }
  }
}

class KthSmallest {
  constructor(k, nums) {
    this.k = k;
    this.queue = new MaxHeap(k);

    for (let num of nums) {
      this.add(num);
    }
  }

  add(val) {
    if (this.queue.length() > this.k) {
      this.queue.insert(val);
    } else {
      this.queue.pop();
      this.queue.add();
    }

    return this.queue.peek();
  }
}
