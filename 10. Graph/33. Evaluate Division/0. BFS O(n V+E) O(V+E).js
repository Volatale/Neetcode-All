class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyQueue {
  constructor(values = []) {
    this.front = null;
    this.tail = null;
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

//!     - We don't have enough equations
//* Check if there is a path from point a to point b
//* if path from a to c exists ... c to a must ALSO exist
//!     - We need REVERSE EDGES TOO

//* equations[i] = edge from vertex to neighbor
//* values[i] = weight of equation[i] edge
//* queries[i] = Find path from u to v

//* n / 0 will not appear
//* x cannot simultaneously be multiple values at once
//!     - This means no contradictions
function evaluateDivision(equations, values, queries) {
  const results = new Array(queries.length).fill(-1);
  const graph = {};

  let index = 0;
  for (let [vertex, neighbor] of equations) {
    if (!graph[vertex]) {
      graph[vertex] = [];
    }

    if (!graph[neighbor]) {
      graph[neighbor] = [];
    }

    graph[vertex].push([neighbor, values[index]]);
    graph[neighbor].push([vertex, 1 / values[index]]);
    index++;
  }

  function bfs(start, end) {
    const queue = new MyQueue([[start, 1]]);
    const visited = new Set();

    while (!queue.isEmpty()) {
      const [curr, cost] = queue.dequeue();
      visited.add(curr);

      if (curr === end) return cost;

      for (const [neighbor, weight] of graph[curr]) {
        if (!visited.has(neighbor)) {
          queue.enqueue([neighbor, cost * weight]);
        }
      }
    }

    return -1;
  }

  for (let i = 0; i < queries.length; i++) {
    const [vertex, neighbor] = queries[i];

    if (!graph[vertex] || !graph[neighbor]) continue;

    if (vertex === neighbor) {
      results[i] = 1;
    } else {
      results[i] = bfs(vertex, neighbor);
    }
  }

  return results;
}

console.log(
  evaluateDivision(
    [
      ["a", "b"],
      ["b", "c"],
    ],
    [2.0, 3.0],
    [
      ["a", "c"],
      ["b", "a"],
      ["a", "e"],
      ["a", "a"],
      ["x", "x"],
    ]
  )
);
