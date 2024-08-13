//! Gives TLE!
//* Start a DFS from every node
//*     - This lets us use each value as a starting point
//*     - Then we can find good paths that are within the current range
function numberOfGoodPaths(vals, edges) {
  function dfs(vertex, parent, startVal, path) {
    //* Add vertex to path
    path.push(vertex);

    //* Invalid Path
    if (vals[vertex] > startVal) {
      path.pop();
      return;
    }

    //* Completed a path
    if (vals[vertex] === startVal) {
      const forwardPath = path.join("-");
      const reversePath = path.slice().reverse().join("-");

      //* Only count paths we have not already used
      if (!exploredPaths.has(forwardPath) && !exploredPaths.has(reversePath)) {
        goodPaths++;
        exploredPaths.add(forwardPath);
        exploredPaths.add(reversePath);
      }
    }

    //* Explore neighbors
    for (const neighbor of graph[vertex]) {
      if (neighbor === parent) continue;
      dfs(neighbor, vertex, startVal, path);
    }

    //* Backtrack
    path.pop();
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
    dfs(i, -1, vals[i], []);
  }

  return goodPaths;
}

//* Time: O(V*(V+E)) - We perform a DFS starting from every vertex
//* Each DFS takes O(V+E) time in the worst case

//* Space: O(V+E) - We use O(V+E) memory to store the graph
//* The path array and visited set can potentially use O(V) space

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
); //* 6

console.log(
  numberOfGoodPaths(
    [1, 1, 2, 2, 3],
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
    ]
  )
); //* 7

console.log(numberOfGoodPaths([1], [])); //* 1

console.log(
  numberOfGoodPaths(
    [2, 5, 5, 1, 5, 2, 3, 5, 1, 5],
    [
      [0, 1],
      [2, 1],
      [3, 2],
      [3, 4],
      [3, 5],
      [5, 6],
      [1, 7],
      [8, 4],
      [9, 7],
    ]
  )
); //* 20

//* Time: O(V*(V+E)) - We perform a DFS starting from every vertex
//* Each DFS takes O(V+E) time in the worst case

//* Space: O(V+E) - We use O(V+E) memory to store the graph
//* The path array and visited set can potentially use O(V) space
