//* DFS on every node; if it returns true push to results
//*     - This handles the sorting since we iterate from 0 to n-1
//* We are essentially checking for CYCLES
//!     - That is the ONLY circumstance that would lead to no terminal node
//!     - Because you are in an INFINITE LOOP you are unable to terminate
//* Assume every node is NOT safe to begin with
//* If the DFS on the neighbors of this node return true
//*     - Then we CAN set this node's true state to be true
//* If ANY of the neighbors of this node return false
//*     - THIS node cannot be a safe node since AT LEAST one path has a cycle
function safeNodes(graph) {
  function dfs(i) {
    if (safeNodes.hasOwnProperty(i)) return safeNodes[i];

    //* Assume this is NOT a safe node
    safeNodes[i] = false;

    //* Check the neighbors of this node
    for (let neighbor of graph[i]) {
      //* This node is ALSO not a safe node
      if (!dfs(neighbor)) {
        return false;
      }
    }

    safeNodes[i] = true;
    return true;
  }

  const n = graph.length;

  const results = [];
  const safeNodes = {};

  //* Iterate through and check every node (in ascending order)
  for (let i = 0; i < n; i++) {
    if (dfs(i)) {
      results.push(i);
    }
  }

  return results;
}

console.log(safeNodes([[1, 2], [2, 3], [5], [0], [5], [], []]));
console.log(safeNodes([[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]));
console.log(safeNodes([[], [], []]));

//* Time: O(V+E) - We iterate over every vertex and edge

//* Space: O(V) - In the worst case, results and safeNodes scale with the number of vertices
//* If EVERY node has 0 outgoing edges, every node is technically safe
