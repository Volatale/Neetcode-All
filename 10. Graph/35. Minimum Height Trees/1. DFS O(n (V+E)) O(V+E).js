//* Track the maximum depth of each node
//*     - Perform a DFS starting from every node
//* Make sure we retain what the MINIMUM depth was
//*     - All of the MHT have the same depth (the minimum)
//* After finding the depths of every root
//* Iterate through the height object
//*     - Push every node that has a height === minHeight
function minimumHeightTrees(n, edges) {
  function dfs(vertex, visited) {
    //* Already visited
    if (visited.has(vertex)) return 0;

    //* Mark as visited
    visited.add(vertex);

    let maxDepth = 0;

    //* Explore neighbors
    for (let neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        maxDepth = Math.max(maxDepth, dfs(neighbor, visited));
      }
    }

    //* +1 to include THIS node
    return maxDepth + 1;
  }

  //* Build undirected graph
  const graph = new Array(n).fill(0).map(() => new Array());

  for (let [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
    graph[neighbor].push(vertex);
  }

  const heights = {};
  const minHeightTrees = [];
  let minHeight = Infinity; //* Min depth found so far

  //* Start a DFS from every node and track the height of the trees
  for (let i = 0; i < n; i++) {
    const depth = dfs(i, new Set());
    heights[i] = depth;
    minHeight = Math.min(minHeight, depth);
  }

  //* Push all the nodes with the minimum height to an array
  for (let key of Object.keys(heights)) {
    if (heights[key] === minHeight) {
      minHeightTrees.push(Number(key));
    }
  }

  return minHeightTrees;
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

//* Time: O(n * (V+E)) - Getting the depth of every root takes O(n * (V+E))
//* Each DFS can potentially take O(V+E)

//* Space: O(V+E) - The graph stores every vertex and its edges1
//* The depth of the recursion stack is O(V)
//* As does the heights object
