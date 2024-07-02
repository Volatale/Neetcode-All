class MyMaxHeap {
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
        this.swap(this.heap[leftChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = leftChild;
      }

      if (
        leftChild < length &&
        this.swap(this.heap[leftChild], this.heap[swapIndex]) < 0
      ) {
        leftChild = rightChild;
      }

      if (i === swapIndex) break;

      this.swap(i, swapIndex);
      i = swapIndex;
    }
  }
}

function furthestBuilding(heights, bricks, ladders) {
  const pq = new MyMaxHeap([], (a, b) => b - a); //* Max Heap of Bricks

  //* Avoid going out of bounds
  for (let i = 0; i < heights.length - 1; i++) {
    const diff = heights[i + 1] - heights[i];

    //* No resources needed
    if (diff <= 0) continue;

    //* Assume we need to use bricks
    bricks -= diff;
    pq.enqueue(diff);

    //* Used too many bricks, need to use a ladder
    if (bricks < 0) {
      if (ladders === 0) {
        return i; //* No resources left, can't make the jump
      }

      ladders--; //* Use the ladder instead
      bricks += pq.dequeue(); //* Number of Bricks we can SAVE
    }
  }

  //* You were able to traverse EVERY building
  return heights.length - 1;
}

console.log(furthestBuilding([4, 2, 7, 6, 9, 14, 12], 5, 1)); //* 4
console.log(furthestBuilding([4, 12, 2, 7, 3, 18, 20, 3, 19], 10, 2)); //* 7
console.log(furthestBuilding([14, 3, 19, 3], 17, 0)); //* 3
console.log(furthestBuilding([1, 1, 1, 1], 0, 0)); //* 3
console.log(furthestBuilding([1], 0, 0)); //* 0
console.log(furthestBuilding([1, 5, 1, 2, 3, 4, 10000], 4, 1)); //* 5

//* Time: O(n log n) - Enqueueing and dequeuing takes O(log n)
//* In the worst case, we do this "n" times, so (n  * log n) -> O(n log n)

//* Space: O(n) - The min heap can potentially store a difference for EACH building pair
