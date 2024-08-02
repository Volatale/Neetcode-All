//* Use Kosaraju's Algorithm
//* Build the regular graph and the transpose graph
//!     - The transpose graph reverses the edges in the regular graph
//* Find the FINISH TIMES of every vertex in the graph
//*     - A vertex's finish time is when we have visited all of its neighbors
//*     - Push the vertices to an array/stack so we can pop them later
//*     - This logic is essentially getting the topological ordering of the vertices
//* Next, perform another DFS, but this time using the transpose graph
//*     - The transpose graph's reversed edges essentially isolate each SCC from one another
//*         - In this case, we record the START TIME of every vertex
//*         - A vertex's start time is when we visit the node for the first time
function kosarajusAlgorithm(n, edges) {
  function dfs(vertex) {
    if (visited.has(vertex)) return;

    visited.add(vertex);

    //* Explore neighbors
    for (let neighbor of graph[vertex]) {
      dfs(neighbor);
    }

    finishTimes.push(vertex);
  }

  function findSCC(vertex, component) {
    if (visited.has(vertex)) return component;

    visited.add(vertex);
    component.push(vertex); //* Added to SCC

    //* Explore neighbors of this node in the TRANSPOSE graph
    for (let neighbor of transpose[vertex]) {
      findSCC(neighbor, component);
    }

    return component;
  }

  const graph = new Array(n).fill(0).map(() => new Array());
  const transpose = new Array(n).fill(0).map(() => new Array());
  const visited = new Set();
  const SCCs = [];
  const finishTimes = []; //* Holds finish times for each vertex

  //* Build the directed graph
  for (let [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
    transpose[neighbor].push(vertex);
  }

  //* Get the finish times of all vertices
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) dfs(i);
  }

  visited.clear(); //* Reuse the visited set

  //* Find the connected components using the transpose graph
  while (finishTimes.length > 0) {
    const vertex = finishTimes.pop();

    if (visited.has(vertex)) continue;

    SCCs.push(findSCC(vertex, []));
  }

  return SCCs;
}

console.log(
  kosarajusAlgorithm(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 0],
  ])
); //* [[0, 1, 2, 3], [4]]

console.log(
  kosarajusAlgorithm(7, [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 0],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 4],
  ])
); //* [[0, 3, 1, 2], [4, 6, 5]]

console.log(
  kosarajusAlgorithm(8, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [2, 4],
    [4, 5],
    [5, 6],
    [6, 4],
    [6, 7],
  ])
); //* [[0, 3, 2, 1], [4, 5, 6], [7]]

//* Time: O(V + E) - It takes O(V + E) time to build the graph
//* Then it takes O(V + E) to find the finish times of every vertex
//* Finally it takes O(V + E) to find all of the components

//* Space: O(V + E) - There are "V" vertices and "E" edges
//* We create two graphs of equal size, so O(2 * (V + E)) = O(V + E)
//* The visited set can store up to "V" values at once
//* The depth of the recursive stack also scales with "V"
//* In the worst case, the graph is completely disconnected
//* So the size of the SCCs list scales with "V"  (each node is its own SCC)
