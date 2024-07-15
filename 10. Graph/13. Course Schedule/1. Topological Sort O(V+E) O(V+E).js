//* Topological Sort only works on Directed Acyclic Graphs
//* We aren't trying to actually build the path in this case
//* We only care about whether or not it is POSSIBLE to topologically sort
//! If there is a cycle in the graph, return false
//* Perform a DFS on every node and check if there is a cycle involved
function canFinish(numCourses, prerequisites) {
  function dfs(vertex) {
    if (visited[vertex] === 1) return true; //* Currently visiting, cycle detected
    if (visited[vertex] === 2) return false; //* Already visited, no cycle here

    visited[vertex] = 1; //* Mark as visiting

    //* Try to find a cycle in the neighbors
    for (let neighbor of graph[vertex]) {
      if (dfs(neighbor)) return true;
    }

    visited[vertex] = 2; //* Mark as processed
    return false; //* No cycle detected
  }

  const graph = new Array(numCourses).fill(0).map(() => new Array());

  //* 0 = Unvisited, 1 = visiting, 2 = processed
  const visited = new Array(numCourses).fill(0);

  //* Build the adjacency list
  for (let [course, prereq] of prerequisites) {
    graph[course].push(prereq);
  }

  //* Iterate through the entire graph
  for (let i = 0; i < numCourses; i++) {
    if (dfs(i)) return false;
  }

  //* No cycles detected, can finish
  return true;
}

console.log(canFinish(2, [[1, 0]])); //* True

console.log(
  canFinish(2, [
    [1, 0],
    [0, 1],
  ])
); //* False

console.log(
  canFinish(3, [
    [1, 0],
    [2, 1],
  ])
); //* True

//* Time: O(V+E) - The time taken scales with the number of vertices and edges
//* The graph array takes O(n) to initialize
//* It takes O(E) time to build the adjacency list
//* The DFS itself takes O(V+E) ton finish since we explore every vertex and edge

//* Space: O(V+E) - The adjacency list uses O(V+E) space; we store every vertex and edge
//* The depth of the recursion stack is O(V), since in the worst case, every vertex is stored on the stack
