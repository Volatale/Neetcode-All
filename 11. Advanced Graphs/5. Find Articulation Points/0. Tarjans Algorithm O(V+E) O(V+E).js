//* Use Tarjan's Algorithm to find Articulation Points
//* Articulation Points is defined as:
//!     - If root of DFS tree has 2 children, root is an AP
//!     - If lowlink[neighbor] >= disc[vertex], vertex is an AP
//* Essentially we want to track the parent
//*     - We want to find paths back edges from child to ancestor nodes
//!     - These back edges do not travel through the parent node
function articulationPoints(n, edges) {
  function dfs(vertex) {
    let children = 0; //* Track number of children

    disc[vertex] = index;
    lowlink[vertex] = index;
    index++;

    for (let neighbor of graph[vertex]) {
      if (disc[neighbor] === -1) {
        children++; //* No. of DFS from this node = child
        parent[neighbor] = vertex;
        dfs(neighbor);

        //* Neighbor may have found a back edge, thus this node's LLV changes too
        lowlink[vertex] = Math.min(lowlink[vertex], lowlink[neighbor]);

        //* If Root has 2 children, root is an articulation poin
        if (parent[vertex] === -1 && children > 1) {
          artPoints.push(vertex);
        }

        //* No back edge from neighbor to vertex's ancestor(s) (except through vertex itself)
        if (parent[vertex] !== -1 && lowlink[neighbor] >= disc[vertex]) {
          artPoints.push(vertex);
        }
        //* Found a back edge from vertex to one of its ancestors
      } else if (parent[vertex] !== neighbor) {
        lowlink[vertex] = Math.min(lowlink[vertex], disc[neighbor]);
      }
    }
  }

  const graph = new Array(n).fill(0).map(() => new Array());
  const disc = new Array(n).fill(-1); //* Discovery time of each node
  const lowlink = new Array(n).fill(-1); //* Min node that each node can reach
  const parent = new Array(n).fill(-1);
  const artPoints = [];

  let index = 0;

  //* Build graph
  for (const [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  //* Graph could be disconnected, call DFS on all nodes
  for (let i = 0; i < n; i++) {
    dfs(i);
  }

  return artPoints;
}

console.log(
  articulationPoints(5, [
    [0, 1],
    [1, 2],
    [1, 4],
    [2, 3],
    [3, 0],
  ])
); //* [1]

console.log(
  articulationPoints(6, [
    [0, 1],
    [1, 2],
    [1, 4],
    [2, 3],
    [2, 5],
    [3, 0],
    [4, 5],
  ])
); //* []

console.log(
  articulationPoints(4, [
    [0, 1],
    [0, 2],
    [1, 3],
  ])
); //* [1, 0]
