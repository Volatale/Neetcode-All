//* Start a DFS from every node
//*     - This lets us use each value as a starting point
//*     - Then we can find good paths that are within the current range
function numberOfGoodPaths(vals, edges) {
  function dfs(vertex, startVal, path, visited) {
    if (visited.has(vertex)) return;

    //* Add vertex to path
    path.push(vertex);
    visited.add(vertex);

    //* Completed a path
    if (startVal[vertex] === startVal) {
      const forwardPath = path.join("-");
      const reversePath = path.slice().reverse().join("-");

      //* Can't count this path as we have already explored it
      if (exploredPaths.has(forwardPath) || exploredPaths.has(reversePath)) {
        path.pop();
        visited.delete(vertex);
        return;
      }

      goodPaths++;
      exploredPaths.add(forwardPath);
      exploredPaths.add(reversePath);
    }

    //* Explore neighbors
    for (const neighbor of graph[vertex]) {
      dfs(neighbor, startVal, path, visited);
    }

    //* Backtrack
    path.pop();
    visited.delete(vertex);
  }

  const graph = new Array(vals.length).fill(0).map(() => new Array());
  const exploredPaths = new Set();

  let goodPaths = 0;

  //* Build (undirected) graph
  for (const [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  //* Try using every vertex as the start val
  for (let i = 0; i < vals.length; i++) {
    const path = [];
    const visited = new Set();
    dfs(i, vals[i], path, visited);
  }

  return goodPaths;
}

console.log(
  numberOfGoodPaths(
    [1, 3, 2, 1, 3],
    [
      [0, 1],
      [0, 2],
      [2, 3],
      [2, 4],
    ]
  )
);

//* Time: O(V*(V+E)) - We perform a DFS starting from every vertex
//* Each DFS takes O(V+E) time in the worst case

//* Space: O(V+E) - We use O(V+E) memory to store the graph
//* The path array and visited set can potentially use O(V) space
