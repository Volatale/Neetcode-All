//* Instead of DFSing from every node TO node 0
//* Perform a DFS FROM node 0 to every OTHER node
//* The number of passengers is INITIALLY 0
//* Explore all of the neighbors
//*     - Ignore the back edge; this is a UNDIRECTED graph
//* "p" represents the number of passengers along THIS subtree
//* Increment "passengers" by this amount
//* The total fuel needed is p / seats
//*     - Take the CEIL of this value because we can't have a decimal of fuel
//!     - Each edge costs ONE fuel
function minimumFuelCost(roads, seats) {
  function dfs(vertex, parent) {
    let passengers = 0; //* Start with 0 passengers

    //* Explore the neighbors of this node
    //* This is an UNDIRECTED graph, so avoid the back edges
    for (let neighbor of graph[vertex]) {
      if (neighbor === parent) continue;

      const p = dfs(neighbor, vertex); //* No of Passengers on THHIS subtree
      passengers += p;
      fuelNeeded += Math.ceil(p / seats); //* Total fuel for THIS subtree
    }

    //* +1 because we need to include THIS person
    return passengers + 1;
  }

  //* There are V-1 edges, so roads.length === n
  const graph = new Array(roads.length + 1).fill(0).map(() => new Array());

  //* Build the (undirected) graph
  for (let [vertex, neighbor] of roads) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  let fuelNeeded = 0;
  dfs(0, -1);
  return fuelNeeded;
}

console.log(
  minimumFuelCost(
    [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
    3
  )
); //* 3

console.log(
  minimumFuelCost(
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [2, 4],
      [2, 5],
    ],
    2
  )
); //* 6

console.log(
  minimumFuelCost(
    [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    5
  )
); //* 3

console.log(
  minimumFuelCost(
    [
      [3, 1],
      [3, 2],
      [1, 0],
      [0, 4],
      [0, 5],
      [4, 6],
    ],
    2
  )
); //* 7

//* Time: O(V + E) - It takes O(V + E) to build the graph
//* Then, we explore every vertex and edge, which also takes O(V+E)

//* Space: O(V + E) - The graph uses O(V + E) space to store every vertex and edge
//* The depth of the recursion is O(V) in the worst case (assuming we have a linked list style tree)
