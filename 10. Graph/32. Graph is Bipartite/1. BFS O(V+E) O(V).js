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

//* Use an array to represent the values in each set
//*     - Use -1 and +1 to identify which nodes are in which set
//* Perform a BFS because we need go ensure neighbors are processed first
//* If both vertex and neighbor have been visited (parify[i] !== 0)
//*     - If the values match, they exist in the same set
//!     - And they are also adjacent, therefore the graph is NOT bipartite
//* Set the neighbors of the current node to be the opposite of the current
//* We aren't guaranteed to have a connected graph
//*     - So attempt to perform the BFS on every vertex
//* If ANY BFS returns false, the graph is not bipartite
function isBipartite(graph) {
  function bfs(vertex) {
    //* It has already been visited, but graph could still be bipartite
    if (parity[vertex]) return true;

    const queue = new MyQueue([vertex]);
    parity[vertex] = -1; //* Mark as visited

    //* Perform BFS
    while (!queue.isEmpty()) {
      const vertex = queue.dequeue();

      //* Explore neighbors
      for (let neighbor of graph[vertex]) {
        //* Both visited, and they have the same "color"; not bipartite
        if (parity[vertex] && parity[neighbor] === parity[vertex]) {
          return false;
        }

        //* Only do this if the neighbor has NOT been visited
        if (!parity[neighbor]) {
          //* Set to the opposite: -1 * -1 = 1 ...  1 * -1 = -1
          parity[neighbor] = -1 * parity[vertex];
          queue.enqueue(neighbor);
        }
      }
    }

    return true;
  }

  const parity = new Array(graph.length).fill(0);

  //* Graph could be disconnected, try BFS from EVERY node
  for (let i = 0; i < graph.length; i++) {
    if (!bfs(i)) return false; //* Graph is not bipartite
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
); //* True

console.log(
  isBipartite([
    [1, 2, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ])
); //* False

//* Time: O(V+E) - We perform a BFS and traverse every node and edge
//* So the time taken scales with the number of vertices and edges

//* Space: O(V) - In the worst case, the queue stores every vertex in the graph
