//* Perform a DFS on every node in the graph
//* Increment components for every outer call to DFS
function connectedComponents(n, edges) {
  function dfs(vertex) {
    if (visited[vertex]) return;

    visited[vertex] = true;

    //* Explore neighbors
    for (let neighbor of graph[vertex]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }

  const graph = new Array(n).fill(0).map(() => new Array());
  const visited = new Array(n).fill(false);
  let components = 0;

  //* Build the undirected graph
  for (let [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  //* DFS on every component
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      components++;
    }
  }

  return components;
}

console.log(
  connectedComponents(5, [
    [0, 1],
    [1, 2],
    [3, 4],
  ])
); //* 2

console.log(
  connectedComponents(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ])
); //* 1

console.log(connectedComponents(2, [[0, 1]]));

//* Time: O(V+E) - We have to process every node and edge in the graph
//* It takes O(n) time to build the arrays and O(E) time to build the graph

//* Space: O(V+E) - The depth of the recursion is O(V)
//* The arrays also have O(V) length
//* The graph itself uses O(V+E) space to store every vertex and edge
