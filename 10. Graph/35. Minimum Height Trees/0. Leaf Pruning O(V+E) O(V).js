//* Use the leaf pruning algorithm
//* There can only be 2 potential minimum height tree roots
//* Get the degrees of every node
//*     - Vertices with a degree of 1 are the leaf nodes
//* Decrement the degree of every neighbor of these nodes
//* And then check if those neighbors now have a degree of 1
//*     - If they do, push them to the newLeaves array
//* leaves = newLeaves
function minimumHeightTrees(n, edges) {
  if (n === 1) return [0]; //* There is only 1 node
  if (n === 2) return [0, 1]; //* Both nodes can be the roots

  const graph = new Array(n).fill(0).map(() => new Array());
  const degrees = new Array(n).fill(0);
  let leaves = [];

  //* Build undirected graph and get the degrees of each node
  for (let [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
    degrees[vertex]++;
    degrees[neighbor]++;
  }

  //* Enqueue any node with a degree of 1 (leaf nodes)
  for (let i = 0; i < degrees.length; i++) {
    if (degrees[i] === 1) {
      leaves.push(i);
    }
  }

  //* Onion Pruning - there can only be 2 min height roots at max
  while (n > 2) {
    n -= leaves.length;
    const newLeaves = [];

    //* Process all the CURRENT leaves (in a level-order manner)
    for (let leaf of leaves) {
      //* Explore neighbors of this leaf
      for (let neighbor of graph[leaf]) {
        degrees[neighbor]--;

        //* Neighbor has become a leaf itself
        if (degrees[neighbor] === 1) {
          newLeaves.push(neighbor);
        }
      }
    }

    leaves = newLeaves;
  }

  return leaves;
}

console.log(
  minimumHeightTrees(4, [
    [1, 0],
    [1, 2],
    [1, 3],
  ])
); //* [1]

console.log(
  minimumHeightTrees(6, [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [5, 4],
  ])
); //* [3, 4]

//* Time: O(V + E) - It takes O(V + E) to build the graph itself
//* Then it takes O(V) to push all of the leaf nodes to an array
//* Finally, the leaf pruning takes O(V+E) to complete
