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

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i++) {
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

//* (Eucliean Distance -> sqrt((x2 - x1)^2 + (y2 - y1)^2))
//* Essentially computing Pythagoras; a^2 + b^2 = c^2

//* Use a Max Heap; pop the top "k" elements
//* The x ** 2 + y ** 2 formula allows us to calculate c^2 (pythagoras)
//* We need a way to compare for the priority queue to work properly
//* Push the "c" result along with the [x, y] coordinates
//* Then use the "c" result to compare with parents for ordering
//* If the size of the queue < k, just keep adding
//* Else, if the top < peek()[2], then pop the top
//* We have a smaller value to add
//* Essentially, we maintain a priority queue of the top "k" minimum elements
function kClosestPointsToOrigin(points, k) {
  const results = [];

  //* Add every element to the Max Heap (priority queue)
  const pq = new MyMaxHeap([], (a, b) => b[2] - a[2]);

  //* Get the x and y coordinates of each point
  for (let [x, y] of points) {
    //* Euclidean Distance Algorithm
    const cSquared = x ** 2 + y ** 2;

    if (pq.size() < k) {
      //* cSquared gives us something to compare with
      pq.enqueue([x, y, cSquared]);
    } else if (cSquared < pq.peek()[2]) {
      //* Found an element smaller than the top
      pq.dequeue();
      pq.enqueue([x, y, cSquared]);
    }
  }

  //* Find the "k" closest points to origin
  for (let i = 0; i < k; i++) {
    const [x, y] = pq.dequeue();
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
); //* [[-2, 2], [2, -2]]

//* Time: O(n log k) - Each insertion takes O(log k) time since the size is bounded by "k"
//* We do this "n" times, so O(n log k)
//* Iterating through the input array takes O(n) time
//* Then it takes O(k) time to get the top "k" smallest elements

//* Space: O(k) - There will only ever be "k" elements in the priority queue at once
