//* Valid trees meet the following conditions
//*     - V-1 Edges
//*     - No Cycles
//*     - Single Connected Component
function graphValidTree(n, edges) {
  function dfs(vertex, parent) {
    if (visited[vertex] === 1) return true; //* Cycle detected; visited again while in recursion stack
    if (visited[vertex] === 2) return false; //* Node already processed, means nothing

    visited[vertex] = 1; //* Mark as visiting
    nodesVisited++;

    //* Explore neighbors, skip back edges
    for (let neighbor of graph[vertex]) {
      if (neighbor === parent) continue;
      if (dfs(neighbor, vertex)) return true; //* There is a cycle
    }

    visited[vertex] = 2; //* Mark as processed
    return false; //* Indicates no cycle
  }

  //* Empty graphs count as trees
  if (n === 0) return true;

  //* There are not V-1 edges
  if (edges.length !== n - 1) return false;

  const graph = new Array(n).fill(0).map(() => new Array());
  const visited = new Array(n).fill(0); //* 0 = unvisited, 1 = visiting, 2 = processed
  let nodesVisited = 0;

  //* Build (undirected graph)
  for (let [vertex, neighbor] of edges) {
    if (vertex === neighbor) return false; //* Self Edge = Cycle
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  //* Perform the DFS
  dfs(0);

  //* A tree is a single connected component
  if (nodesVisited !== n) return false;

  //* Is valid tree
  return true;
}

console.log(
  graphValidTree(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ])
); //* True

console.log(
  graphValidTree(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 3],
    [1, 4],
  ])
); //* False

//* Time: O(V+E) - It takes O(V) time to create the arrays
//* It takes O(E) time to iterate through the edge list
//* The DFS itself takes O(V+E) time to process every vertex and edge

//* Space: The adjacency list uses O(V+E) space (to store every vertex/edge)
//* The visited array uses O(V) space
//* The depth of the recursion is O(V)
