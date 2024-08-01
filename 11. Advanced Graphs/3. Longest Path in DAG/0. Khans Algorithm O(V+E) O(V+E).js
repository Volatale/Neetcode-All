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

function longestPathInDAG(n, edges, src) {
  const graph = new Array(n).fill(0).map(() => new Array());
  const indegree = new Array(n).fill(0);
  const queue = new MyQueue();
  const order = [];
  const dist = new Array(n).fill(-Infinity); //* NEGATIVE infinity
  dist[src] = 0;

  //* Build the graph and get the indegrees
  for (let [vertex, neighbor, weight] of edges) {
    graph[vertex].push([neighbor, weight]);
    indegree[neighbor]++;
  }

  //* Enqueue the source nodes (0 indegree)
  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) {
      queue.enqueue(i);
    }
  }

  //* Get the topological ordering
  while (!queue.isEmpty()) {
    const vertex = queue.dequeue();

    //* Add this vertex to the ordering
    order.push(vertex);

    //* Explore neighbors and decrement indegree
    for (let [neighbor, weight] of graph[vertex]) {
      indegree[neighbor]--;

      //* This node has no more prerequisites
      if (indegree[neighbor] === 0) {
        queue.enqueue(neighbor);
      }
    }
  }

  //! Reverse the ordering so we can just pop
  order.reverse();

  //* Calculate the distances using the topological ordering
  while (order.length > 0) {
    const vertex = order.pop();

    //* Relax neighboring edges, but we want to INCREASE the values
    for (let [neighbor, weight] of graph[vertex]) {
      if (dist[neighbor] < dist[vertex] + weight) {
        dist[neighbor] = dist[vertex] + weight;
      }
    }
  }

  return dist;
}

console.log(
  longestPathInDAG(
    3,
    [
      [0, 1, 7],
      [1, 2, 4],
    ],
    0
  )
); //* [0, 7, 11]

console.log(
  longestPathInDAG(
    8,
    [
      [0, 1, 4],
      [0, 2, 2],
      [0, 3, 1],
      [1, 4, 8],
      [2, 5, 9],
      [2, 6, 10],
      [3, 6, 3],
      [4, 7, 2],
      [5, 7, 3],
      [6, 7, 7],
    ],
    0
  )
); //* [0, 4, 2, 1, 12, 11, 12, 19]

//* Time: O(V+E) - It takes O(V+E) to get the topological ordering
//* Then it takes O(V+E) to relax all of the edges
