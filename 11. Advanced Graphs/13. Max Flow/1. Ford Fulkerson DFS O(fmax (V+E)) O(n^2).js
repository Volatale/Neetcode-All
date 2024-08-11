//* Apply the Ford-Fulkerson Algorithm
function fordFulkerson(n, edges, source, sink) {
  function dfs(vertex, path = [], visited = {}) {
    visited[vertex] = true;
    path.push(vertex);

    //* Found augmenting path from s to t
    if (vertex === sink) return path;

    //* Explore neighbor(s) if residual capacity > 0
    for (let i = 0; i < graph[vertex].length; i++) {
      if (!visited[i] && graph[vertex][i] > 0) {
        if (dfs(i, path, visited)) return path;
      }
    }

    //* There is no path from source to sink
    path.pop(); //* Backtrack
    return null;
  }

  const graph = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let maxFlow = 0;

  //* graph[i][j] = Residual Capacity of edge (u, v)
  //* graph[j][i] = Residual Capacity of edge (v, u)
  for (const [vertex, neighbor, capacity] of edges) {
    graph[vertex][neighbor] = capacity;
  }

  let path = dfs(source);

  //* While there exists an augmenting path
  while (path) {
    let pathFlow = Infinity;

    //* Find the bottleneck (minimum residual capacity)
    for (let i = 0; i < path.length - 1; i++) {
      const vertex = path[i];
      const neighbor = path[i + 1];

      pathFlow = Math.min(pathFlow, graph[vertex][neighbor]);
    }

    //* Augment the flow of all edges in the augmenting path by the bottleneck
    for (let i = 0; i < path.length - 1; i++) {
      const vertex = path[i];
      const neighbor = path[i + 1];

      //* Residual Capacity = Capacity - Flow
      graph[vertex][neighbor] -= pathFlow; //* Decrease flow on forward edge
      graph[neighbor][vertex] += pathFlow; //* Increase flow on reverse edge
    }

    maxFlow += pathFlow;
    path = dfs(source);
  }

  return maxFlow;
}

console.log(
  fordFulkerson(
    4,
    [
      [0, 1, 7],
      [0, 2, 4],
      [1, 3, 7],
      [2, 3, 4],
    ],
    0,
    3
  )
); //* 11

console.log(
  fordFulkerson(
    4,
    [
      [0, 1, 4],
      [0, 2, 7],
      [1, 3, 5],
      [2, 3, 6],
    ],
    0,
    3
  )
); //* 10

console.log(
  fordFulkerson(
    6,
    [
      [0, 1, 3],
      [0, 2, 7],
      [1, 3, 3],
      [1, 4, 4],
      [2, 1, 5],
      [2, 4, 3],
      [3, 4, 3],
      [3, 5, 2],
      [4, 5, 6],
    ],
    0,
    5
  )
); //* Should return 8, but gets into an infinite loop

//* Time: O(fmax * (V+E)) - It takes O(V+E) to find an augmenting path in the worst case
//* Ford-Fulkerson can find at most fmax augmenting paths where "f" is the maximum flow in the network
//* Each augmenting path increases the flow by at least 1 unit
//* The maximum flow is bounded by the sum of the capacities

//* Space: O(n^2) - We create an adjacency matrix, which is of size "n x n"
//* The path array can have up to "n" length
//* The visited object can also store up to "n" keys/values at once
