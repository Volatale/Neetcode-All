//* The nodes that have an indegree of 0 are the ones we HAVE to search from
//* They are GUARANTEED to be in the solution since we would have to search FROM then
function findSmallestSetOfVertices(n, edges) {
  const vertices = [];
  const indegrees = new Array(n).fill(0);

  //* Find the indegrees of every node
  for (let [_, neighbor] of edges) {
    indegrees[neighbor]++;
  }

  //* Find the nodes with an indegree of 0
  for (let i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 0) {
      vertices.push(i);
    }
  }

  return vertices;
}

console.log(
  findSmallestSetOfVertices(6, [
    [0, 1],
    [0, 2],
    [2, 5],
    [3, 4],
    [4, 2],
  ])
); //* [0, 3]

console.log(
  findSmallestSetOfVertices(5, [
    [0, 1],
    [2, 1],
    [3, 1],
    [1, 4],
    [2, 4],
  ])
); //* [0, 2, 3]

console.log(findSmallestSetOfVertices(6, [])); //* [0, 1, 2, 3, 4, 5]

console.log(
  findSmallestSetOfVertices(7, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 6],
  ])
); //* [0]

//* Time: O(E) - There is no guarantee we have a simple graph
//* So the time taken scales with the number of edges

//* Space: O(n) - We create an indegree array of "n" length
