class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyQueue {
  constructor(values = []) {
    this.front = null;
    this.back = null;
    this.length = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.length === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.length++;
  }

  dequeue() {
    if (this.length === 0) return undefined;

    const front = this.front;

    if (this.length === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.length--;
    return front.val;
  }
}

//* Use SPFA and get the distance array
//* If any value in the dist array is infinity
//*     - Return -1: we don't have a path from "k" to every other node
//* Otherwise, return the maximum value in the distance array
function networkDelayTime(times, n, k) {
  const queue = new MyQueue([k]);
  const inQueue = new Array(n + 1).fill(false);
  const dist = new Array(n + 1).fill(Infinity);
  const graph = new Array(n + 1).fill(0).map(() => new Array());

  let maxDistance = 0;

  dist[k] = 0; //* Distance from k (source) to itself is 0
  queue.enqueue([k]); //* Enqueue source node
  inQueue[k] = true; //* Node "k" is currently in queue

  //* Build the graph (directed)
  for (let [vertex, neighbor, weight] of times) {
    graph[vertex].push([neighbor, weight]);
  }

  //* SPFA
  while (!queue.isEmpty()) {
    const vertex = queue.dequeue();
    inQueue[vertex] = false; //* Vertex removed from queue

    //* Explore neighbors and relax edges if possible
    for (let [neighbor, weight] of graph[vertex]) {
      if (dist[neighbor] > dist[vertex] + weight) {
        dist[neighbor] = dist[vertex] + weight; //* New shortest path found

        //* Only enqueue nodes that are NOT currently in the queue
        if (!inQueue[neighbor]) {
          queue.enqueue(neighbor);
          inQueue[neighbor] = true;
        }
      }
    }
  }

  //* Find max distance and ensure we can reach every node
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1; //* node k does not have a path to node i
    maxDistance = Math.max(maxDistance, dist[i]);
  }

  return maxDistance;
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
