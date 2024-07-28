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

//* equations[i] = edge from vertex to neighbor
//* values[i] = weight of equation[i] edge
//* queries[i] = Find path from u to v

//* We can't just solve for every variable and answer queries
//!     - We don't have enough equations
//* Check if there is a path from point a to point b
//* If a path from a to c exists ... c to a must ALSO exist
//!     - Therefore we also need REVERSE EDGES

//* Division by 0 won't appear
//* x cannot simultaneously be multiple values at once
//!     - This means no contradictions
function evaluateDivision(equations, values, queries) {
  function bfs(source, dest) {
    //* [vertex, total]
    const queue = new MyQueue([[source, 1]]);
    const visited = new Set();

    while (!queue.isEmpty()) {
      const [vertex, total] = queue.dequeue();

      //* Successfully found a path from source to destination
      if (vertex === dest) return total;

      //* Explore neighbors
      for (let [neighbor, weight] of graph[vertex]) {
        if (!visited.has(neighbor)) {
          //* Multiply the current total with the edge weight
          queue.enqueue([neighbor, total * weight]);
          visited.add(vertex);
        }
      }
    }

    //* No path to destination
    return -1;
  }

  //* Assume no query can be answered
  const results = new Array(queries.length).fill(-1);

  const graph = {};
  let index = 0; //* Used to map the equation to the correct value

  for (let [vertex, neighbor] of equations) {
    //* Stores the regular edges
    if (!graph[vertex]) {
      graph[vertex] = [];
    }

    //* Stores the reverse edges
    if (!graph[neighbor]) {
      graph[neighbor] = [];
    }

    //* Create the forward edge and reverse edge
    graph[vertex].push([neighbor, values[index]]); //* a / b
    graph[neighbor].push([vertex, 1 / values[index]]); //* b / a
    index++; //* Move to the next value
  }

  //* Answer the queries
  for (let i = 0; i < queries.length; i++) {
    const [source, destination] = queries[i];

    //* There cannot possibly be a path from a to b
    if (!graph[source] || !graph[destination]) continue;

    if (source === destination) {
      results[i] = 1; //* n / n = 1
    } else {
      results[i] = bfs(source, destination); //* Either -1 or the result
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

//* Time: O(n * V+E) - It takes O(V+E) time to build the graph
//* We have to perform a BFS for each query
//* In the worst case, every query results in an exploration of every vertex/edge

//* Space: O(V+E) - It takes O(V+E) to store every vertex and edge
//* The queue itself can store up to V elements at once
