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
    let temp = this.heap[x];
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

    while (i !== 0 && this.heap[i][2] > this.heap[parent][2]) {
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
      (leftChild < length && this.heap[i][2] < this.heap[leftChild][2]) ||
      (rightChild < length && this.heap[i][2] < this.heap[rightChild][2])
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild][2] > this.heap[rightChild][2]
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
  const pq = new MaxHeap();

  //* Get the x and y coordinates of each point
  for (let [x, y] of points) {
    //* Euclidean Distance Algorithm
    const cSquared = x ** 2 + y ** 2;

    if (pq.length() < k) {
      //* cSquared gives us something to compare with
      pq.enqueue([x, y, cSquared]);
    } else if (x ** 2 + y ** 2 < pq.peek()[2]) {
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
); //* [[-2,2],[2,-2]]

//* Time: O(n log k) - Each insertion takes O(log k) time since the size is bounded by "k"
//* We do this "n" times, so O(n log k)
//* Iterating through the input array takes O(n) time
//* Then it takes O(k) time to get the top "k" smallest elements

//* Space: O(k) - There will only ever be "k" elements in the priority queue at once
