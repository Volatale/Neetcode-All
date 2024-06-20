class PriorityQueue {
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

  values() {
    return this.heap;
  }

  peek() {
    return this.heap[0];
  }

  swap(x, y) {
    let temp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = temp;
  }

  insert(val) {
    this.heap.push(val);

    if (this.heap.length === 1) return this.heap;
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.heap[i] < this.heap[parent]) {
      this.swap(i, parent);

      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
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
      (leftChild < length && this.heap[i] > this.heap[leftChild]) ||
      (rightChild < length && this.heap[i] > this.heap[rightChild])
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild] < this.heap[rightChild]
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

class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.queue = new PriorityQueue();

    for (let num of nums) {
      this.add(num);
    }
  }

  add(val) {
    if (this.queue.length() < this.k) {
      this.queue.insert(val);
    } else if (this.queue.peek() < val) {
      this.queue.pop();
      this.queue.insert(val);
    }

    return this.queue.peek();
  }
}

//* Time: O(n log k) - We insert "n" elements into the heap to initialize
//* It takes O(log n) for insertion and deletion and we do this at most "k" times
//* O(log k) because the heap is limited to "k" space so there will only be "k" elements at once

//* Space: O(k) - The heap will only contain up to "k" elements at once
s;
