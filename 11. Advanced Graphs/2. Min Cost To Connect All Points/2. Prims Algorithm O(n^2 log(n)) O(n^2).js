class MyPriorityQueue {
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

//* Each point is a vertex on a graph
//* Get the distance between every pair of points
//* Use those as the edges between points (vertices)
//* We want to get the minimum spanning tree cost
//*     - Use Kruskal's or Prim's Algorithm
//!     - Here, we are using Prim's
//* Start at point 0
//* Every time we dequeue a node, ensure it has not been visited
//* Accumulate all of the edge costs (they will always be visited in ascending order)
//* Once we have visited every vertex, we know we have the MST cost
function minCostConnectPoints(points) {
  const graph = new Array(points.length).fill(0).map(() => new Array());
  const visited = new Set();
  let minCost = 0;

  //* Get every pair of points
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];

      //* Get Manhattan Distance of every point
      const distance = Math.abs(x2 - x1) + Math.abs(y2 - y1);

      //* Make the undirected edges
      graph[i].push([j, distance]);
      graph[j].push([i, distance]);
    }
  }

  //* [node, cost]: sort based on the weights
  const PQ = new MyPriorityQueue([[0, 0]], (a, b) => a[1] - b[1]);

  //* Prim's Algorithm
  while (!PQ.isEmpty()) {
    const [vertex, cost] = PQ.dequeue();

    if (visited.has(vertex)) continue;

    visited.add(vertex);
    minCost += cost; //* Use this edge in the MST

    //* Optimization: any other edge creates a cycle
    if (visited.size === points.length) return minCost;

    //* Explore neighbors
    for (let [neighbor, weight] of graph[vertex]) {
      if (!visited.has(neighbor)) {
        PQ.enqueue([neighbor, weight]);
      }
    }
  }

  return minCost;
}

console.log(
  minCostConnectPoints([
    [0, 0],
    [2, 2],
    [3, 10],
    [5, 2],
    [7, 0],
  ])
); //* 20

console.log(
  minCostConnectPoints([
    [3, 12],
    [-2, 5],
    [-4, 1],
  ])
); //* 18

//* Time: O(n^2 * log(n)) - It takes O(n^2) to get the Manhattan Distance between every pair of points
//* We have a complete graph, so every vertex (point) has an edge to every other vertex
//* Prim's Algorithm uses a priority queue, so enqueue and dequeue take O(log n)
//* In the absolute worst case, there are n^2 enqueues and dequeues
//* So O(n^2) + O(n^2 * log(n))

//* Space: O(n^2) - There are n * (n-1) / 2 edges, so O(n^2)
//* The priority queue can also potentially store all of these edges
