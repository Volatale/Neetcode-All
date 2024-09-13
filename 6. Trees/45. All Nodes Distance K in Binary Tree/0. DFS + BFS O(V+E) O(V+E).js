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

    for (const val of values) {
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

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* If we had access to a graph (and not a tree specifically)
//*     - It would be easy to just perform a BFS and track the distance from the source
//* So why not just do that?
//*     - Perform a DFS or BFS and create the adjacency list
//*     - Then, perform a BFS and return an array of all of the nodes that are "k" distance away
function findNodesKDistanceFromTarget(root, target, k) {
  function buildGraph(curr, prev) {
    if (curr === null) return;

    //* Make sure we have a list to store edges
    if (!graph[curr.val]) {
      graph[curr.val] = [];
    }

    if (curr.left) {
      graph[curr.val].push(curr.left.val);
    }

    if (curr.right) {
      graph[curr.val].push(curr.right.val);
    }

    if (prev !== null) {
      graph[curr.val].push(prev.val);
    }

    buildGraph(curr.left, curr);
    buildGraph(curr.right, curr);
  }

  const graph = {};

  //* [node, distance from target]
  const queue = new MyQueue([target.val]);
  const visited = new Set([target.val]);
  const results = [];

  buildGraph(root, null);

  while (!queue.isEmpty()) {
    let size = queue.size();

    //* Add all of the nodes that are k-distance away
    if (k === 0) {
      for (let i = 0; i < size; i++) {
        results.push(queue.dequeue());
      }

      return results;
    }

    //* Level order traversal
    for (let i = 0; i < size; i++) {
      const vertex = queue.dequeue();

      //* Explore all neighbors of current node
      for (const neighbor of graph[vertex] || []) {
        if (!visited.has(neighbor)) {
          queue.enqueue(neighbor);
          visited.add(neighbor);
        }
      }
    }

    k--;
  }

  //* There are no nodes k distance away
  return results;
}

//* Time: O(V + E) - It takes O(V) to build the graph since we visit every node once
//* Then, iterating over the adjacency list takes O(V + E) in the worst case

//* Space: (V + E) - The depth of the recursion tree scales wtih "n" in the worst case
//* The queue can store all "n" nodes in the worst case
//* Then adjacency list uses O(V + E) memory
