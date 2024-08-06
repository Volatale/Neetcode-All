//* tickets[] is an edge list of directed edges
//* We have to use each ticket once and ONLY once
//*     - Therefore we cannot reuse edges
//* We are told that all tickets form at least one valid itinerary
//!     - Use Hielholzer's Algorithm
//!     - The question is basically to find an Eulerian Path
function findItinerary(tickets) {
  const graph = {};

  //* Sort lexicographically
  tickets.sort((a, b) => b[0].localeCompare(a[0]) || b[1].localeCompare(a[1]));

  //* Build (directed) graph
  for (const [vertex, neighbor] of tickets) {
    if (!graph[vertex]) {
      graph[vertex] = [];
    }

    graph[vertex].push(neighbor);
  }

  return hielholzersAlgorithm("JFK", graph);
}

function hielholzersAlgorithm(start, graph) {
  const path = [];
  const stack = [start];

  while (stack.length > 0) {
    const vertex = stack[stack.length - 1];

    //* Vertex has no edges left to explore
    if (!graph[vertex] || graph[vertex].length === 0) {
      path.push(stack.pop());
    } else {
      //* Get the next node to traverse to
      const nextEdge = graph[vertex].pop();
      stack.push(nextEdge);
    }
  }

  //* Reverse the path
  return path.reverse();
}

console.log(
  findItinerary([
    ["MUC", "LHR"],
    ["JFK", "MUC"],
    ["SFO", "SJC"],
    ["LHR", "SFO"],
  ])
); //* ["JFK","MUC","LHR","SFO","SJC"]

console.log(
  findItinerary([
    ["JFK", "SFO"],
    ["JFK", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "JFK"],
    ["ATL", "SFO"],
  ])
); //* ["JFK","ATL","JFK","SFO","ATL","SFO"]

//* Time: O(V+E) - It takes O(V+E) to build the graph
//* Then Hielholzer's Algorithm itself scales with the number of Edges

//* Space: O(V+E) - The graph uses O(V+E) memory to store every vertex and edge
//* The sort itself may use O(n) space depending on the sorting algorithm used (merge uses O(n))
//* The stack could potentially store every vertex at once
//* And the path is guaranteed to have a length equal to the number of vertices
