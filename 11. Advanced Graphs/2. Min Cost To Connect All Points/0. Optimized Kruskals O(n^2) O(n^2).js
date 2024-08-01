class UnionFind {
  constructor(size) {
    this.parent = new Array(size).fill(0);
    this.rank = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  find(x) {
    if (x === this.parent[x]) return this.parent[x];

    this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  find(x) {
    let root = x;

    while (root !== this.parent[root]) {
      const parent = this.parent[root];
      this.parent[root] = this.parent[parent];
      root = this.parent[root];
    }

    return root;
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    //* Union would create cycle
    if (rootX === rootY) return false;

    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    //* Successful Union
    return true;
  }
}

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

//* We initially have no edges
//!     - Get the manhattan distance of every pair of points (vertices)
//!         - [x, y, distance]
//* Use Kruskal's Algorithm to get the minimum cost
//* But instead of sorting outright, heapify using a priority queue
//* Whenever we need the minimum edge, we can just dequeue
//* Then we attempt to union edges if possible
function minCostConnectPoints(points) {
  const UF = new UnionFind(points.length);
  const edges = [];

  let visited = 0;
  let minCost = 0;

  //* Get the manhanttan distance between every pair of points
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];

      //* The Manhattan Distance is the cost of each edge
      const distance = Math.abs(x2 - x1) + Math.abs(y2 - y1);

      //* [pointA, pointJ, manhattanDistance]
      edges.push([i, j, distance]);
    }
  }

  //* Instead of sorting for Kruskals, heapify the edges
  //* This is more efficient for dense graphs
  const PQ = new MyPriorityQueue(edges, (a, b) => a[2] - b[2]);

  while (!PQ.isEmpty()) {
    const [vertex, neighbor, cost] = PQ.dequeue();

    //* Only union if we wouldn't create a cycle
    if (UF.union(vertex, neighbor)) {
      minCost += cost;
      visited++;
    }

    //* Any other edges will result in cycles
    if (visited === points.length - 1) return minCost;
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

//* Time: O(n^2) - It takes O(n * (n-1) / 2) to get every pair's distance, so O(n^2)
//* It takes O(n) to heapify the edges (we aren't sorting)
//* The union process takes O(E * α(n)) since there are E edges and union/find take α(n)

//* Space: O(n^2) - We essentially create a complete graph, so the total no. of edges is n * (n-1) / 2
//* The priority queue will also store every edge on creation
