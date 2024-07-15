//* A "safe" node is a node that does not lead to a cycle
//!     - A cycle is the ONLY way that a path does not lead to a terminal node
//!         - Unless the graph is infinite, that is
//* A terminal node is a node that has an outdegree of 0 (0 outgoing nodes)
//* Assume every vertex is unsafe to stat with
//* Track the safeness of each node using a hashtable
//*     - Assume every node is unsafe to START with
//* Check the neighbors of the current node
//*     - If nothing returned false, set safeNode[vertex] = true
function eventualSafeNodes(graph) {
  function dfs(vertex) {
    //* We already processed this node (already visited)
    if (safeNodes.hasOwnProperty(vertex)) return safeNodes[vertex];

    //* Assume every node is NOT safe by default
    safeNodes[vertex] = false;

    //* Check every neighbor of this node
    for (let neighbor of graph[vertex]) {
      if (!dfs(neighbor)) {
        return false;
      }
    }

    safeNodes[vertex] = true;
    return true;
  }

  const safeNodes = {};
  const results = [];

  //* Perorm a DFS on every node (from 0 to n so we push in order)
  for (let i = 0; i < graph.length; i++) {
    if (dfs(i)) {
      results.push(i);
    }
  }

  //* Results is in sorted order
  return results;
}

console.log(eventualSafeNodes([[1, 2], [2, 3], [5], [0], [5], [], []]));
console.log(eventualSafeNodes([[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]));

//* Time: O(V+E) - It takes O(V+E) time to traverse through every vertex and edge

//* Space: O(V) - The safeNodes object an the depth of the recursion is O(V)
