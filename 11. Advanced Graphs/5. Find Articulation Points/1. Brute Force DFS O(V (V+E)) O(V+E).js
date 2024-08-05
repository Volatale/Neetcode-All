//* We have "n" vertices
//* The aim is to find the articulation points / cut vertices in the graph
//* An articulation point is a vertex that if removed, results in 2+ components
//* For every vertex V, try skipping it in the subsequent DFS
//* So if skip = 0, we skip edges that lead to 0
//* Ultimately we'll do "V" calls to DFS
//* If the number of components > 1
//!     - The removal of "s" (skip vertex) results in 2 or more components
//!     - Therefore, "s" is an articulation point
function articulationPoints(n, edges) {
  function dfs(vertex, skip, visited) {
    if (visited[vertex]) return;

    //* Mark as visited
    visited[vertex] = true;

    //* Explore all neighbor vertices
    for (let neighbor of graph[vertex]) {
      if (neighbor === skip) continue; //* Ignore the "skip" vertex

      dfs(neighbor, skip, visited);
    }
  }

  const graph = new Array(n).fill(0).map(() => new Array());
  const points = [];

  //* Build the graph
  for (let [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  //* For every vertex, try skipping it (s === skip)
  for (let s = 0; s < n; s++) {
    let components = 0;

    const visited = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
      if (i === s) continue; //* Skip vertex

      //* Every DFS increase number of components
      if (!visited[i]) {
        dfs(i, s, visited);
        components++;
      }
    }

    //* The removal of "s" results in more components
    if (components > 1) {
      points.push(s);
    }
  }

  return points;
}

console.log(
  articulationPoints(5, [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
    [3, 4],
  ])
); //* [2, 3]

console.log(
  articulationPoints(2, [
    [0, 1],
    [1, 0],
  ])
); //* [0, 1]

console.log(
  articulationPoints(4, [
    [0, 1],
    [1, 2],
    [1, 3],
  ])
); //* 1

//* Time: O(V * (V+E)) - We perform "V" DFS in total
//* Each DFS takes O(V+E)
//* It takes O(V+E) to build the graph in total (array + iteration)

//* Space: O(V+E) - The graph uses O(V+E) space to store every vertex and its edges
//* The depth of the recursion stack is at most O(V)
//* The visited array also scales with the number of vertices
