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

function findOrder(numCourses, prerequisites) {
  const graph = new Array(numCourses).fill(0).map(() => new Array());
  const indegrees = new Array(numCourses).fill(0);
  const queue = new MyQueue();
  const path = [];

  let visited = 0;

  //* Build the graph and get the indegrees of each node
  for (let [vertex, neighbor] of prerequisites) {
    graph[neighbor].push(vertex);
    indegrees[vertex]++;
  }

  //* Enqueue all of the 0-indegree nodes (source nodes)
  for (let i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 0) {
      queue.enqueue(i);
    }
  }

  //* BFS
  while (!queue.isEmpty()) {
    const vertex = queue.dequeue();
    visited++;

    //* Add to the topological sort
    path.push(vertex);

    //* Decrement indegree of all neighbor nodes
    for (let neighbor of graph[vertex]) {
      indegrees[neighbor]--;

      //* This neighbor has no more prerequisites left; enqueue it
      if (indegrees[neighbor] === 0) {
        queue.enqueue(neighbor);
      }
    }
  }

  //* There was a cycle; unable to topologically sort
  if (visited !== numCourses) return [];

  return path;
}

console.log(findOrder(2, [[1, 0]]));
console.log(
  findOrder(5, [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [3, 4],
  ])
);

console.log(
  findOrder(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])
);

//* Time: O(V+E) - It takes O(V+E) time to process every vertex and neighbor

//* Space: O(V+E) - We store every vertex and neighbor in the graph
