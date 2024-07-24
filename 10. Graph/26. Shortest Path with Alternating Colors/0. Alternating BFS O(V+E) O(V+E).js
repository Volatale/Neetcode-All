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

//* The aim is to find the SHORTEST PATH from source to target
//*     - Use BFS
//* Assume we are unable to reach any node
//*     - Initialize result with "n" values of -1

//* We were given TWO edge lists, so build TWO graphs
//* We can't take the SAME colored edge twice in a row
//*     - Track the edge we took to get to the current node
//*     - Store it within a tuple because each is specific to that route

//* START at node 0
//*     - We took no edge to get here, so the prevColor starts as null
//*     - The distance is 0 and the node itself is 0
//* When tracking visited, we can visit each node TWICE
//*     - Once for each color, so we have to pay attention to the edge color too
//*         - Visiting node 2 with a BLUE edge shouldn't mean we can't visit with a RED edge next time
//* BFS
//*     - If prevColor !== "red"
//*         - Take the RED edge
//*     - If prevColor !== "blue"
//*          - Take the BLUE edge
//*     - The FIRST time we reach a node, it is guaranteed to be the SHORTEST path (BFS)
function shortestAlternatingPaths(n, redEdges, blueEdges) {
  //* We were given TWO edge lists, so build TWO graphs
  const red = buildGraph(n, redEdges);
  const blue = buildGraph(n, blueEdges);

  //* [node, distance, prevColor]. No edge was taken to get to 0
  const queue = new MyQueue([[0, 0, null]]);

  //* Assume we can't reach ANY node
  const answer = new Array(n).fill(-1);

  //* Track the node and the edge taken to reach it
  //* We can visit a node ONCE for EACH COLOR (red and blue = twice)
  const visited = new Set();
  visited.add(`${0}-${null}`);

  while (!queue.isEmpty()) {
    const [vertex, distance, prevColor] = queue.dequeue();

    //* This is BFS, so the FIRST time we reach a node it is the SHORTEST PATH / distance
    if (answer[vertex] === -1) {
      answer[vertex] = distance;
    }

    //* Take the red edge
    if (prevColor !== "red") {
      for (let neighbor of red[vertex]) {
        if (!visited.has(`${neighbor}-red`)) {
          queue.enqueue([neighbor, distance + 1, "red"]);
          visited.add(`${neighbor}-red`);
        }
      }
    }

    //* Take the blue edge
    if (prevColor !== "blue") {
      for (let neighbor of blue[vertex]) {
        if (!visited.has(`${neighbor}-blue`)) {
          queue.enqueue([neighbor, distance + 1, "blue"]);
          visited.add(`${neighbor}-blue`);
        }
      }
    }
  }

  return answer;
}

function buildGraph(n, edges) {
  const graph = new Array(n).fill(0).map(() => new Array());

  for (let [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
  }

  return graph;
}

console.log(
  shortestAlternatingPaths(
    3,
    [
      [0, 1],
      [1, 2],
    ],
    []
  )
); //* [0, 1, -1]

console.log(shortestAlternatingPaths(3, [[0, 1]], [[2, 1]])); //* [0, 1, -1]

//* Time: O(V+E) - The graphs themselves take O(V+E) time to build (and there are two of them)
//* Then, we perform a BFS for each of the graphs
//* In the worst case, both of them traverse every node

//* Space: O(V+E) - We build two graphs that scale with "n"
//* The queue stores up to "V" nodes at once
