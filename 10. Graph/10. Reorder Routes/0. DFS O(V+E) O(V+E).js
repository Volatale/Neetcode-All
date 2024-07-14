//* Create an undirected graph instead of a directed graph
//* When processing each edge, add the ORIGINAL road to a set
//* Then, perform a DFS from 0 and track the parent
//* The parent tells us where we came FROM
//* So if the set has the (parent, city)
//* That means that we need to REVERSE THIS EDGE
//* Thus reversals++
function minReorder(n, connections) {
  function dfs(city, parent) {
    //* If OG road was 0 -> 1, if we are at 1 and parent = 0
    //* Then we need to reverse the road
    if (roads.has(`${parent}-${city}`)) reversals++;

    //* Travel to every neighbor
    for (let neighbor of graph[city]) {
      if (neighbor === parent) continue; //* Skip back edges
      dfs(neighbor, city);
    }
  }

  let reversals = 0;

  const graph = new Array(n).fill(0).map(() => new Array());
  const roads = new Set();

  //* Create an undirected graph instead of a directed one
  for (let [cityA, cityB] of connections) {
    roads.add(`${cityA}-${cityB}`); //* Save the ORIGINAL roads
    graph[cityA].push(cityB);
    graph[cityB].push(cityA);
  }

  //* DFS starting from 0 and record the parent(s)
  dfs(0, -1);
  return reversals;
}

console.log(
  minReorder(6, [
    [0, 1],
    [1, 3],
    [2, 3],
    [4, 0],
    [4, 5],
  ])
);

console.log(
  minReorder(5, [
    [1, 0],
    [1, 2],
    [3, 2],
    [3, 4],
  ])
);

console.log(
  minReorder(3, [
    [1, 0],
    [2, 0],
  ])
);

//* Time: O(V+E) - It takes O(E) to build the graph
//* Then it takes O(V+E) to perform the DFS and traverse to every vertex

//* Space: O(V+E) - It takes O(E) space to store the roads set
//* The depth of the recursion is O(V) since, at worst, every vertex is stored on the stack
//* The graph/adjacency list itself takes O(V+E) since we store all vertices and edges
