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

//* Apply the Edmonds-Karp Algorithm
function edmondsKarp(n, edges, source, sink) {
  function bfs(source, sink) {
    const parent = new Array(n).fill(-1);
    const queue = new MyQueue([source]);
    const visited = new Array(n).fill(false);
    visited[source] = true;

    //* Perform BFs
    while (!queue.isEmpty()) {
      const vertex = queue.dequeue();

      //* Found a path, retrace our steps
      if (vertex === sink) {
        const path = [sink];
        let index = sink;

        while (index !== source) {
          index = parent[index];
          path.push(index);
        }

        return path.reverse();
      }

      //* Explore neighbor(s) if residual capacity > 0
      for (let i = 0; i < graph[vertex].length; i++) {
        if (!visited[i] && graph[vertex][i] > 0) {
          parent[i] = vertex; //* Set the parent of neighbor = vertex
          visited[i] = true;
          queue.enqueue(i);
        }
      }
    }

    //* There was no path from source to sink
    return null;
  }

  const graph = new Array(n).fill(0).map(() => new Array(n).fill(0));

  //* graph[i][j] = Residual Capacity of edge (u, v)
  //* graph[j][i] = Residual Capacity of edge (v, u)
  for (const [vertex, neigbor, capacity] of edges) {
    graph[vertex][neigbor] = capacity;
  }

  let maxFlow = 0;
  let path = bfs(source, sink);

  //* While there exists an augmenting path
  while (path) {
    let pathFlow = Infinity;

    //* Find the bottleneck (minimum residual capacity)
    for (let i = 0; i < path.length - 1; i++) {
      const vertex = path[i];
      const neighbor = path[i + 1];

      pathFlow = Math.min(pathFlow, graph[vertex][neighbor]);
    }

    //* Augment the flow of all edges in the augmenting path by the bottleneck
    for (let i = 0; i < path.length - 1; i++) {
      const vertex = path[i];
      const neighbor = path[i + 1];

      //* Residual Capacity = Capacity - Flow
      graph[vertex][neighbor] -= pathFlow; //* Decrease flow on forward edge
      graph[neighbor][vertex] += pathFlow; //* Increase flow on reverse edge
    }

    maxFlow += pathFlow;
    path = bfs(source, sink);
  }

  return maxFlow;
}

console.log(
  edmondsKarp(
    4,
    [
      [0, 1, 7],
      [0, 2, 4],
      [1, 3, 7],
      [2, 3, 4],
    ],
    0,
    3
  )
); //* 11

console.log(
  edmondsKarp(
    4,
    [
      [0, 1, 4],
      [0, 2, 7],
      [1, 3, 5],
      [2, 3, 6],
    ],
    0,
    3
  )
); //* 10

console.log(
  edmondsKarp(
    6,
    [
      [0, 1, 3],
      [0, 2, 7],
      [1, 3, 3],
      [1, 4, 4],
      [2, 1, 5],
      [2, 4, 3],
      [3, 4, 3],
      [3, 5, 2],
      [4, 5, 6],
    ],
    0,
    5
  )
); //* 8

//* Time: O(V*E^2) - V = vertices, E = edges
//* Each BFS runs in O(E) time
//* The number of Augmenting Paths we can find is bounded by O(V*E)

//* Space: O(n^2) - The adjacency matrix uses O(n^2) space
//* The parent array, path array, visited array and queue all scale with the number of vertices
