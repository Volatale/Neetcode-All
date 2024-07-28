//* We don't have any way to tell which bomb is better to detonate
//* So we should discover which bombs can detonate others through brute force
//!     - This is essentially a graph problem
//!     - Get the Euclidean Distance of the two points
//*         - If the distance <= radius of tha tbomb
//*         - It means that THIS bomb can reach the other
//* Use an adjacency list to track which bombs can reach the other
//!     - The edge is DIRECTED, not undirected
//!     - bombA being able to reach bombB does not mean the reverse is true
//* Try starting the explosion from EVERY bomb
//*     - For each "i" (bomb), start a DFS and take the MAXIMUM
function maximumDetonation(bombs) {
  function dfs(vertex, visited) {
    //* Already visited, can't detonate more bombs here
    if (visited.has(vertex)) return 0;

    //* Mark as visited
    visited.add(vertex);

    //* Explore neighbors (bombs that THIS bomb can detonate)
    for (let neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, visited);
      }
    }

    //* Visited.size === Number of bombs that can be detonated
    //* Otherwise we can just use a separate variable
    return visited.size;
  }

  //* DIRECTED edges; stores which bombs can detonate other bombs
  const graph = {};
  let maxBombs = 0;

  //* In a brute force manner, determine which bombs can others in their radius
  for (let i = 0; i < bombs.length; i++) {
    for (let j = i + 1; j < bombs.length; j++) {
      //* Coordinates for both bombs, so we can get the distance between both
      const [x1, y1, r1] = bombs[i];
      const [x2, y2, r2] = bombs[j];

      //* Ensure we have a list to store edges
      if (!graph[i]) graph[i] = [];

      if (!graph[j]) {
        graph[j] = [];
      }

      //* Euclidean Distance
      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

      //* bomb[i] can detonate bomb[j]
      if (distance <= r1) {
        graph[i].push(j); //* i can detonate j
      }

      //* bomb[j] can detonate [i]
      if (distance <= r2) {
        graph[j].push(i); //* i can detonate j
      }
    }
  }

  //* Try starting the explosion from EVERY bomb, we don't know which is best
  //* Visited set tracks the number of detonated bombs that stemmed from "i"
  for (let i = 0; i < bombs.length; i++) {
    maxBombs = Math.max(maxBombs, dfs(i, new Set()));
  }

  return maxBombs;
}

console.log(
  maximumDetonation([
    [2, 1, 3],
    [6, 1, 4],
  ])
); //* 2

console.log(
  maximumDetonation([
    [1, 1, 5],
    [10, 10, 5],
  ])
); //* 1

console.log(
  maximumDetonation([
    [1, 2, 3],
    [2, 3, 1],
    [3, 4, 2],
    [4, 5, 3],
    [5, 6, 4],
  ])
); //* 5

//* Time: O(n^3) - It takes O(n^2) time to get determine which bombs can detonate the others
//* Each bomb can potentially detonate every other bomb

//* Space: O(n) - There are "n" bombs in total, so the ajacency list scales with "n"
