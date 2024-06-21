class MaxHeap {
  constructor(values = []) {
    this.heap = [];

    for (let val of values) {
      this.enqueue(val);
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

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.heap[i] > this.heap[parent]) {
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
    const length = this.heap.length;

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
  const pq = new MaxHeap(stones);

  //* While you have stones to smash (handles 0 or 1 left)
  while (pq.length() > 1) {
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
