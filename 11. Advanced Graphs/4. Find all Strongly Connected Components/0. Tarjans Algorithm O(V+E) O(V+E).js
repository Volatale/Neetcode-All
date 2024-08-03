function tarjansAlgorithm(n, edges) {
  function dfs(vertex) {
    //* Set ID and lowlink values
    IDs[vertex] = index;
    lowLink[vertex] = index;
    index++;

    //* Add it to the explicit stack
    stack.push(vertex);
    onStack[vertex] = true;

    //* Explore neighbors, only DFS if not visited
    for (let neighbor of graph[vertex]) {
      if (IDs[neighbor] === -1) {
        dfs(neighbor);

        //* The neighbor's LL may have been lowered, so try to lower this one too
        lowLink[vertex] = Math.min(lowLink[vertex], lowLink[neighbor]);
      } else if (onStack[neighbor]) {
        //* Neighbor is in stack, therefore it is in the current SCC
        lowLink[vertex] = Math.min(lowLink[vertex], IDs[neighbor]);
      }
    }

    //* This node is the root of the SCC
    if (IDs[vertex] === lowLink[vertex]) {
      const SCC = [];

      //* While top of stack does not equal current vertex
      while (stack[stack.length - 1] !== vertex) {
        const node = stack.pop();
        onStack[node] = false; //* Removed from stack
        SCC.push(node);
      }

      SCC.push(stack.pop()); //* Remove the ROOT of the SCC too
      SCCs.push(SCC);
    }
  }

  const graph = new Array(n).fill(0).map(() => new Array());
  const IDs = new Array(n).fill(-1); //* Int assigned to a node upon visitng it
  const lowLink = new Array(n).fill(-1); //* Min ID node that reached this node first
  const onStack = new Array(n).fill(false);
  const stack = [];
  const SCCs = [];

  let index = 0;

  //* Build (directed) graph
  for (let [vertex, neighbor] of edges) {
    graph[vertex].push(neighbor);
  }

  //* Start DFS from each node, could be a disconnected graph
  for (let i = 0; i < n; i++) {
    if (IDs[i] === -1) dfs(i);
  }

  return SCCs;
}

console.log(
  tarjansAlgorithm(2, [
    [0, 1],
    [1, 0],
  ])
); //* [1, 0]

console.log(
  tarjansAlgorithm(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 0],
  ])
); //* [[0, 1, 2, 3], [4]]

console.log(
  tarjansAlgorithm(7, [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 0],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 4],
  ])
); //* [[0, 3, 1, 2], [4, 6, 5]]

console.log(
  tarjansAlgorithm(8, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [2, 4],
    [4, 5],
    [5, 6],
    [6, 4],
    [6, 7],
  ])
); //* [[0, 3, 2, 1], [4, 5, 6], [7]]

//* Time: O(V+E) - It takes O(V+E) to build the graph itself
//* For every vertex, we explore every neighbor
//* In the worst case, every node is in the same SCC
//* So the while loop takes O(V) in the worst case

//* Space: O(V+E) - The graph uses O(V+E) space to store every vertex and its edges
//* There are multiple data structures that scale with the number of nodes (V)
//* The depth of the recursion is at worst O(V)
