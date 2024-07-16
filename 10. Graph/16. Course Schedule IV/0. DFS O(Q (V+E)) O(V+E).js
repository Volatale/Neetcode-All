//* This problem is essentially us trying to find whether V is reachable from U
//* So we create the graph and perform a DFS
//* We need to check if there is a path to target (neighbor) from vertex
//* If there isn't, we leave answers[i] = false
//* If the IS a path, answers[i] = true
function checkIfPrerequisite(numCourses, prerequisites, queries) {
  function dfs(vertex, target) {
    if (visited[vertex] === 1) return true;
    if (visited[vertex] === 2) return false;

    //* Mark as visiting
    visited[vertex] = 1;

    //* Found a path to target
    if (vertex === target) return true;

    //* Explore neigbors
    for (let neighbor of graph[vertex]) {
      if (dfs(neighbor, target)) return true;
    }

    visited[vertex] = 2;
    return false;
  }

  const graph = new Array(numCourses).fill(0).map(() => new Array());
  let visited = new Array(numCourses).fill(0);
  const answer = new Array(queries.length).fill(false);

  //* Build (directed) graph
  for (let [vertex, neighbor] of prerequisites) {
    graph[vertex].push(neighbor);
  }

  //* Answer the queries
  for (let i = 0; i < queries.length; i++) {
    const [u, v] = queries[i];

    if (dfs(u, v)) {
      answer[i] = true;
    }

    //* Reset the visited array
    visited = new Array(numCourses).fill(0);
  }

  return answer;
}

console.log(
  checkIfPrerequisite(
    2,
    [[1, 0]],
    [
      [0, 1],
      [1, 0],
    ]
  )
);

console.log(
  checkIfPrerequisite(
    2,
    [],
    [
      [0, 1],
      [1, 0],
    ]
  )
);

console.log(
  checkIfPrerequisite(
    3,
    [
      [1, 2],
      [1, 0],
      [2, 0],
    ],
    [
      [1, 0],
      [1, 2],
    ]
  )
);

//* Time: O(Q * (V+E)) - It takes O(V+E) per DFS in the worst case
//* We have to perform a DFS for each query

//* Space: O(V+E) - The space used by the adjacency list is O(V+E)
//* The depth of the recursion is O(V)
