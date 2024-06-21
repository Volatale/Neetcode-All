class MinHeap {
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

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.heap[i][2] < this.heap[parent][2]) {
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
      (leftChild < length && this.heap[i][2] > this.heap[leftChild][2]) ||
      (rightChild < length && this.heap[i][2] > this.heap[rightChild][2])
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild][2] < this.heap[rightChild][2]
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

//* (Eucliean Distance -> sqrt((x2 - x1)^2 + (y2 - y1)^2))
//* Essentially computing Pythagoras; a^2 + b^2 = c^2

//* Use a Min Heap; pop the top "k" elements
//* The x ** 2 + y ** 2 formula allows us to calculate c^2 (pythagoras)
//* We need a way to compare for the priority queue to work properly
//* Push the "c" result along with the [x, y] coordinates
//* Then use the "c" result to compare with parents for ordering
function kClosestPointsToOrigin(points, k) {
  const results = [];

  //* Add every element to the Min Heap (priority queue)
  const pq = new MinHeap();

  //* Add every element to the queue, with the additional c^2 variable
  for (let [x, y] of points) {
    const cSquared = x ** 2 + y ** 2;
    pq.enqueue([x, y, cSquared]);
  }

  //* Add the top "k" elements to the results array
  for (let i = 0; i < k; i++) {
    const [x, y] = pq.dequeue(); //* ONLY get the coordinates
    results.push([x, y]);
  }

  return results;
}

console.log(
  kClosestPointsToOrigin(
    [
      [1, 3],
      [-2, 2],
    ],
    1
  )
); //* [[-2, 2]]

console.log(
  kClosestPointsToOrigin(
    [
      [3, 3],
      [5, -1],
      [-2, 4],
    ],
    2
  )
); //* [[3, 3], [-2, 4]]

console.log(
  kClosestPointsToOrigin(
    [
      [1, 3],
      [-2, 2],
      [2, -2],
    ],
    2
  )
); //* [[-2,2],[2,-2]]

//* Time: O(n log n) - It takes O(log n) to insert into a priority queue
//* We do this "n" times (one for each element)
//* Then it takes O(k) time to pop the top "k" elements (but k <= n)

//* Space: O(n) - The Min Heap stores every element in the input
