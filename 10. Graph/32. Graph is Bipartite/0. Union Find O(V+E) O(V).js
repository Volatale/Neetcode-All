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

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

//* We want to partition the graph into two sets
//*     - This is a perfect use case for Union Find
//* If the vertex and neighbor have the same root
//*     - This implies they exist in the same set
//!     - Therefore, the graph cannot be bipartite
//* Otherwise, union the first neighbor of the vertex, and the current neighbor itself
function isBipartite(graph) {
  const UF = new UnionFind(graph.length);

  for (let vertex = 0; vertex < graph.length; vertex++) {
    for (let neighbor of graph[vertex]) {
      //* Two adjacent nodes are in the same set - graph is NOT bipartite
      if (UF.find(vertex) === UF.find(neighbor)) return false;

      //* Union the first neighbor with all other neighbors
      UF.union(graph[vertex][0], neighbor);
    }
  }

  //* Graph is Bipartite
  return true;
}

console.log(
  isBipartite([
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ])
); //* True

console.log(
  isBipartite([
    [1, 2, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ])
); //* False

//* Time: O(V+E) - It takes O(V) time to build the Union Find itself
//* Traversing the graph takes O(V+E) since for every vertex we explore all neighbors
//* Find and Union take O(α(n)), which is effectively constant

//* Space: (V) - The Union Find uses O(V) space
