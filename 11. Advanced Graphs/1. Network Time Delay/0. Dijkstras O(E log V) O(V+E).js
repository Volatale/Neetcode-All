class MyMinHeap {
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

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
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

//* We need to ensure we visit every node
//*     - Every node we visit, decrement n by 1
//* We are told to find the MINIMUM cost path
//*     - So we have a weighted graph
//* Naturally, we should use Dijkstra's Algorithm
//*     - Dijkstra's can handle positive edge weights
//*     - Time does not flow backwards, so the minimum = 0
//* Instead of using a dist array
//*     - Track the cummulative cost needed to get to every node
//* Since Dijkstra's uses a Priority Queue (min heap)
//*     - The final node we visit will up having the highest cost
function networkDelayTime(times, n, k) {
  const graph = new Array(n + 1).fill(0).map(() => new Array());
  const visited = new Array(n + 1).fill(false);

  //* Build the directed graph
  for (let [vertex, neighbor, weight] of times) {
    graph[vertex].push([neighbor, weight]);
  }

  //* [node, distance]: Comparator compares based on the DISTANCE
  const PQ = new MyMinHeap([[k, 0]], (a, b) => a[1] - b[1]);

  let timeTaken = 0;

  //* Perform Dijkstra's Algorithm
  while (!PQ.isEmpty()) {
    const [vertex, distance] = PQ.dequeue();

    //* Already visited
    if (visited[vertex]) continue;

    //* Reached a new node
    visited[vertex] = true;
    n--;

    //* Update the time taken
    timeTaken = distance;

    //* Signal has hit every node, anything beyond this point is redundant
    if (n === 0) return timeTaken;

    //* Explore neighbors and enqueue them for travel
    for (let [neighbor, weight] of graph[vertex]) {
      PQ.enqueue([neighbor, distance + weight]);
    }
  }

  //* Didn't visit every
  return -1;
}

console.log(
  networkDelayTime(
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    4,
    2
  )
); //* 2

console.log(networkDelayTime([[1, 2, 1]], 2, 1)); //* 1

console.log(
  networkDelayTime(
    [
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 4],
    ],
    4,
    1
  )
);

console.log(
  networkDelayTime(
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
      [4, 5, 2],
    ],
    5,
    2
  )
); //* 4

console.log(
  networkDelayTime(
    [
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 4],
    ],
    4,
    1
  )
); //* 4

console.log(
  networkDelayTime(
    [
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 4],
      [2, 5, 7],
    ],
    5,
    1
  )
); //* 9

//* Time: O(E log(V)) - Dijkstra's Algorithm takes O(E log(V)) to finish
//* Enqueuing and Dequeuing take O(log n) where "n" is the size of the PQ
//* It takes O(V+E) to build the graph

//* Space: O(V+E) - The graph uses O(V+E) space
//* The priority queue itself can potentially store every node at once
