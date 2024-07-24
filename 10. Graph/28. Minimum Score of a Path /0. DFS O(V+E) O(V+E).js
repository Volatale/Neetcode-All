//* There is guaranteed to be a path from node 1 to node "n"
//* So we perform a regular DFS starting from 1, (or n)
//*     - It is an UNDIRECTED graph, so we can start at either
//* Within the DFS, explore every vertex/edge
//* Try to update the MINIMUM edge weight (distance) found
function minScore(n, roads) {
  function dfs(vertex, parent) {
    //* Already visited
    if (visited[vertex]) return;

    visited[vertex] = true;

    //* Explore all of the neighbors
    for (let [neighbor, distance] of graph[vertex]) {
      if (neighbor === parent) continue; //* Skip the back edge (undirected)

      //* Potentially update minimum
      minDistance = Math.min(minDistance, distance);
      dfs(neighbor, vertex);
    }
  }

  //* Nodes are from 1 to n - 1, not 0
  const graph = new Array(n + 1).fill(0).map(() => new Array());

  //* Build the undirected weighted graph
  for (let [city, destination, distance] of roads) {
    graph[city].push([destination, distance]);
    graph[destination].push([city, distance]);
  }

  let minDistance = Infinity; //* We want to MINIMIZE this value
  const visited = new Array(n + 1).fill(false); //* Nodes are from 1 to n -1

  dfs(1); //* Start the DFS from node 1
  return minDistance;
}

console.log(
  minScore(4, [
    [1, 2, 9],
    [2, 3, 6],
    [2, 4, 5],
    [1, 4, 7],
  ])
); //* 5

console.log(
  minScore(4, [
    [1, 2, 2],
    [1, 3, 4],
    [3, 4, 7],
  ])
); //* 2

//* Time: O(V + E) - It takes O(V + E) to create the graph
//* Then another O(V + E) to explore every vertex/edge

//* Space: O(V + E) - The graph itself uses O(V + E) space
//* The DFS, in the worst case uses O(V) space (recursion depth)
