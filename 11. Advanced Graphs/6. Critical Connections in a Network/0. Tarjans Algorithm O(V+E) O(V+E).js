//* Use Tarjan's Algorithm
//* A bridge is defined as an edge that is the ONLY path from (u,v)
//* So if we track the disc, lowlink and parents of each vertex
//* If lowlink[neighbor] > disc[vertex]
//!     - The edge (u,v) is a bridge
//* If there were to be ANOTHER path from (u,v) that didn't involve taking THIS edge
//* Then lowlink[neighbor] <= disc[vertex] would be a true statement
function findBridges(n, connections) {
  function dfs(vertex) {
    disc[vertex] = index;
    lowlink[vertex] = index;
    index++;

    //* Explore neighbors of vertex
    for (let neighbor of graph[vertex]) {
      if (disc[neighbor] === -1) {
        parent[neighbor] = vertex;
        dfs(neighbor);

        //* Neighbor's LLV may be lower, so vertex's should be too
        lowlink[vertex] = Math.min(lowlink[vertex], lowlink[neighbor]);

        //* If this edge is the only path to get to V from U, this edge is a bridge
        if (lowlink[neighbor] > disc[vertex]) {
          bridges.push([vertex, neighbor]);
        }
      } else if (parent[vertex] !== neighbor) {
        //* Vertex has a back edge to one of its parent's ancestors
        lowlink[vertex] = Math.min(lowlink[vertex], disc[neighbor]);
      }
    }
  }

  const graph = new Array(n).fill(0).map(() => Array());
  const disc = new Array(n).fill(-1); //* Discovery time of vertex
  const lowlink = new Array(n).fill(-1); //* Smallest known node reachable from V
  const parent = new Array(n).fill(-1);
  const bridges = [];

  let index = 0;

  //* Build graph
  for (const [vertex, neighbor] of connections) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  //* Could be disconnected graph; call DFS on all vertices
  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) dfs(i);
  }

  return bridges;
}

console.log(
  findBridges(3, [
    [0, 1],
    [0, 2],
  ])
); //* [[0, 1], [0, 2]]

console.log(
  findBridges(4, [
    [0, 1],
    [1, 2],
    [2, 0],
    [1, 3],
  ])
); //* [[1, 3]]

console.log(findBridges(2, [[0, 1]])); //* [[0, 1]]

//* Time: O(V+E) - It takes O(V+E) to build the graph (array initialization and edge iterations)
//* It takes O(V) to initialize all of the arrays we need
//* We explore every vertex and edge once in the DFS (O(V+E))

//* Space: O(V+E) - It takes O(V+E) to store the vertices and their edges in the graph
//* There are multiple arrays that each use O(V) space
//* The bridges array scales with O(E). In the worst case, every edge is a bridge (linked list style graph)
//* The depth of the recursion is O(V) at most
