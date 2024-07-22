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

//* Record the nodes that each (starting) node can reach
//*     - Also record their distances
//* Then, for every node that BOTH (starting) nodes can reach
//*     - Determine the maximum
function closestMeetingNode(edges, node1, node2) {
  function bfs(start, nodeMap) {
    //* [node, distanceToReach]
    const queue = new MyQueue([[start, 0]]);
    nodeMap.set(start, 0);

    //* Perform BFS
    while (!queue.isEmpty()) {
      const [vertex, distance] = queue.dequeue();

      //* If we haven't already visited the next node
      if (edges[vertex] !== -1 && !nodeMap.has(edges[vertex])) {
        queue.enqueue([edges[vertex], distance + 1]);
        nodeMap.set(edges[vertex], distance + 1);
      }
    }
  }

  //* Maps to track the nodes node1 and node2 can reach, and their distances
  const map1 = new Map();
  const map2 = new Map();

  bfs(node1, map1);
  bfs(node2, map2);

  let result = -1; //* Assume that both nodes cannot reach ANY node
  let resultDistance = Infinity; //* We want to MINIMIZE, so start at the maximum

  for (let i = 0; i < edges.length; i++) {
    //* Only consider the node if BOTH nodes can reach it
    if (map1.has(i) && map2.has(i)) {
      const distance = Math.max(map1.get(i), map2.get(i));

      //* Only update the result if distance < current resultDistance
      if (distance < resultDistance) {
        result = i;
        resultDistance = distance;
      }
    }
  }

  return result;
}

console.log(closestMeetingNode([2, 2, 3, -1], 0, 1)); //* 2
console.log(closestMeetingNode([1, 2, -1], 0, 2)); //* 2

//* Time: O(n) - We aren't building the graph itself here
//* Instead, we use the edges array since each node directly points to another node or -1
//* In the worst case, we traverse every node (n)

//* Space: O(n) - In the worst case, every node is stored in a queue
