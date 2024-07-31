class UnionFind {
  constructor(size) {
    this.parent = new Array(size).fill(0);
    this.rank = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  find(x) {
    let root = x;

    while (root !== this.parent[root]) {
      const parent = this.parent[root];
      this.parent[root] = this.parent[parent];
      root = this.parent[root];
    }

    return root;
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    //* Union would create a cycle
    if (rootX === rootY) return false;

    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    //* Successful union
    return true;
  }
}

//* Use Kruskal's Algorithm
//* We are being asked to find the Minimum Spanning Tree cost
//* We need to find every pair of points and save them as edges
//*     - The weight is the Manhattan Distance between each point
//* Sort the edges based on their weight
//* Iterate over the edge list and attempt to union the vertices
//*     - If the union is successful (no cycle)
//*         - minCost += weight (because we are going to take that edge)
//*     - Otherwise, ignore the edge
//! A minor performance optimization is to return
//! The moment we have unioned 4 times
//! Adding anything else to the MST would result in a cycle
function minCostConnectPoints(points) {
  const UF = new UnionFind(points.length);
  let minCost = 0;
  let visited = 0;

  const edges = [];

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      //* Get the coordinates for both points
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];

      //* The cost of each edge
      const distance = Math.abs(x2 - x1) + Math.abs(y2 - y1);

      edges.push([i, j, distance]);
    }
  }

  //* Sort edges based on the weights
  edges.sort((a, b) => a[2] - b[2]);

  //* Find the MST
  for (let [vertex, neighbor, weight] of edges) {
    if (UF.union(vertex, neighbor)) {
      minCost += weight;
      visited++;
    }

    //* Optimization; any other union results in a cycle
    if (visited === points.length - 1) return minCost;
  }

  return minCost;
}

console.log(
  minCostConnectPoints([
    [0, 0],
    [2, 2],
    [3, 10],
    [5, 2],
    [7, 0],
  ])
); //* 20

console.log(
  minCostConnectPoints([
    [3, 12],
    [-2, 5],
    [-4, 1],
  ])
); //* 18

//* Time: O(n^2) - Where "n" is points.length
//* We need to get every pair of points and their distances
//* It takes O(e log e) to sort the edges where "e" = no. of edges
//* Then each union and find takes Amortized Constant Time

//* Space: O(n^2) - The TRUE space usage is O(n * (n-1) / 2)
//* But we drop constants in Big O Notation
