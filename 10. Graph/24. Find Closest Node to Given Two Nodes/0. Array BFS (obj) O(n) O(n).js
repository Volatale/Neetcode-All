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
  function bfs(source, nodeMap) {
    const queue = new MyQueue([source]);
    nodeMap[source] = 0;

    let distance = 0;

    //* Perform BFS - Each node only has 1 outdegree at most
    //* So we don't need to do a level order traversal
    while (!queue.isEmpty()) {
      distance++;

      const vertex = queue.dequeue();

      //* If we haven't already visited the node
      if (edges[vertex] !== -1 && !nodeMap.hasOwnProperty(edges[vertex])) {
        queue.enqueue(edges[vertex]);
        nodeMap[edges[vertex]] = distance;
      }
    }
  }

  //* Maps to track the nodes node1 and node2 can reach, and their distances
  const map1 = {};
  const map2 = {};

  bfs(node1, map1);
  bfs(node2, map2);

  let result = -1; //* Assume that both nodes cannot reach ANY node
  let maxDistance = Infinity; //* We want to MINIMIZE, so start at the maximum

  for (let i = 0; i < edges.length; i++) {
    //* Only consider the node if BOTH nodes can reach it
    if (map1.hasOwnProperty(i) && map2.hasOwnProperty(i)) {
      const distance = Math.max(map1[i], map2[i]);

      //* Only update the result if distance < current resultDistance
      if (distance < maxDistance) {
        result = i;
        maxDistance = distance;
      }
    }
  }

  return result;
}

console.log(closestMeetingNode([2, 2, 3, -1], 0, 1)); //* 2
console.log(closestMeetingNode([1, 2, -1], 0, 2)); //* 2
console.log(closestMeetingNode([2, 3, 3, 4, -1], 0, 1)); //* 3
