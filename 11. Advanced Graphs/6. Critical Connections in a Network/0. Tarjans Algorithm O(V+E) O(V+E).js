//* Use Tarjan's Algorithm
function criticalConnections(n, connections) {
  function dfs(vertex) {
    disc[vertex] = index;
    lowlink[vertex] = index;
    index++;

    for (let neighbor of graph[vertex]) {
      //* If neighbor has not been visited
      if (disc[neighbor] === -1) {
        parent[neighbor] = vertex;
        dfs(neighbor);

        //* Potentially update LLV
        lowlink[vertex] = Math.min(lowlink[vertex], lowlink[neighbor]);

        if (lowlink[neighbor] > disc[vertex]) {
          bridges.push([vertex, neighbor]);
        }
      } else if (neighbor !== parent[vertex]) {
        lowlink[vertex] = Math.min(lowlink[vertex], disc[neighbor]);
      }
    }
  }

  const graph = new Array(n).fill(0).map(() => new Array());

  //* Build the graph
  for (const [vertex, neighbor] of connections) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  const disc = new Array(n).fill(-1);
  const lowlink = new Array(n).fill(-1);
  const parent = new Array(n).fill(-1);
  const bridges = [];
  let index = 0;

  //* Find bridges using DFS
  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) {
      dfs(i);
    }
  }

  return bridges;
}

console.log(
  criticalConnections(4, [
    [0, 1],
    [1, 2],
    [2, 0],
    [1, 3],
  ])
);

console.log(criticalConnections(2, [[0, 1]]));

//* Time: O(V+E) - It takes O(V+E) to build the graph (array + iteration)
//* We DFS and explore each vertex/edge once, so O(V+E)

//* Spaec: O(V+E) - The graph uses O(V+E) space
//* Disc, lowlink and parent all use O(V) space
//* Depth of recursion is at most O(V)
