class Node {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

//* We need to reuse references to the same node
//* Create a map that can store the original node and the clone of that node
//* Perform a DFS starting from the first node (1)
//*     - The stack stores the ORIGINAL nodes, not the clones
//* For each node
//*     - Pop from the stack and get the CLONE of this node from the map
//*     - Iterate over all of the neighbors the ORIGINAL has (the clone might have none at this point)
//*     - If we have NOT visited this node, there won't be a key in the cloneMap
//*         - Create a CLONE of this neighbor node using its value
//*         - Add the ORIGINAL node as the key and the VALUE being the CLONE to the cloneMap
//*             - Now, anytime we want the original, we can get the same clone every time
//*         - Push the current neighbor to the stack so we can process ITS neighbors too
//*     - After the if statement, push the CLONE of the neighbor to the neighbor list
function cloneGraph(node) {
  if (node === null) return node;

  //* Original Node -> Copy of Node
  const cloneMap = new Map();

  //* Create a copy for the root node
  const copy = new Node(node.val, []);
  cloneMap.set(node, copy);

  //* Stack for DFS (holds original nodes)
  const stack = [node];

  //* Perform a DFS
  while (stack.length > 0) {
    const curr = stack.pop(); //* Get the ORIGINAL node
    const clone = cloneMap.get(curr); //* Get the COPY of original

    //* Iterate over every neighbor this node has
    for (let neighbor of curr.neighbors) {
      //* If we haven't visited it, there won't be clone for THIS neighbor
      if (!cloneMap.has(neighbor)) {
        const neigborClone = new Node(neighbor.val, []);
        cloneMap.set(neighbor, neigborClone); //* Setup the Original to Clone link
        stack.push(neighbor); //* So we can perform DFS on this node too
      }

      //* Push the reference to the neighbor's clone to the neighbor array
      clone.neighbors.push(cloneMap.get(neighbor));
    }
  }

  return copy;
}

console.log(
  cloneGraph([
    [2, 4],
    [1, 3],
    [2, 4],
    [1, 3],
  ])
);
console.log(cloneGraph([[]]));
console.log(cloneGraph([]));

//* Time: O(V+E) - We perform a DFS and iterate over every vertex O(V)
//* For each vertex, we iterate over every neighbor the vertex has O(E)
//* Each node will be processed twice at most

//* Space: O(V+E) - We create a new node for each vertex in the graph
//* The stack also stores "V" vertices at once in the worst case
//* We create copies for each vertex and its edges, so this is O(V + E)
