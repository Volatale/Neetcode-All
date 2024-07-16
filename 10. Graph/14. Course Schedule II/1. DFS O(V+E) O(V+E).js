function canFinish(numCourses, prerequisites) {
  function dfs(vertex) {
    if (visited[vertex] === 1) return true; //* Has cycle, visited while already in recursion stack
    if (visited[vertex] === 2) return false; //* No cycle, its just visited

    visited[vertex] = 1; //* Mark as visiting

    //* Check all of the neighbors
    for (let neighbor of graph[vertex]) {
      if (dfs(neighbor)) return true;
    }

    path.push(vertex); //* Add node to topological sort

    visited[vertex] = 2; //* Mark as processed
    return false;
  }

  const graph = new Array(numCourses).fill(0).map(() => new Array());

  //* Graph Coloring: 0 = not visited, 1 = visiting, 2 = processed
  const visited = new Array(numCourses).fill(0);
  const path = [];

  //* Build graph
  for (let [vertex, neighbor] of prerequisites) {
    graph[vertex].push(neighbor);
  }

  //* Call DFS on every vertex to check for cycles
  for (let i = 0; i < numCourses; i++) {
    if (dfs(i)) return []; //* There was a cycle; return empty array
  }

  return path;
}

console.log(
  canFinish(2, [
    [0, 1],
    [1, 0],
  ])
);

console.log(
  canFinish(5, [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [3, 4],
  ])
);

console.log(
  canFinish(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])
);

//* Time: O(V+E) - The time taken scales with the number of vertices and edges
//* The graph array takes O(n) to initialize
//* It takes O(E) time to build the adjacency list
//* The DFS itself takes O(V+E) ton finish since we explore every vertex and edge

//* Space: O(V+E) - The adjacency list uses O(V+E) space; we store every vertex and edge
//* The depth of the recursion stack is O(V), since in the worst case, every vertex is stored on the stack
