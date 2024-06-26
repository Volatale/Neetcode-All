class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(x, y) {
    const temp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = temp;
  }

  enqueue(val) {
    this.heap.push(val);
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

  dequeue() {
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

//* Same as the other one, but use LADDERS before BRICKS
function furthestBuilding(heights, bricks, ladders) {
  const pq = new MinHeap();

  for (let i = 0; i < heights.length - 1; i++) {
    const diff = heights[i + 1] - heights[i];

    //* No resources needed
    if (diff <= 0) continue;

    //* Add height difference to minHeap
    pq.enqueue(diff);

    //* If we have MORE height differences than ladders
    //* Use bricks for the smallest differences
    if (pq.size() > ladders) {
      bricks -= pq.dequeue();
    }

    //* We have no more bricks left
    if (bricks < 0) return i;
  }

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
