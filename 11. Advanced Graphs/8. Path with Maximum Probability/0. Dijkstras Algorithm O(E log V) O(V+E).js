class PriorityQueue {
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

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
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
function maxProbability(n, edges, succProb, start, end) {
  const graph = new Array(n).fill(0).map(() => new Array());
  const dist = new Array(n).fill(Infinity);

  //* [node, probability]: Compare based on the WEIGHT in DESCENDING order
  //* Probability of reaching starting node is 1 (100%)
  const PQ = new PriorityQueue([[start, 1]], (a, b) => b[1] - a[1]);
  dist[start] = 1;

  //* Build the undirected graph
  for (let i = 0; i < edges.length; i++) {
    const [vertex, neighbor] = edges[i];

    //* Push the neighbor and its weight
    graph[vertex].push([neighbor, succProb[i]]);
    graph[neighbor].push([vertex, succProb[i]]);
  }

  while (!PQ.isEmpty()) {
    const [vertex, probability] = PQ.dequeue();

    //* Found a path to the end
    if (vertex === end) return probability;

    //* Explore neighbors
    for (let [neighbor, weight] of graph[vertex]) {
      const newProbability = probability * weight;

      //* Try to relax the edge
      if (newProbability > dist[neighbor]) {
        dist[neighbor] = newProbability;
        PQ.enqueue([neighbor, dist[neighbor]]);
      }
    }
  }

  //* Found no path from start to end
  return 0;
}

console.log(
  maxProbability(
    3,
    [
      [0, 1],
      [1, 2],
      [0, 2],
    ],
    [0.5, 0.5, 0.2],
    0,
    2
  )
); //* 0.25000

console.log(
  maxProbability(
    3,
    [
      [0, 1],
      [1, 2],
      [0, 2],
    ],
    [0.5, 0.5, 0.3],
    0,
    2
  )
); //* 0.30000
