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

//* Perform BFS on every node since we may have a disconnected graph
//* Assign the source node to set 0
//* Explore the neighbors and set them to 0 ^ 1
//*     - Only process the neighbors that have NOT been visited
//* If color[vertex] === color[neighbor]
//!     - The graph is not bipartite
//!     - We have adjacent vertices that are in the same set
function isBipartite(graph) {
  const color = {};

  for (let vertex = 0; vertex < graph.length; vertex++) {
    if (color.hasOwnProperty(vertex)) continue;

    //* If vertex is unvisited
    color[vertex] = 0;

    //* Perform BFS
    const queue = new MyQueue([vertex]);

    while (!queue.isEmpty()) {
      const vertex = queue.dequeue();

      for (let neighbor of graph[vertex]) {
        //* Graph is not bipartite; adjacent vertices exist in the same set
        if (color[vertex] === color[neighbor]) return false;

        //* If the neighbor has not been visited yet
        if (!color.hasOwnProperty(neighbor)) {
          queue.enqueue(neighbor);
          color[neighbor] = color[vertex] ^ 1; //* 0 > 1 ... 1 > 0
        }
      }
    }
  }

  //* Graph is bipartite
  return true;
}

console.log(
  isBipartite([
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ])
);

//* Time: O(V+E) - For every vertex, we explore all the edges
//* So the time taken scales with the number of vertices and edges

//* Space: O(V) - The color object stores every vertex
